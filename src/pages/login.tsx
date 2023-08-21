import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const userData = api.example.getUser.useQuery({
    authId: user.user ? user.user.id : undefined,
  });

  useEffect(() => {
    console.log(userData);
  }, [userData, userData?.isLoading]);

  return (
    <>
      <main
        className="flex h-screen flex-col items-center justify-center bg-repeat text-white"
        style={{
          backgroundImage: "url(/chalkboard.jpg)",
        }}
      >
        <div className="absolute left-0 top-0 p-6">
          {/* <UserButton appearance={{ baseTheme: dark }} /> */}
        </div>
        <p>
          <SignIn
            appearance={{
              baseTheme: dark,
            }}
          />
        </p>
      </main>
    </>
  );
}
