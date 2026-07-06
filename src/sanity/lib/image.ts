import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Extract the intrinsic pixel dimensions encoded in a Sanity image asset ref
 * (e.g. "image-abc123-1600x900-png") so next/image can preserve aspect ratio.
 */
export function imageDimensions(
  source: { asset?: { _ref?: string } } | undefined | null,
): { width: number; height: number } | undefined {
  const ref = source?.asset?._ref;
  if (!ref) return undefined;
  const dims = ref.split("-")[2];
  const [width, height] = (dims ?? "").split("x").map(Number);
  if (!width || !height) return undefined;
  return { width, height };
}
