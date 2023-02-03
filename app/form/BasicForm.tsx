"use client";

import { z } from "zod";

import { ZodToForm } from "@/components/ZodToForm";

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    age: z.number().min(18).describe("Has a limit"),
    fulfilled: z.boolean(),
    nested: z.object({
      foo: z.string().describe("This is a description!"),
      bar: z.string(),
      deeply: z.object({
        foo: z.string(),
        bar: z.string(),
      }),
    }),
  })
  .required();

export function BasicForm() {
  return <ZodToForm schema={schema} />;
}
