"use client";
import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { ListForm } from "./list-form";

const ListModal = ({
  showListModal,
  setShowListModal,
}: {
  showListModal: boolean;
  setShowListModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal showModal={showListModal} setShowModal={setShowListModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">List a project </h3>
          <ListForm setShowListModal={setShowListModal} />
        </div>
      </div>
    </Modal>
  );
};

export function useListModal() {
  const [showListModal, setShowListModal] = useState(false);

  const ListModalCallback = useCallback(() => {
    return (
      <ListModal
        showListModal={showListModal}
        setShowListModal={setShowListModal}
      />
    );
  }, [showListModal, setShowListModal]);

  return useMemo(
    () => ({ setShowListModal, ListModal: ListModalCallback }),
    [setShowListModal, ListModalCallback],
  );
}
