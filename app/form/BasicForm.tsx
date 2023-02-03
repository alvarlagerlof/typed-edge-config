"use client";

import { z } from "zod";

import { ZodToForm } from "@/components/ZodToForm";

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    age: z.number().min(18),
    fulfilled: z.boolean(),
  })
  .required();

export function BasicForm() {
  return <ZodToForm schema={schema} />;
}
