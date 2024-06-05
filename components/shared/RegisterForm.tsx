"use client";

import React from "react";
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
import { register } from "@/app/actions/user.action";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? "Loading..." : "Register"}
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

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" action={dispatch}>
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
        {state.errors?.username && <p>{state.errors.username[0]}</p>}
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
        {state.errors?.email && <p>{state.errors.email[0]}</p>}

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
        {state.errors?.password && <p>{state.errors.password[0]}</p>}

        <div className="w-full flex justify-end">
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};
