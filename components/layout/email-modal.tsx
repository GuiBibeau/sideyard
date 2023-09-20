import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google, Github } from "@/components/shared/icons";
import Image from "next/image";

const EmailModal = ({
  showEmailModal,
  setShowEmailModal,
}: {
  showEmailModal: boolean;
  setShowEmailModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setEmailClicked] = useState(false);

  return (
    <Modal showModal={showEmailModal} setShowModal={setShowEmailModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            <Image
              src="/logo.svg"
              alt="Logo"
              className="h-10 w-40 rounded-full"
              width={20}
              height={20}
            />
          </a>
          <h3 className="font-display text-2xl font-bold">
            We are launching soon!
          </h3>
          <p className="text-sm text-gray-500">
            We are currently building our platform. Sign up to be notified when
            we launch.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setEmailClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useEmailModal() {
  const [showEmailModal, setShowEmailModal] = useState(false);

  const EmailModalCallback = useCallback(() => {
    return (
      <EmailModal
        showEmailModal={showEmailModal}
        setShowEmailModal={setShowEmailModal}
      />
    );
  }, [showEmailModal, setShowEmailModal]);

  return useMemo(
    () => ({ setShowEmailModal, EmailModal: EmailModalCallback }),
    [setShowEmailModal, EmailModalCallback],
  );
}
