// Define the article type
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

// News State
export interface NewsState {
  articles: Article[];
  totalResults: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
