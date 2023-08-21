import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Home() {
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
