import { createClient } from "@vercel/edge-config";
import { z } from "zod";

export default async function Home() {
  const client = createClient(process.env.EDGE_CONFIG);
  const config = await client.getAll();

  const schema = z.object({
    foo: z.string().default("default foo"),
    heloo: z.string().default("default hello"),
  });

  schema.parse(config);

  return (
    <main>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </main>
  );
}
