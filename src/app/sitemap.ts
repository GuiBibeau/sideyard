import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "http://www.sideyard.app/",
      lastModified: new Date(),
    },
  ];
}
