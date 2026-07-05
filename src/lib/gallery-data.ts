// Placeholder hero gallery data. Images are seeded picsum.photos URLs — swap for
// real event photos (or wire to a CMS) later. Captions render bottom-left on hover.
export type GalleryItem = {
  id: string;
  src: string;
  eventName: string;
  date: string;
  description: string;
};

const seeds = [
  { seed: "jam-ignite", eventName: "Vibe Coding Jam", date: "June 20", description: "Building live with Cursor" },
  { seed: "nano-hack", eventName: "Nano-Hack", date: "May 14", description: "Shipping in under an hour" },
  { seed: "demo-night", eventName: "Demo Night", date: "May 02", description: "First products, first users" },
  { seed: "founders-mix", eventName: "Founders Mixer", date: "Apr 25", description: "North Karelia builders meet" },
  { seed: "lovable-lab", eventName: "Lovable Lab", date: "Apr 11", description: "From prompt to prototype" },
  { seed: "campus-jam", eventName: "Campus Jam", date: "Mar 28", description: "Students who ship" },
  { seed: "ai-natives", eventName: "AI Natives Meetup", date: "Mar 15", description: "The clan gathers" },
  { seed: "build-block", eventName: "Build Block", date: "Feb 29", description: "Four hours, one product" },
  { seed: "launch-pad", eventName: "Launch Pad", date: "Feb 12", description: "Ideas that leave the room" },
  { seed: "winter-jam", eventName: "Winter Coding Jam", date: "Jan 24", description: "Cold city, warm shipping" },
];

export const galleryItems: GalleryItem[] = seeds.map((s) => ({
  id: s.seed,
  // Portrait placeholders; deterministic per seed so they stay stable.
  src: `https://picsum.photos/seed/shadowstack-${s.seed}/600/800`,
  eventName: s.eventName,
  date: s.date,
  description: s.description,
}));
