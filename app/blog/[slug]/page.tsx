import { fetchGraphQL } from "@/lib/graphql-client";
import {
  GetAllBlogPostsDocument,
  GetBlogPostBySlugDocument,
} from "@/lib/generated/graphql";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dummyBlogPosts } from "@/data/dummy-blog-data";
import SgfViewerClient from "@/components/blog/SgfViewerClient";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  console.log("generateStaticParams: Starting...");
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true") {
    console.log("generateStaticParams: Using dummy data.");
    return dummyBlogPosts.map((post) => ({
      slug: post.slug,
    }));
  } else {
    try {
      console.log("generateStaticParams: Fetching from GraphQL.");
      const response = await fetchGraphQL(GetAllBlogPostsDocument);
      const posts = response.posts.nodes;
      console.log(`generateStaticParams: Fetched ${posts.length} posts.`);
      return posts.map((post: { slug: string }) => ({
        slug: post.slug,
      }));
    } catch (error) {
      console.error("generateStaticParams: Error fetching posts:", error);
      // Fallback to empty array to prevent build failure if API is down
      return [];
    }
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  let post;
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === "true") {
    post = dummyBlogPosts.find((p) => p.slug === slug);
  } else {
    const response = await fetchGraphQL(GetBlogPostBySlugDocument, { slug });
    post = response.postBy;
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <Badge variant="secondary">
                  {post.categories.nodes[0].name}
                </Badge>
              )}
              {post.tags?.nodes && post.tags.nodes.map((tag: { name: string }) => (
                <Badge key={tag.name} variant="outline">
                  {tag.name}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author?.node?.name}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          <SgfViewerClient
            initialPostContent={post.content || ""}
            postTitle={post.title}
            postExcerpt={post.excerpt || ""}
            sgfUrl={post.postSgfData?.sgfFile?.node?.mediaItemUrl || null}
          />

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </div>
    </div>
  );
}
