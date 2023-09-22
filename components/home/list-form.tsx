"use client";
import * as Form from "@radix-ui/react-form";
import { type FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import { LoadingDots } from "../shared/icons";

type Props = {
  setShowListModal: (value: boolean) => void;
};

export function ListForm({ setShowListModal }: Props) {
  const [isForSale, setIsForSale] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState(false);

  const buttonCopy = isForSale ? "List for Sale" : "List for Adoption";

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setIsForSale(event.target.value === "for sale");
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      const response = await fetch("/api/listing", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.ok) {
        toast.success(
          "Successfully listed your project! We'll be in touch shortly",
        );
        setShowListModal(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };
  return (
    <Form.Root className="space-y-4" onSubmit={handleSubmit}>
      <Form.Field name="name">
        <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
          Project Name
        </Form.Label>
        <Form.Message
          className="flex text-sm font-medium leading-6 text-gray-900"
          match="valueMissing"
        >
          Please a project name
        </Form.Message>

        <Form.Control asChild>
          <input
            type="name"
            required
            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="email">
        <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
          Your Email
        </Form.Label>
        <Form.Message
          className="flex text-sm font-medium leading-6 text-red-900"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>
        <Form.Message
          className="flex text-sm font-medium leading-6 text-red-900"
          match="typeMismatch"
        >
          Please provide a valid email
        </Form.Message>
        <Form.Control asChild>
          <input
            type="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="description">
        <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
          Description
        </Form.Label>
        <Form.Control asChild>
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            rows={3}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="type" className="mb-4">
        <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
          Giving away or selling?
        </Form.Label>
        <Form.Control asChild>
          <select
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            <option value="free">Free</option>
            <option value="for sale">For Sale</option>
          </select>
        </Form.Control>
      </Form.Field>

      {isForSale && (
        <Form.Field name="price" className="mb-4">
          <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
            Price in USD
          </Form.Label>
          <Form.Message
            className="flex text-sm font-medium leading-6 text-red-900"
            match="rangeOverflow"
          >
            We are not ready for projects that big yet 😅. Our maximum is
            $100,000 USD.
          </Form.Message>
          <Form.Message
            className="flex text-sm font-medium leading-6 text-red-900"
            match="rangeUnderflow"
          >
            Please enter a positive number
          </Form.Message>
          <Form.Control asChild>
            <input
              type="number"
              required
              accept="image/jpeg, image/png, image/gif, image/bmp, image/webp, video/mp4, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/webm"
              min={0}
              max={100000}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
            />
          </Form.Control>
        </Form.Field>
      )}

      <Form.Field name="file" className="mb-4">
        <Form.Message
          match={(_, formData) => {
            const value = formData.get("file") as File;
            const maxSize = 4.5 * 1024 * 1024;
            setFileError(value.size > maxSize);
            return value.size > maxSize;
          }}
        />
        {fileError && (
          <p className="flex text-sm font-medium leading-6 text-red-900">
            Please limit your file to 4.5mb
          </p>
        )}

        <Form.Message
          className="flex text-sm font-medium leading-6 text-red-900"
          match="valueMissing"
        >
          Please upload a quick demo
        </Form.Message>
        <Form.Label className="flex text-sm font-medium leading-6 text-gray-900">
          Demo Photo or Video
        </Form.Label>
        <Form.Control asChild>
          <input type="file" required />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild>
        <button
          type="submit"
          className="mt-6 block w-full rounded-full border border-black bg-black px-6 py-2 text-lg text-white transition-all  "
        >
          {isSubmitting ? <LoadingDots color="white" /> : buttonCopy}
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
