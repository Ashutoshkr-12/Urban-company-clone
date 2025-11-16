"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/callback"
        appearance={{
          baseTheme: dark,
          elements: {
            card: "bg-gray-900 border border-gray-700 text-white shadow-xl",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-300",
            formFieldInput: "bg-gray-800 text-white border border-gray-600",
            formFieldLabel: "text-gray-300",
            footerActionText: "text-gray-400",
            footerActionLink: "text-blue-400",
            socialButtonsBlockButton:
              "bg-gray-800 text-white border border-gray-700",
          },
        }}
      />
    </div>
  );
}
