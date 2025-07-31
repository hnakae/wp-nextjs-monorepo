'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: string;
    title?: string | null;
    slug?: string | null;
    date?: string | null;
  };
}

export function PostCard({ post }: PostCardProps) {
  if (!post.slug) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title ?? "Untitled Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        {post.date && <p className="text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>}
        <Link href={`/posts/${post.slug}`} passHref>
          <Button variant="outline" className="mt-4">Read More</Button>
        </Link>
      </CardContent>
    </Card>
  );
}