"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function Callback() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/create-user", {
        method: "POST",
      }).then(() => {
        router.push("/");
      });
    }
  }, [isSignedIn]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
);
}
