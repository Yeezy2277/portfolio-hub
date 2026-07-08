/** The flat view model every card renders from — regardless of source. */
export type Project = {
  /** Stable id (repo name, or slug from the local manifest). */
  id: string;
  title: string;
  summary: string;
  /** Live deployment URL, if any. */
  liveUrl?: string;
  /** Source repository URL, if any. */
  repoUrl?: string;
  /** Tech tags (GitHub topics minus the portfolio topic, or manifest tags). */
  tags: string[];
  /** Explicit preview image; when absent the card derives one from liveUrl. */
  image?: string;
  /** Whether the live site allows being embedded in an iframe (opt-in). */
  embeddable: boolean;
  /** Featured projects sort first and can render larger. */
  featured: boolean;
  /** Hidden projects are dropped (lets a tagged repo opt out). */
  hidden: boolean;
  /** Sort hint: lower = earlier. Ties break on updatedAt. */
  order: number;
  /** ISO date of last push; used for sorting and "updated" labels. */
  updatedAt?: string;
  stars: number;
};

/** The optional `.portfolio.json` a spoke repo can commit to override fields. */
export type PortfolioOverride = Partial<
  Pick<
    Project,
    "title" | "summary" | "liveUrl" | "image" | "tags" | "embeddable" | "featured" | "hidden" | "order"
  >
>;
