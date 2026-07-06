import { type SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";
import { author } from "./author";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogPost, author],
};
