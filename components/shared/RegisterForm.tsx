"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/lib/validation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { register } from "@/app/actions/auth.action";
import { toast } from "../ui/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending} type="submit">
      {pending ? "Loading..." : "Sign up with email"}
    </Button>
  );
}

export const RegisterForm = () => {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(register, initialState);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  useEffect(() => {
    if (state.errors.length > 0) {
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
      <form className="flex flex-col space-y-4" action={dispatch}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Input Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state.errors.username && (
          <p className="text-sm font-normal text-red-600">
            {state.errors.username}
          </p>
        )}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input Email" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Input Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {state.errors.password && (
          <p className="text-sm font-normal text-red-600">
            {state.errors.password}
          </p>
        )}
        <div className="w-full">
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};
