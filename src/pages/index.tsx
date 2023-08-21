import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
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
        <h1 className="mb-2 text-6xl font-extrabold">
          <span className="text-red-400">Mafia</span> Engine
        </h1>
        <p className="text-xl">This site is currently in development</p>
        <p>
          Visit the{" "}
          <a
            href="https://discord.gg/social-deduction"
            rel="noopener noreferrer"
            className="text-red-100 underline hover:text-red-400"
          >
            Discord
          </a>
        </p>
        <br />
        <p>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <SignOutButton />}
        </p>
      </main>
    </>
  );
}
