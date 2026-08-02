"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

import { loginSchema, registerSchema } from "./schema";
import { LoginState, RegisterState } from "@/lib/type";

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  const validationResult = loginSchema.safeParse({ email, password });

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];

    return {
      success: false,
      statusCode: 400,
      message: firstError ? firstError.message : "Validation failed",
    };
  }

  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }
    if (decodedToken.role === "CUSTOMER") {
      redirect("/dashboard/customer");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin");
    } else if (decodedToken.role === "PROVIDER") {
      redirect("/dashboard/provider");
    }
  }

  return result;
};

export const registerAction = async (
  redirectTo: string,
  prevState: RegisterState,
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const role = formData.get("role");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const bio = formData.get("bio");
  const profilePhoto = formData.get("profilePhoto");

  const validationResult = registerSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    role,
    phone,
    address,
    bio: bio || null,
    profilePhoto: profilePhoto || null,
  });

  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0];

    return {
      success: false,
      statusCode: 400,
      message: firstError ? firstError.message : "Validation failed",
    };
  }
  const payload = {
    name,
    email,
    password,
    role,
    phone,
    address,
    bio: bio || undefined,
    profilePhoto: profilePhoto || undefined,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  const loginPayload = {
    email,
    password,
  };

  if (result.success) {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    const result = await res.json();

    const cookieStore = await cookies();

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;
    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }
    if (decodedToken.role === "CUSTOMER") {
      redirect("/dashboard/customer");
    } else if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin");
    } else if (decodedToken.role === "PROVIDER") {
      redirect("/dashboard/provider");
    }
  }

  return result;
};
