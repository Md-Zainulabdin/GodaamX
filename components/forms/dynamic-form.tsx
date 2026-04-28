"use client";

import { Loader2 } from "lucide-react";
import { useForm, Controller, DefaultValues, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";

import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

import type { FormField } from "@/constants/form.constants";

type Props<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    resolver: zodResolver(schema),
    defaultValues,
  });

  const prevDefaultsRef = useRef<string>("");

  useEffect(() => {
    if (defaultValues) {
      const serialized = JSON.stringify(defaultValues);
      if (serialized !== prevDefaultsRef.current) {
        prevDefaultsRef.current = serialized;
        form.reset(defaultValues);
      }
    }
  }, [defaultValues, form.reset]);

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
                <FieldLabel htmlFor={field.name}>
                  {field.label}
                  {field.optional && <span className="ml-1 text-xs text-muted-foreground">(Optional)</span>}
                </FieldLabel>

                {field.type === "textarea" && (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as Parameters<typeof form.register>[0])}
                  />
                )}

                {field.type === "select" && (
                  <Controller
                    control={form.control}
                    name={field.name as Parameters<typeof form.register>[0]}
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
                    step="any"
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as Parameters<typeof form.register>[0], {
                      setValueAs: (value) => {
                        if (value === "" || value === null || value === undefined) return undefined;
                        const num = Number(value);
                        return isNaN(num) ? value : num; // Pass through if not a number so Zod can show type error
                      },
                    })}
                  />
                )}

                {field.type === "date" && (
                  <Controller
                    control={form.control}
                    name={field.name as Parameters<typeof form.register>[0]}
                    render={({ field: f }) => (
                      <DatePicker
                        value={f.value}
                        onChange={f.onChange}
                        placeholder={field.placeholder}
                      />
                    )}
                  />
                )}

                {(!field.type || ["text", "email", "tel", "password"].includes(field.type)) && (
                  <Input
                    id={field.name}
                    type={field.type ?? "text"}
                    placeholder={field.placeholder ?? `Enter ${field.label.toLowerCase()}`}
                    {...form.register(field.name as Parameters<typeof form.register>[0])}
                  />
                )}

                {error && <FieldError errors={[error as { message?: string }]} />}
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
