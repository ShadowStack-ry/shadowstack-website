import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor, imageDimensions } from "@/sanity/lib/image";

type ImageValue = { alt?: string; asset?: { _ref?: string } };
type LinkValue = { href?: string };

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as ImageValue;
      const dims = imageDimensions(image);
      if (!dims) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(image).width(1600).fit("max").auto("format").url()}
            alt={image.alt ?? ""}
            width={dims.width}
            height={dims.height}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full border border-border"
          />
          {image.alt ? (
            <figcaption className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              {image.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mt-5 leading-relaxed text-muted-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-semibold uppercase tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold uppercase tracking-tight text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 text-lg font-semibold uppercase tracking-wide text-foreground">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-primary pl-5 text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value as LinkValue)?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-4 hover:no-underline"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
};

export function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-sm sm:text-base">
      <PortableText value={value} components={components} />
    </div>
  );
}
