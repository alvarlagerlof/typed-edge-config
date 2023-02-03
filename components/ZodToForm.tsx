"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodBoolean, ZodNumber, ZodObject, ZodString } from "zod";

interface Props<T> {
  schema: z.ZodSchema<T>;
}

export function ZodToForm<T>({ schema }: Props<T>) {
  const [data, setData] = useState<z.infer<typeof schema>>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit((result) => setData(result))}
        className="flex flex-col gap-4"
      >
        <RenderZodObject
          object={schema._def.shape()}
          errors={errors}
          register={register}
        />

        <input
          type="submit"
          className="bg-black rounded p-3 text-white border-neutral-600"
        />
      </form>
      {data ? (
        <div className="flex flex-col gap-1">
          <p>Result</p>
          <pre className="rounded border border-1 border-neutral-300 p-2 bg-neutral-100">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : null}
    </>
  );
}

function RenderZodObject({ object, errors, register }) {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(object).map(([key, value]) => {
        if (value instanceof ZodNumber || value instanceof ZodString) {
          return (
            <div key={key} className="flex flex-col gap-2">
              <label className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                  <span>{key}</span>
                  {value.description ? (
                    <span className="text-sm">{value.description}</span>
                  ) : null}
                </div>

                <input
                  {...register(key, {
                    valueAsNumber: value instanceof ZodNumber,
                  })}
                  className="rounded border border-1 border-neutral-300 p-2 bg-neutral-100"
                />
              </label>

              {errors[key]?.message && (
                <p className="text-sm text-red-600">
                  {errors[key]?.message.toString()}{" "}
                </p>
              )}
            </div>
          );
        }

        if (value instanceof ZodBoolean) {
          return (
            <div key={key} className="flex flex-col gap-2">
              <label className="flex flex-col gap-1 items-start">
                <span>{key}</span>
                <input type="checkbox" {...register(key, {})} />
              </label>
              {errors[key]?.message && (
                <p className="text-sm text-red-600">
                  {errors[key]?.message.toString()}
                </p>
              )}
            </div>
          );
        }

        if (value instanceof ZodObject) {
          return (
            <div className="rounded border border-1 border-neutral-300 p-4 flex flex-col gap-3">
              <p>{key}</p>
              <RenderZodObject
                key={key}
                object={value._def.shape()}
                errors={errors}
                register={register}
              />
            </div>
          );
        }

        return (
          <p key={key} className="text-sm text-amber-600">
            Unhandled type {value?.constructor?.name ?? "no"}
          </p>
        );
      })}
    </div>
  );
}
