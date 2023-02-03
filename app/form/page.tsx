import { BasicForm } from "./BasicForm";

export default function PageForm() {
  return (
    <div className="flex flex-col items-center">
      <div className="p-20 flex flex-col gap-8 max-w-3xl w-full">
        <h1 className="text-xl font-medium">Zod to form</h1>
        <BasicForm />
      </div>
    </div>
  );
}
