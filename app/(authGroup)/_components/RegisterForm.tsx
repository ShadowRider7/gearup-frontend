"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../_actions/authActions";
import { Field, FieldDescription } from "@/components/ui/field";
import Link from "next/link";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Registration Successful");
    }
    if (!state.success) {
      toast.error(state.message || "Registration has failed");
    }
  }, [state]);
  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Enter your Email"
          required
        ></Input>
        <Input
          name="password"
          type="password"
          placeholder="Enter your Password"
          required
        ></Input>
        <Button className="bg-green-700" type="submit">
          {pending ? "Submitting" : "Login"}
        </Button>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </FieldDescription>
        </Field>
      </Card>
    </form>
  );
};

export default RegisterForm;
