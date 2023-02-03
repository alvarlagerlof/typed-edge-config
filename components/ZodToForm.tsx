"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  schema: z.Schema;
}

export function ZodToForm({ schema }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className="flex flex-col gap-4"
    >
      <input
        {...register("name")}
        className="rounded border border-1 border-neutral-300 p-2 bg-neutral-100"
      />
      {errors.name?.message && <p>{errors.name?.message.toString()}</p>}
      <input
        type="number"
        {...register("age")}
        className="rounded border border-1 border-neutral-300 p-2 bg-neutral-100"
      />
      {errors.age?.message && <p>{errors.age?.message.toString()}</p>}
      <input
        type="submit"
        className="bg-black rounded p-3 text-white border-neutral-600"
      />
    </form>
  );
}
