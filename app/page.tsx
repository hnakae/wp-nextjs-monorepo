// at the top of app/page.tsx
import { sdk } from '../lib/graphql-client';

export default async function Home() {
  // Fetch the latest 5 posts
  const { posts } = await sdk.GetLatestPosts({ first: 5 });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      <ul className="space-y-2">
        {posts?.nodes.map((post) => (
          <li key={post.id}>
            <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
