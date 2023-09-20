"use client";
import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { useEmailModal } from "./email-modal";
import { Toaster } from "sonner";

export default function NavBar({ session }: { session: Session | null }) {
  const { EmailModal, setShowEmailModal } = useEmailModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Toaster richColors position="top-center" />
      <EmailModal />
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
              alt="Precedent logo"
              width="150"
              height="100"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="rounded-full border border-black bg-black px-4 py-2 text-base text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowEmailModal(true)}
              >
                See all projects
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
