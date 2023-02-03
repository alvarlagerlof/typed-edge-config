import { BasicForm } from "./BasicForm";

export default function PageForm() {
  return (
    <div className="p-20 flex flex-col gap-8">
      <h1 className="text-xl font-medium">Zod to form</h1>
      <BasicForm />
    </div>
  );
}
