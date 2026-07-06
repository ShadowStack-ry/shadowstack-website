import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { PortableTextBody } from "@/components/blog/portable-text";
import { AuthorByline } from "@/components/blog/author-byline";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/format";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  TYPE_LABELS,
  type Post,
} from "@/sanity/lib/queries";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await client.fetch<{ slug: string }[]>(POST_SLUGS_QUERY);
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(
    POST_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="pt-16">
        <article className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3" />
              All posts
            </Link>

            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">
                {TYPE_LABELS[post.type] ?? post.type}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3" />
                {formatDate(post.publishedAt)}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold uppercase leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.subtitle ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {post.subtitle}
              </p>
            ) : null}

            {post.authors?.length ? (
              <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                By {post.authors.map((a) => a.name).join(", ")}
              </p>
            ) : null}
          </div>

          {post.coverImage ? (
            <div className="mx-auto mt-10 max-w-4xl px-6">
              <div className="relative aspect-[16/9] overflow-hidden border border-border bg-secondary">
                <Image
                  src={urlFor(post.coverImage)
                    .width(1600)
                    .height(900)
                    .fit("crop")
                    .url()}
                  alt={post.coverImage.alt ?? post.title}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-3xl px-6">
            {post.body?.length ? <PortableTextBody value={post.body} /> : null}
            {post.authors?.length ? (
              <AuthorByline authors={post.authors} />
            ) : null}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
