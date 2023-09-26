import { ListingsRecord } from "@/lib/xata";
import Image from "next/image";

export type ListingProps = ListingsRecord;

export function ListingCard(props: ListingProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "code",
  });

  const priceDisplayed = props.price ? formatter.format(props.price) : "Free!";

  const subject = `I'm interested in ${props.name}!`;
  const body = `Hi! I saw your project ${props.name} on https://www.sideyard.app/ and I'm interested in learning more.`;

  return (
    <a
      href={`mailto:${props.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`}
      className="group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2">
        <Image
          height={500}
          width={500}
          src={props.thumbnail?.url!}
          alt={props.description!}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{props.name}</h3>
        <p>{priceDisplayed}</p>
      </div>
      <p className="mt-1 truncate text-ellipsis text-sm italic text-gray-500">
        {props.description}
      </p>
    </a>
  );
}
