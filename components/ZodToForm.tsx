"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodNumber } from "zod";

interface Props<T> {
  schema: z.ZodType<T>;
}

export function ZodToForm<T>({ schema }: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { shape } = schema;

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      className="flex flex-col gap-4"
    >
      {Object.entries(shape).map(([key, value]) => {
        return (
          <>
            <label className="flex flex-col gap-1">
              <span>{key}</span>
              <input
                key={key}
                {...register(key, {
                  valueAsNumber: value instanceof ZodNumber,
                })}
                className="rounded border border-1 border-neutral-300 p-2 bg-neutral-100"
              />
            </label>

            {errors[key]?.message && <p>{errors[key]?.message.toString()}</p>}
          </>
        );
      })}

      <input
        type="submit"
        className="bg-black rounded p-3 text-white border-neutral-600"
      />
    </form>
  );
}
