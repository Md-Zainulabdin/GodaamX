"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { registrationSchema, type RegistrationFormValues } from "@/schemas/schemas";
import { apiClient } from "@/lib/axios";
import { AUTH_API } from "@/constants/api.constants";

export default function Register() {
  const router = useRouter();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { name: "", email: "", phone: "", company_name: "", message: "" },
  });

  async function onSubmit(data: RegistrationFormValues) {
    try {
      const res = await apiClient.post(AUTH_API.register, data);
      if (res) {
        toast("Registration Successfull.");
        router.push("/login");
      }
    } catch (err: any) {
      toast(`Registration failed: ${err.message}`);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl tracking-tight">Registration</CardTitle>
          <CardDescription>Enter your details to complete registration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="eg.john"
                  autoComplete="name"
                  className="border-zinc-200 bg-white"
                  {...form.register("name")}
                />
                {form.formState.errors.name && <FieldError errors={[form.formState.errors.name]} />}
              </Field>

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
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="eg.923124567890"
                  autoComplete="tel"
                  className="border-zinc-200 bg-white"
                  {...form.register("phone")}
                />
                {form.formState.errors.phone && <FieldError errors={[form.formState.errors.phone]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="company_name">Company Name</FieldLabel>
                <Input
                  id="company_name"
                  type="text"
                  placeholder="eg.ABC"
                  autoComplete="organization"
                  className="border-zinc-200 bg-white"
                  {...form.register("company_name")}
                />
                {form.formState.errors.company_name && <FieldError errors={[form.formState.errors.company_name]} />}
              </Field>

              <Field>
                <FieldLabel htmlFor="message">Message</FieldLabel>
                <Textarea id="message" placeholder="Enter your message" {...form.register("message")} />
                {form.formState.errors.message && <FieldError errors={[form.formState.errors.message]} />}
              </Field>

              <Field>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {form.formState.isSubmitting ? "Registering..." : "Register"}
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
