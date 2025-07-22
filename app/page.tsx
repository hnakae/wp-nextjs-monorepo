// at the top of app/page.tsx
import { sdk } from '../lib/graphql-client';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Home() {
  // Fetch the latest 5 posts
  const { posts } = await sdk.GetLatestPosts({ first: 5 });

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Posts</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts?.nodes.map((post) => (
          <a href={`/posts/${post.slug}`} key={post.id}>
            <Card className="hover:bg-muted transition-colors">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </PageWrapper>
  );
}
