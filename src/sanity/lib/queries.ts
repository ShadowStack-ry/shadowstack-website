import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type PostType = "news" | "knowledge-sharing";

export type PostAuthor = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: SanityImageSource;
  linkedin?: string;
  github?: string;
  lovable?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  type: PostType;
  publishedAt: string;
  coverImage?: SanityImageSource & { alt?: string };
  authors?: Pick<PostAuthor, "_id" | "name">[];
};

export type Post = Omit<PostListItem, "authors"> & {
  body?: PortableTextBlock[];
  authors?: PostAuthor[];
};

// All published posts, newest first (blog index).
export const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)]
  | order(publishedAt desc){
    _id, title, subtitle, "slug": slug.current, type, publishedAt, coverImage,
    "authors": authors[]->{_id, name}
  }`;

// A single post by slug (post page).
export const POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, subtitle, "slug": slug.current, type, publishedAt, coverImage, body,
    "authors": authors[]->{_id, name, bio, avatar, linkedin, github, lovable}
  }`;

// Just the slugs (static params).
export const POST_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
    "slug": slug.current
  }`;

export const TYPE_LABELS: Record<PostType, string> = {
  news: "News",
  "knowledge-sharing": "Knowledge Sharing",
};
