import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "How a visual artist redefines success in graphic design",
    category: "Growth",
    date: "April 09, 2022",
    image: "/blog1.jpg", // Replace with actual image path
  },
  {
    id: 2,
    title: "Why choose a theme that looks good with WooCommerce",
    category: "Growth",
    date: "April 09, 2022",
    image: "/blog2.jpg", // Replace with actual image path
  },
  {
    id: 3,
    title: "How to write content about your photographs",
    category: "Growth",
    date: "April 09, 2022",
    image: "/blog3.jpg", // Replace with actual image path
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold">Latest from our blog</h2>
      <p className="text-gray-600 mt-2">
        Create custom landing pages with Rareblocks that convert more visitors than any website.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {blogPosts.map((post) => (
          <div key={post.id} className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-5 text-left">
              <p className="text-gray-500 text-sm">
                {post.category} • {post.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
