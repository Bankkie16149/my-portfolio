export default function sitemap() {
  const baseUrl = "https://my-portfolio-alpha-ten-69.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
