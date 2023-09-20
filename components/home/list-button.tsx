"use client";
import { useListModal } from "@/components/home/list-modal";

export function ListButton() {
  const { ListModal, setShowListModal } = useListModal();

  const handleClick = () => {
    setShowListModal(true);
  };

  return (
    <div className="z-10 mt-4">
      <ListModal />
      <button
        onClick={handleClick}
        className="rounded-full border border-black bg-black px-6 py-2 text-lg text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
      >
        List your Project
      </button>
    </div>
  );
}
