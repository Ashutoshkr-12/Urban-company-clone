// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>

      <p className="mt-4 text-lg text-muted-foreground max-w-md">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Button asChild className="mt-8">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
