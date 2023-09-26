"use client";
import Image from "next/image";
import { useListModal } from "@/components/home/list-modal";

export function FeaturedSection() {
  const { ListModal, setShowListModal } = useListModal();

  const handleClick = () => {
    setShowListModal(true);
  };
  return (
    <section
      aria-labelledby="featured-heading"
      className="relative mt-16 overflow-hidden rounded-lg lg:h-96"
    >
      <ListModal />
      <div className="absolute inset-0">
        <Image
          src="/images/side-project-submit.jpg"
          width={1920}
          height={1280}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
      <div aria-hidden="true" className="relative h-32 w-full lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
        <div>
          <h2 id="featured-heading" className="text-xl font-bold text-white">
            Interested in listing your project?
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            We&apos;re always looking for new projects to feature on our site.
          </p>
        </div>
        <button
          onClick={handleClick}
          className="mt-6 flex flex-shrink-0 items-center justify-center rounded-full border border-white border-opacity-25 bg-white bg-opacity-0 px-4 py-3 text-base font-medium text-white hover:bg-opacity-10 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
        >
          List your project!
        </button>
      </div>
    </section>
  );
}
