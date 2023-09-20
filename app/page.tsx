import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { Twitter } from "@/components/shared/icons";
import GiveHeart from "@/components/home/give-heart";
import ComponentGrid from "@/components/home/component-grid";
import { ListButton } from "@/components/home/list-button";
import SellStat from "@/components/home/sell-stat";
import Friend from "@/components/home/friend";

export default async function Home() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <a
          href="https://twitter.com/GuiBibeau/status/1702430086967042404"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-black" />
          <p className="text-sm font-semibold text-black">
            Introducing Side Yard
          </p>
        </a>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Side Projects, Second Chances</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Side Yard is a side project orphonage and marketplace. Adopt, give
            or sell a project.
          </Balancer>
        </p>
      </div>

      <ListButton />
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
    </>
  );
}

type Feature = {
  title: string;
  description: string;
  demo: JSX.Element;
  large?: boolean;
};

const features: Feature[] = [
  {
    title: "Give back",
    description:
      "No time to work on your side project? Give it away to someone who will!",
    demo: <GiveHeart />,
  },
  {
    title: "Making Money?",
    description:
      "Sell your side project to someone who will take it to the next level.",
    demo: <SellStat />,
  },
  {
    title: "Need help?",
    description: "Partner with someone to work on your side project together.",
    demo: <Friend />,
  },
];
