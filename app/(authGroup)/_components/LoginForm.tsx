"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { loginAction } from "../_actions/authActions";
import { Field, FieldDescription } from "@/components/ui/field";
import Link from "next/link";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
    false,
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Login Successful");
    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="w-full max-w-md mx-auto">
      <Card className="shadow-lg border-muted/60">
        <CardHeader className="text-center border-b bg-muted/20 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back!
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your gearUp account.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-medium block mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="focus-visible:ring-green-700"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="text-xs font-medium block">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-green-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="focus-visible:ring-green-700"
              />
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-5"
              type="submit"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Login"}
            </Button>

            <Field>
              <FieldDescription className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default LoginForm;
