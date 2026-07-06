import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { PostAuthor } from "@/sanity/lib/queries";

function AuthorLinks({ author }: { author: PostAuthor }) {
  const links = [
    { label: "LinkedIn", href: author.linkedin },
    { label: "GitHub", href: author.github },
    { label: "Lovable", href: author.lovable },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  if (links.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          {l.label}
          <ArrowUpRight className="size-3" />
        </a>
      ))}
    </div>
  );
}

/** Full author card(s) shown at the foot of a post. */
export function AuthorByline({ authors }: { authors: PostAuthor[] }) {
  if (!authors?.length) return null;
  return (
    <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
      {authors.map((author) => (
        <div key={author._id} className="flex gap-4 bg-card p-6">
          {author.avatar ? (
            <Image
              src={urlFor(author.avatar).width(96).height(96).fit("crop").url()}
              alt={author.name}
              width={48}
              height={48}
              className="size-12 shrink-0 border border-border object-cover"
            />
          ) : (
            <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-secondary text-sm font-semibold uppercase text-primary">
              {author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide">
              {author.name}
            </div>
            {author.bio ? (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {author.bio}
              </p>
            ) : null}
            <AuthorLinks author={author} />
          </div>
        </div>
      ))}
    </div>
  );
}
