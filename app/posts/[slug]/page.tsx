import { getSdkWithFetch } from "@/lib/graphql-client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const sdk = getSdkWithFetch({ next: { revalidate: 60 } });
  const { posts } = await sdk.GetAllPostSlugs();
  return posts.nodes.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const sdk = getSdkWithFetch({ next: { revalidate: 60 } });
  const { postBy } = await sdk.GetPostBySlug({ slug: params.slug });

  if (!postBy) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
      <article className="prose dark:prose-invert">
        <h1>{postBy.title}</h1>
        <p className="text-muted-foreground">{new Date(postBy.date).toLocaleDateString()}</p>
        <div dangerouslySetInnerHTML={{ __html: postBy.content ?? '' }} />
      </article>
    </div>
  );
}
