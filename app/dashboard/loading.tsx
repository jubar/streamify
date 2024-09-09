import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-1  min-h-screen min-w-scree items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
