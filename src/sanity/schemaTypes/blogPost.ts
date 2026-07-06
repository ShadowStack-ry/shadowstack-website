import { defineArrayMember, defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL path for this post, e.g. /blog/my-post.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Knowledge Sharing", value: "knowledge-sharing" },
        ],
        layout: "radio",
      },
      initialValue: "news",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describes the image for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "type",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      const label =
        subtitle === "knowledge-sharing" ? "Knowledge Sharing" : "News";
      return { title, subtitle: label, media };
    },
  },
});
