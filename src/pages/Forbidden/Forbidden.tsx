// src/pages/Forbidden.tsx
export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-red-600">403 - Forbidden</h1>
      <p className="text-gray-600 mt-2">
        You don't have permission to view this page.
      </p>
    </div>
  );
}
