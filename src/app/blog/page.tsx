import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/lib/format";
import {
  POSTS_QUERY,
  TYPE_LABELS,
  type PostListItem,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and knowledge sharing from ShadowStack — Joensuu's clan of AI natives.",
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await client.fetch<PostListItem[]>(
    POSTS_QUERY,
    {},
    { next: { revalidate: 60 } },
  );

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="border-b border-border/60 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs uppercase tracking-[0.35em] text-primary">
              Writing
            </p>
            <h1 className="mt-4 text-4xl font-semibold uppercase leading-tight tracking-tight sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              News from the clan and knowledge sharing from the people building
              in it.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No posts yet. Check back soon.
              </p>
            ) : (
              <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-card transition-colors hover:bg-accent/40"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage)
                            .width(800)
                            .height(450)
                            .fit("crop")
                            .url()}
                          alt={post.coverImage.alt ?? post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                        <span className="text-primary">
                          {TYPE_LABELS[post.type] ?? post.type}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>
                      <h2 className="mt-4 text-lg font-semibold uppercase leading-snug tracking-tight">
                        {post.title}
                      </h2>
                      {post.subtitle ? (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {post.subtitle}
                        </p>
                      ) : null}
                      {post.authors?.length ? (
                        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                          By {post.authors.map((a) => a.name).join(", ")}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
