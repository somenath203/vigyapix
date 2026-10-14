// Central settings for the Vigyapix landing page.
// Replace the two placeholder values below, everything else reads from here.

// TODO: Set this to your app's real entry / sign-in route (e.g. "/sign-in" or "/dashboard").
// Every "Get Started", "Sign in", "Create Your First Ad", "Start Creating" button uses it.
export const ENTRY_ROUTE = "/dashboard";

// TODO: Paste your GitHub repository URL here (e.g. "https://github.com/<user>/<repo>").
export const GITHUB_REPO_URL = "https://github.com/somenath203/vigyapix";

export const NAV_LINKS = [
  { label: "Features", id: "features" },
  { label: "How It Works", id: "how-it-works" },
  { label: "FAQs", id: "faq" },
];

// Shared layout + focus styles (kept here so server components can use them as plain strings).
export const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Opens real http(s) links in a new tab; leaves placeholders ("#") in the same tab.
export function externalProps(href) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}