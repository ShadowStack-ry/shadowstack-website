# Sanity Blog CMS — Design

**Date:** 2026-07-05
**Status:** Approved (decisions confirmed by user)

## Goal

Add Sanity as the CMS for the ShadowStack website, starting with a single
content type: blog posts. Editors manage content through an embedded Sanity
Studio; the Next.js site will later query and render those posts.

## Decisions

- **Studio location:** Embedded in this Next.js app at `/studio` (one repo,
  one Vercel deploy) via `next-sanity`.
- **Project provisioning:** The user logs into Sanity (`sanity login`); the
  project ID + dataset are then wired into env vars.
- **Schema scope:** Blog posts only. Luma/API integration explicitly deferred.

## Architecture

- `sanity.config.ts` (root) — Studio config: projectId, dataset, schema,
  `structureTool` + `visionTool` plugins, `basePath: /studio`.
- `sanity.cli.ts` (root) — CLI config for dataset/deploy commands.
- `src/sanity/env.ts` — reads `NEXT_PUBLIC_SANITY_PROJECT_ID`,
  `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`.
- `src/sanity/schemaTypes/` — schema definitions (`blogPost.ts`, `index.ts`).
- `src/sanity/lib/client.ts` — configured Sanity client for querying.
- `src/sanity/lib/image.ts` — image URL builder for Sanity image assets.
- `src/app/studio/[[...tool]]/page.tsx` — mounts `<NextStudio>` at `/studio`.

## `blogPost` schema

| Field         | Type                    | Notes                                        |
| ------------- | ----------------------- | -------------------------------------------- |
| `title`       | string (required)       | Post title                                   |
| `subtitle`    | string                  | Optional subtitle                            |
| `slug`        | slug (required)         | URL path, generated from title               |
| `type`        | string (required)       | `news` \| `knowledge-sharing`, radio select  |
| `coverImage`  | image (+ alt text)      | Cover image, hotspot enabled                 |
| `publishedAt` | datetime (required)     | Defaults to now; used for ordering           |
| `body`        | array of block + image  | Portable Text rich text with inline images   |

## Environment variables

Required in `.env.local` (local) and the Vercel project (production):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (`production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (optional; defaults to a pinned date)

## Out of scope (for now)

- Rendering blog posts on the public site (list + detail pages).
- Luma API integration.
- Additional content types (authors, tags, events).
