import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const data = api.auth.getUserData.useQuery();

  useEffect(() => {
    if (!user.isSignedIn) {
      router.push("/login").catch(console.log);
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
          <UserButton appearance={{ baseTheme: dark }} />
        </div>
        <h1 className="mb-2 text-6xl font-extrabold">
          <span className="text-red-400">Dash</span>board
        </h1>
        <p className="text-center text-xl">
          This site&apos;s functionality is currently in development
          <br />
          but here is your data
        </p>
        <br />
        {data.isLoading && <p>Loading...</p>}
        {!data.data?.user && <p>Unable to load data...</p>}
        {data.data?.user && (
          <div>
            <p>Discord ID: {data.data.user.discordId}</p>
            <p>Stored Username: {data.data.user.username}</p>
          </div>
        )}

        <br />
        <div className="w-32 text-center">
          <SignOutButton />
        </div>
      </main>
    </>
  );
}
