"use client";

import { z } from "zod";

import { ZodToForm } from "@/components/ZodToForm";

const schema = z
  .object({
    name: z.string(),
    age: z.number(),
  })
  .required();

export function BasicForm() {
  return <ZodToForm schema={schema} />;
}
