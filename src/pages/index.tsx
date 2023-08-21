import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user.isSignedIn) {
      if (user.user) {
        router.push("/dashboard").catch(console.log);
        // Redirect to /dashboard
      } else {
        // Redirect to an error page
      }
    }
  }, [user, user.isSignedIn, router]);

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
        <div className="w-32 text-center">
          {!user.isSignedIn && <LoginButton />}
          {!!user.isSignedIn && <SignOutButton />}
        </div>
      </main>
    </>
  );
}

function LoginButton() {
  return (
    <Link href="/login">
      <div className="rounded-md border border-white bg-opacity-100 p-2 text-center hover:bg-black hover:bg-opacity-50 hover:underline">
        Login
      </div>
    </Link>
  );
}
