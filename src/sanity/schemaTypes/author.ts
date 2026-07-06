import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
      description: "Optional profile photo shown on post bylines.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alternative text", type: "string" }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      rows: 2,
      validation: (rule) =>
        rule.max(200).warning("Keep the bio short — under 200 characters."),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "github",
      title: "GitHub",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "lovable",
      title: "Lovable profile",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "bio", media: "avatar" },
  },
});
