"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const ROLE_OPTIONS = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "PROVIDER", label: "Gear Provider" },
  { value: "ADMIN", label: "Administrator" },
];

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    registerAction.bind(null, redirectTo),
    false,
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Registration Successful");
    }
    if (!state.success) {
      toast.error(state.message || "Registration has failed");
    }
  }, [state]);
  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };
  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium mb-2">
            Account Type
          </label>
          <Select name="role" required onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select your account type" />
            </SelectTrigger>
            <SelectContent>
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Role Description */}
        {selectedRole && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
            {selectedRole === "CUSTOMER" && (
              <p>Access rentals and explore available gear from providers.</p>
            )}
            {selectedRole === "PROVIDER" && (
              <p>List your gear and manage rental requests from customers.</p>
            )}
            {selectedRole === "ADMIN" && (
              <p>
                Full platform access to manage users, content, and settings.
              </p>
            )}
          </div>
        )}

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password (min. 8 characters)"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+880 19738 24849"
            required
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">
            Address
          </label>
          <Input
            id="address"
            name="address"
            type="text"
            placeholder="Enter your address"
            required
          />
        </div>

        {/* Bio Field */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-2">
            Bio (Optional)
          </label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Tell us about yourself"
            className="resize-none"
            rows={3}
          />
        </div>

        {/* Profile Photo URL Field */}
        <div>
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium mb-2"
          >
            Profile Photo URL (Optional)
          </label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="url"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-green-700 hover:bg-green-800"
          type="submit"
        >
          {pending ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Login Link */}
        <Field>
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-green-700 hover:underline"
            >
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </Card>
    </form>
  );
};

export default RegisterForm;
