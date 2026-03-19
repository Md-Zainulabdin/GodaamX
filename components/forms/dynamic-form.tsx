"use client";

import { Loader2 } from "lucide-react";
import { useForm, Controller, DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import type { FormField } from "@/constants/form.constants";

type Props<T extends FieldValues> = {
  schema: any;
  fields: FormField[];
  onSubmit: SubmitHandler<T>;
  defaultValues?: DefaultValues<T>;
  submitLabel?: string;
  isLoading?: boolean;
  dynamicOptions?: Record<string, { label: string; value: string }[]>;
};

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitLabel = "Save",
  isLoading,
  dynamicOptions,
}: Props<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema) as any,
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) form.reset(defaultValues);
  }, [JSON.stringify(defaultValues)]);

  return (
    <div className="w-full max-w-md">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGroup>
          {fields.map((field) => {
            if (field.hidden) return null;

            const error = form.formState.errors[field.name];
            const options = dynamicOptions?.[field.name] ?? field.options ?? [];

            return (
              <Field key={field.name}>
                <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>

                {field.type === "textarea" && (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as any)}
                  />
                )}

                {field.type === "select" && (
                  <Controller
                    control={form.control}
                    name={field.name as any}
                    render={({ field: f }) => (
                      <Select value={f.value ?? ""} onValueChange={f.onChange}>
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                )}

                {field.type === "number" && (
                  <Input
                    id={field.name}
                    type="number"
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as any, { valueAsNumber: true })}
                  />
                )}

                {(!field.type || ["text", "email", "date", "tel", "password"].includes(field.type)) && (
                  <Input
                    id={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as any)}
                  />
                )}

                {error && <FieldError errors={[error as any]} />}
              </Field>
            );
          })}

          <Field>
            <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting || isLoading}>
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isLoading ? "Saving..." : submitLabel}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
