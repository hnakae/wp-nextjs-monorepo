import { fetchGraphQL } from "@/lib/graphql-client";
import {
  GetAllBlogPostsDocument,
  GetBlogPostBySlugDocument,
} from "@/lib/generated/graphql";
import { notFound } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { dummyBlogPosts } from "@/data/dummy-blog-data";
import { SGFViewer } from "@/components/go-club/SGFViewer";
import { SGFParser } from "@/lib/sgf-parser";
import { SGFData } from "@/lib/sgf-types";
import { Buffer } from "buffer";

const SGF_DATA_PREFIX = "<!-- SGF_DATA:";
const SGF_DATA_SUFFIX = "-->";

function extractAndDecodeSGF(content: string): { sgfString: string | null; cleanContent: string } {
  const startIndex = content.indexOf(SGF_DATA_PREFIX);
  const endIndex = content.indexOf(SGF_DATA_SUFFIX, startIndex);

  if (startIndex !== -1 && endIndex !== -1) {
    const sgfString = content.substring(startIndex + SGF_DATA_PREFIX.length, endIndex).trim();
    const cleanContent = content.substring(0, startIndex) + content.substring(endIndex + SGF_DATA_SUFFIX.length);
    return { sgfString, cleanContent };
  }
  return { sgfString: null, cleanContent: content };
}

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

  const { sgfString, cleanContent } = extractAndDecodeSGF(post.content || "");
  let sgfData: SGFData | null = null;

  console.log("Extracted SGF String:", sgfString ? "Found" : "Not Found");
  console.log("Clean Content Length:", cleanContent.length);

  if (sgfString) {
    try {
      const parsedSGF = SGFParser.parse(sgfString);
      console.log("Parsed SGF:", parsedSGF);
      sgfData = {
        title: post.title, // Use post title for SGF viewer title
        description: post.excerpt || "", // Use post excerpt for SGF viewer description
        initialCommentary: parsedSGF.gameInfo.C || "",
        boardSize: parsedSGF.size,
        gameInfo: parsedSGF.gameInfo,
        moves: parsedSGF.moves.map((move) => ({
          stone: { x: move.x, y: move.y, color: move.color },
          title: `Move ${move.moveNumber}`,
          commentary: move.comment || "",
        })),
        totalMoves: parsedSGF.totalMoves,
      };
      console.log("Transformed SGF Data:", sgfData);
    } catch (e) {
      console.error("Error parsing SGF:", e);
      // If parsing fails, we'll just render the content without the SGF viewer
    }
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

          {sgfData && (
            <SGFViewer
              title={sgfData.title}
              description={sgfData.description}
              moves={sgfData.moves}
              boardSize={sgfData.boardSize}
              initialCommentary={sgfData.initialCommentary}
            />
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanContent || "" }}
          />
        </div>
      </div>
    </div>
  );
}
