"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "@/schemas/schemas";
import { useAuth } from "@/hooks/use-auth";

import { apiClient } from "@/lib/axios";
import { AUTH_API } from "@/constants/api.constants";

export default function Login() {
  const { save } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginSchema) {
    const payload = { email: data.email?.trim(), password: data.password };

    try {
      const res = await apiClient.post(AUTH_API.login, payload);

      save(res?.data?.access_token, res?.data?.user);
      toast("You have signed in successfully.");
    } catch (err: any) {
      toast(`Login failed: ${err.message}`);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl tracking-tight">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="eg.johnfrans@gmail.com"
                  autoComplete="email"
                  className="border-zinc-200 bg-white"
                  {...form.register("email")}
                />
                {form.formState.errors.email && <FieldError errors={[form.formState.errors.email]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="border-zinc-200 bg-white pr-9"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {form.formState.errors.password && <FieldError errors={[form.formState.errors.password]} />}
              </Field>
              <Field>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {form.formState.isSubmitting ? "Signing in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
