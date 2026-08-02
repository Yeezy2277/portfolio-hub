/**
 * Profile drift check.
 *
 * The hero profile has two hand-maintained sources: this repo's
 * `config/profile.ts` fallback and the `profile` entry in Contentful (seeded
 * from cms-blog) that `lib/profile.ts` overlays on top at runtime. It's easy to
 * update one and forget the other — e.g. a location/timezone change that lands
 * in the CMS but not the fallback, so the offline build shows stale facts.
 *
 * This fetches the live Contentful profile and flags any identity field whose
 * non-empty CMS value disagrees with the fallback. Skips cleanly when no
 * Contentful credentials are present (e.g. this repo's local env, which is
 * GitHub-only), so it's safe to wire into CI as an optional guard.
 *
 *   node --experimental-strip-types scripts/check-profile-sync.mjs
 */
import { profile as fallback } from "../config/profile.ts";

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENV = process.env.CONTENTFUL_ENVIRONMENT || "master";
const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";

// Identity fields most prone to silent drift (the scalars a résumé edit touches).
const FIELDS = [
  "name",
  "headline",
  "tagline",
  "location",
  "timezone",
  "available",
  "availability",
];

if (!SPACE || !TOKEN) {
  console.log(
    "skipped: no Contentful credentials (set CONTENTFUL_SPACE_ID + " +
      "CONTENTFUL_ACCESS_TOKEN to compare the fallback against the live CMS).",
  );
  process.exit(0);
}

const url =
  `https://cdn.contentful.com/spaces/${SPACE}/environments/${ENV}/entries` +
  `?content_type=profile&limit=1&access_token=${TOKEN}`;
const res = await fetch(url);
if (!res.ok) {
  console.error(`Contentful request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const data = await res.json();
const cms = data.items?.[0]?.fields;
if (!cms) {
  console.log("skipped: no `profile` entry in Contentful yet.");
  process.exit(0);
}

const drift = [];
for (const key of FIELDS) {
  const cmsValue = cms[key]?.[LOCALE];
  if (cmsValue === undefined || cmsValue === "") continue; // CMS keeps fallback
  if (cmsValue !== fallback[key]) {
    drift.push({ key, cms: cmsValue, fallback: fallback[key] });
  }
}

if (drift.length) {
  console.error(`✗ profile drift — config/profile.ts is stale vs Contentful:`);
  for (const d of drift) {
    console.error(`  ${d.key}:`);
    console.error(`    CMS:      ${JSON.stringify(d.cms)}`);
    console.error(`    fallback: ${JSON.stringify(d.fallback)}`);
  }
  console.error("\nUpdate config/profile.ts to match, or re-seed the CMS.");
  process.exit(1);
}

console.log(`✓ profile in sync — ${FIELDS.length} identity fields match Contentful.`);
