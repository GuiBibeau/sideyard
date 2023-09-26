"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Toaster } from "sonner";
import { SignInButton } from "@clerk/nextjs";
import { ClerkLoading } from "@clerk/nextjs";

import UserDropdown from "./user-dropdown";

export default function NavBar({
  user,
}: {
  user: { email: string; image: string | null } | null;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Toaster richColors position="top-center" />
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.svg"
              alt="SideYard logo"
              width="150"
              height="100"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              href="/search"
              className="rounded-full border border-black bg-black px-4 py-2 text-base text-white transition-all hover:bg-white hover:text-black"
            >
              See all projects
            </Link>
            <div className="w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent py-2 opacity-20 dark:opacity-100" />
            <ClerkLoading>{!user && <p>Sign in</p>}</ClerkLoading>
            {user ? <UserDropdown {...user} /> : <SignInButton />}
          </div>
        </div>
      </div>
    </>
  );
}
