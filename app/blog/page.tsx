"use client";

import { useState } from "react";
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
import {
  blogArticles,
  blogCategories,
  type BlogArticle,
} from "@/data/blog-articles";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedArticle, setSelectedArticle] =
    useState<BlogArticle | null>(null);

  const filteredArticles =
    selectedCategory === "All"
      ? blogArticles
      : blogArticles.filter(
          (article) => article.category === selectedCategory,
        );

  const featuredArticle = blogArticles.find(
    (article) => article.featured,
  );

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
                <Badge variant="secondary">
                  {selectedArticle.category}
                </Badge>
                {selectedArticle.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold">
                {selectedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedArticle.author}
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
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime}
                </div>
              </div>
            </div>

            {/* Article content */}
            <div className="prose prose-lg max-w-none">
              {selectedArticle.content
                .split("\n\n")
                .map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2
                        key={index}
                        className="text-2xl font-semibold mt-8 mb-4"
                      >
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  } else if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="text-xl font-semibold mt-6 mb-3"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  } else if (
                    paragraph.startsWith("**") &&
                    paragraph.endsWith("**")
                  ) {
                    return (
                      <p
                        key={index}
                        className="font-semibold mb-4"
                      >
                        {paragraph.replace(/\*\*/g, "")}
                      </p>
                    );
                  } else if (
                    paragraph.startsWith("*[") &&
                    paragraph.endsWith("]*")
                  ) {
                    return (
                      <p
                        key={index}
                        className="italic text-muted-foreground mb-4"
                      >
                        {paragraph.replace(/\*\[|\]\*/g, "")}
                      </p>
                    );
                  } else if (
                    paragraph.startsWith("1. ") ||
                    paragraph.startsWith("- ")
                  ) {
                    // Simple list handling - in a real app you'd want more sophisticated parsing
                    return (
                      <p key={index} className="mb-2">
                        {paragraph}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={index}
                        className="mb-4 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    );
                  }
                })}
            </div>

            {/* Related articles */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                More Articles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogArticles
                  .filter(
                    (article) =>
                      article.id !== selectedArticle.id,
                  )
                  .slice(0, 2)
                  .map((article) => (
                    <Card
                      key={article.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() =>
                        setSelectedArticle(article)
                      }
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
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
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
                    <Badge variant="secondary">
                      {featuredArticle.category}
                    </Badge>
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
                        {featuredArticle.author}
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
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {featuredArticle.readTime}
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
              {blogCategories.map((category) => (
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
                .filter((article) => !article.featured) // Don't show featured article twice
                .map((article) => (
                  <Card
                    key={article.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          {article.category}
                        </Badge>
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
                          {article.tags
                            .slice(0, 3)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{article.author}</span>
                            <span>{article.readTime}</span>
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