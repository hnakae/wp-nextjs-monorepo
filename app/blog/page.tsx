"use client";

import { useEffect, useState } from "react";
import { fetchGraphQL } from "@/lib/graphql-client";
import {
  GetAllBlogPostsDocument,
  GetBlogCategoriesDocument,
} from "@/lib/generated/graphql";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: {
      name: string;
    }[];
  };
  tags: {
    nodes: {
      name: string;
    }[];
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
} from "lucide-react";


export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsResponse = await fetchGraphQL(GetAllBlogPostsDocument);
        setPosts(postsResponse.posts.nodes);

        const categoriesResponse = await fetchGraphQL(GetBlogCategoriesDocument);
        const categoryNames = categoriesResponse.categories.nodes.map(
          (cat: { name: string }) => cat.name
        );
        setCategories(["All", ...categoryNames]);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }
    fetchData();
  }, []);

  const filteredArticles =
    selectedCategory === "All"
      ? posts
      : posts.filter((article) =>
          article.categories.nodes.some(
            (cat) => cat.name === selectedCategory
          )
        );

  // For now, let's just pick the first article as featured if available
  const featuredArticle = posts.length > 0 ? posts[0] : null;

  if (selectedArticle) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-8">
            {/* Back button */}
            <Button
              variant="ghost"
              onClick={() => setSelectedArticle(null)}
              className="mb-8"
            >
              ← Back to Articles
            </Button>

            {/* Article header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.categories.nodes.length > 0 && (
                  <Badge variant="secondary">
                    {selectedArticle.categories.nodes[0].name}
                  </Badge>
                )}
                {selectedArticle.tags.nodes.map((tag) => (
                  <Badge key={tag.name} variant="outline">
                    {tag.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedArticle.author.node.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(
                    selectedArticle.date,
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Article content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: selectedArticle.content,
              }}
            ></div>

            {/* Related articles */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                More Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {posts
                  .filter((article) => article.id !== selectedArticle.id)
                  .slice(0, 2)
                  .map((article) => (
                    <Card
                      key={article.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {article.title}
                        </CardTitle>
                        <CardDescription>
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{article.author.node.name}</span>
                            <span>
                              {new Date(article.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              Club Blog & Articles
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, strategies, and stories from the Eugene
              Go Club community. From beginner tips to advanced
              analysis, discover the depth and beauty of Go.
            </p>
          </div>

          {/* Featured article */}
          {featuredArticle && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Featured Article
              </h2>
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow border-primary/20"
                onClick={() =>
                  setSelectedArticle(featuredArticle)
                }
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">Featured</Badge>
                    {featuredArticle.categories.nodes.length > 0 && (
                      <Badge variant="secondary">
                        {featuredArticle.categories.nodes[0].name}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">
                    {featuredArticle.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {featuredArticle.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredArticle.author.node.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(
                          featuredArticle.date,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <Button>Read Article</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Category filters */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className="text-sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles grid */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {selectedCategory === "All"
                ? "All Articles"
                : `${selectedCategory} Articles`}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles
                .filter((article) => article.id !== featuredArticle?.id) // Don't show featured article twice
                .map((article) => (
                  <Card
                    key={article.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {article.categories.nodes.length > 0 && (
                          <Badge variant="secondary">
                            {article.categories.nodes[0].name}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">
                        {article.title}
                      </CardTitle>
                      <CardDescription>
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.nodes
                            .slice(0, 3)
                            .map((tag) => (
                              <Badge
                                key={tag.name}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag.name}
                              </Badge>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{article.author.node.name}</span>
                            <span>
                              {new Date(article.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center space-y-4 border-t pt-16">
            <h2 className="text-2xl font-semibold">
              Want to Contribute?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We welcome articles from club members! Share your
              Go insights, tournament experiences, or teaching
              tips with our community.
            </p>
            <Button>Submit an Article</Button>
          </div>
        </div>
      </div>
    </div>
  );
}