export interface Project {
  slug: string;
  title: string;
  year: string;
  blurb: string;
  stack: string[];
  tag?: string;
  featured: boolean;
  hue: number;
}

export const projects: Project[] = [
  {
    slug: "kaamconnect",
    title: "KaamConnect",
    year: "2026",
    blurb:
      "A booking platform that connects people to local service providers — plumbers, electricians, tutors — without a middleman.",
    stack: ["Flask", "Node.js", "Supabase"],
    featured: true,
    hue: 221,
  },
  {
    slug: "vehicle-rental",
    title: "Vehicle Rental Manager",
    year: "2025",
    blurb:
      "A desktop app to rent, sell, and return vehicles. Tracks the available and rented fleet, takes customer feedback, and prints a digital bill with the renter's details and return date.",
    stack: ["Java", "AWT", "JDBC"],
    featured: true,
    hue: 205,
  },
  {
    slug: "dawasetu-edge",
    title: "DawaSetu Edge",
    year: "2026",
    blurb:
      "An offline-first Android app that scans medicine strips and prescriptions, keeps a local Health Vault, answers questions by voice, and syncs a caregiver dashboard.",
    stack: ["Kotlin", "Jetpack Compose", "ML Kit OCR", "Room"],
    tag: "Hackathon build — live web demo",
    featured: true,
    hue: 190,
  },
  {
    slug: "image-compressor",
    title: "Image Compressor",
    year: "2025",
    blurb: "Compresses and converts images between JPEG and PNG in batches.",
    stack: ["Python", "Pillow", "NumPy"],
    featured: false,
    hue: 235,
  },
];

/** A flat, text-first "poster" per project, as a data-URI SVG — used as the
 * slide image in SmoothScrollSlider so the slider ships unmodified while
 * still surfacing real project content instead of stock photography. */
export function posterFor(p: Project): string {
  const bg1 = `hsl(${p.hue} 55% 16%)`;
  const bg2 = `hsl(${p.hue + 20} 60% 8%)`;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg1}"/>
      <stop offset="1" stop-color="${bg2}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="640" fill="url(#g)"/>
  <text x="48" y="560" fill="#F1F2F4" font-family="Space Grotesk, sans-serif" font-size="42" font-weight="600">${escapeXml(
    p.title
  )}</text>
  <text x="48" y="592" fill="#C7CBD1" font-family="Inter, sans-serif" font-size="17">${escapeXml(
    p.stack.join(" · ")
  )}</text>
  <text x="48" y="70" fill="#9AA6C8" font-family="Space Grotesk, sans-serif" font-size="16">${escapeXml(
    p.year
  )}</text>
</svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
