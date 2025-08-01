
export interface BlogPost {
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

export const dummyBlogPosts: BlogPost[] = [
  {
    id: "dummy-1",
    title: "Dummy Article 1: The Basics of Go",
    slug: "dummy-article-1",
    date: "2024-07-25T10:00:00",
    excerpt: "<p>This is a <strong>dummy excerpt</strong> for the first article. It covers the fundamental rules and concepts of the game of Go.</p>",
    content: "<h2>Introduction to Go</h2><p>Go is an ancient board game for two players. It is played with black and white stones on a grid of intersecting lines.</p><h3>Objective</h3><p>The objective of Go is to surround a larger total area of the board with your stones than your opponent.</p>",
    author: { node: { name: "Dummy Author" } },
    categories: { nodes: [{ name: "Beginner" }, { name: "Featured" }] },
    tags: { nodes: [{ name: "Rules" }, { name: "Strategy" }] },
  },
  {
    id: "dummy-2",
    title: "Dummy Article 2: Advanced Tactics",
    slug: "dummy-article-2",
    date: "2024-07-20T14:30:00",
    excerpt: "<p>Explore <em>complex tactics</em> and strategies to elevate your Go game. This article delves into advanced concepts like tesuji and joseki.</p>",
    content: "<h2>Tesuji and Joseki</h2><p>Tesuji are brilliant moves that achieve a specific tactical goal. Joseki are established sequences of moves in the corners.</p><h3>Reading Ahead</h3><p>The ability to read many moves ahead is crucial for advanced players.</p>",
    author: { node: { name: "Dummy Author" } },
    categories: { nodes: [{ name: "Advanced" }] },
    tags: { nodes: [{ name: "Tactics" }, { name: "Joseki" }] },
  },
  {
    id: "dummy-3",
    title: "Dummy Article 3: Go Club Community",
    slug: "dummy-article-3",
    date: "2024-07-15T09:00:00",
    excerpt: "<p>Learn about the vibrant <strong>Eugene Go Club community</strong> and how to get involved in local events and tournaments.</p>",
    content: "<h2>Joining the Club</h2><p>Our club meets weekly for games, lessons, and friendly competition. All skill levels are welcome!</p><h3>Upcoming Events</h3><p>Check our calendar for details on our next tournament and social gatherings.</p>",
    author: { node: { name: "Community Contributor" } },
    categories: { nodes: [{ name: "Community" }] },
    tags: { nodes: [{ name: "Events" }, { name: "Membership" }] },
  },
];

export const dummyBlogCategories: string[] = [
  "All",
  "Beginner",
  "Advanced",
  "Community",
];
