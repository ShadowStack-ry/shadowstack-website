/**
 * This route mounts the Sanity Studio at /studio. All routing within the
 * Studio is handled by the catch-all [[...tool]] segment.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
