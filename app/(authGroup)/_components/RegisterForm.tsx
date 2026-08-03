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
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { registerAction } from "../_actions/authActions";
import { Field, FieldDescription } from "@/components/ui/field";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLE_OPTIONS } from "@/lib/type";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";
  const [state, action, pending] = useActionState(
    registerAction.bind(null, redirectTo),
    false,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || "Success!");
    } else {
      toast.error(state.message || "Failed");
    }
  }, [state]);

  return (
    <form action={action} className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border-muted/60">
        <CardHeader className="text-center border-b bg-muted/20 pb-4">
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Create Account
          </CardTitle>
          <CardDescription>
            Join the gearUp community and start your journey below.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-700 tracking-wider uppercase">
                Credentials
              </h3>
              <div>
                <label
                  htmlFor="name"
                  className="text-xs font-medium block mb-1"
                >
                  Full Name *
                </label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-medium block mb-1"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-xs font-medium block mb-1"
                >
                  Password *
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium block mb-1"
                >
                  Confirm Password *
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-700 tracking-wider uppercase">
                Profile & Settings
              </h3>
              <div>
                <span className="text-xs font-medium block mb-1">
                  Account Type *
                </span>
                <Select name="role" required onValueChange={setSelectedRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-medium block mb-1"
                >
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+880..."
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-xs font-medium block mb-1"
                >
                  Address *
                </label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Your current location"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profilePhoto"
                  className="text-xs font-medium block mb-1"
                >
                  Profile Photo URL
                </label>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="url"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {selectedRole && (
            <div className="p-3 bg-green-50/60 border border-green-200 rounded-lg text-xs text-green-800 animate-in fade-in-50">
              {selectedRole === "CUSTOMER" &&
                "✨ Access rentals and explore available gear from providers."}
              {selectedRole === "PROVIDER" &&
                "💼 List your gear and manage rental requests from customers."}
              {selectedRole === "ADMIN" &&
                "🛡️ Full platform access to manage users, content, and settings."}
            </div>
          )}

          <div>
            <label htmlFor="bio" className="text-xs font-medium block mb-1">
              Bio (Optional)
            </label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              className="resize-none"
              rows={2}
            />
          </div>

          <div className="pt-2 border-t space-y-4">
            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-5 transition-colors"
              type="submit"
              disabled={pending}
            >
              {pending ? "Creating Account..." : "Create Account"}
            </Button>
            <Field>
              <FieldDescription className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-green-700 hover:underline"
                >
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default RegisterForm;
