'use client';

import { CreateArticle } from '@/components/go-club/CreateArticle';
import { useRouter } from 'next/navigation';

export default function CreateArticlePage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  return <CreateArticle onNavigate={handleNavigate} />;
}