import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";
import { BlogList } from "@/components/blog/blog-list";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tech insights, project stories, and freelance lessons from ${siteConfig.name}`,
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Tech insights, project stories, and freelance lessons from ${siteConfig.name}`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Blog<span className="gradient-text">.</span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Real-world dev stories, tech deep-dives, and lessons from freelancing in Vancouver.
              No fluff, just what I actually learned building things.
            </p>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                First post coming soon. Stay tuned! ✍️
              </p>
            </div>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
