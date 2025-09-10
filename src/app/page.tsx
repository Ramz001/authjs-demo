import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-screen h-svh md:w-screen md:h-screen flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Hey there! 👋</h1>
      <h2 className="text-xl text-gray-600 mb-6">Welcome to our Auth Demo</h2>
      <Button>
        <Link href={"/login"}>Get Started with Authentication</Link>
      </Button>
    </div>
  );
}
