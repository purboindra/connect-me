"use client";

import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/lib/validation";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { login } from "@/app/actions/auth.action";
import { toast } from "../ui/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending ? "Loading..." : "Sign In"}
    </Button>
  );
}

export const LoginForm = () => {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(login, initialState);

  const form = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state.errors) {
      let errorMessage;
      const errors = state.errors || {};

      if (typeof errors !== "string") {
        errorMessage = errors?.content?.[0];
      } else {
        errorMessage = errors;
      }

      if (errors) {
        toast({
          title: "Oops...",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  }, [state.errors ? JSON.stringify(state.errors) : ""]);

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-2" action={dispatch}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Input your email" />
              </FormControl>
            </FormItem>
          )}
        />
        {state.errors.email && (
          <p className="text-sm font-normal text-red-600">
            {state.errors.email}
          </p>
        )}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Input your valid password" />
              </FormControl>
            </FormItem>
          )}
        />
        {state.errors.password && (
          <p className="text-sm font-normal text-red-600">
            {state.errors.password}
          </p>
        )}

        <SubmitButton />
      </form>
    </Form>
  );
};
