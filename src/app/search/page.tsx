import Balancer from "react-wrap-balancer";
import { FeaturedSection } from "@/components/search/featured-section";
import { ListingCard } from "@/components/search/listing-card";
import { getXataClient } from "@/lib/xata";

export default async function Search() {
  const xata = getXataClient();
  const listings = await xata.db.listings.getAll();

  return (
    <div className="z-10 w-full">
      <main className="w-full">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="py-24 text-center">
            <h1
              className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
            >
              <Balancer>Projects that ignite your creativity</Balancer>
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="mt-8">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {listings.map((product) => (
                <ListingCard key={product.id} {...product} />
              ))}
            </div>
          </section>

          <FeaturedSection />
        </div>
      </main>
    </div>
  );
}
