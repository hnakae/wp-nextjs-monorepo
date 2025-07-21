// app/posts/[slug]/page.tsx
import { sdk } from '../../../lib/graphql-client';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
    const { postBy } = await sdk.GetPostBySlug({ slug: resolvedParams.slug });
  if (!postBy) return <p>Not found</p>;

  return (
    <article>
      <h1>{postBy.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postBy.content ?? '' }} />
    </article>
  );
}
