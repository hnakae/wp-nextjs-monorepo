import { getSdkWithFetch } from "@/lib/graphql-client";
import { PostCard } from "./PostCard";

export async function Blog() {
  const sdk = getSdkWithFetch({ next: { revalidate: 60 } });
  const { posts } = await sdk.GetLatestPosts({ first: 6 });

  return (
    <section id="blog" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl">Latest Posts</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {posts?.nodes.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}