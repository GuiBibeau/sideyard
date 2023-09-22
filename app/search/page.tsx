import GiveHeart from "@/components/home/give-heart";
import SellStat from "@/components/home/sell-stat";
import Friend from "@/components/home/friend";
import ProjectList from "@/components/search/project-list";
import prisma from "@/lib/prisma";

export default async function Search() {
  const projects = await prisma.listing.findMany();
  return (
    <>
      <ProjectList />
    </>
  );
}
