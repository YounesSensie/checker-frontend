
export type ContentBlockType =
  | "paragraph"
  | "heading2"
  | "heading3"
  | "proTip"
  | "imageWithCaption"
  | "bulletList"
  | "callToAction"

export interface ParagraphBlock {
  type: "paragraph";
  text: string;
}
export interface CallToActionBlock {
  type: "callToAction";
  text: string;       // the surrounding text shown as paragraph
  linkLabel: string;  // the clickable button/link text
  href: string;       // the URL
}
export interface Heading2Block {
  type: "heading2";
  text: string;
  icon?: string; // material symbol name
}

export interface Heading3Block {
  type: "heading3";
  text: string;
}

export interface ProTipBlock {
  type: "proTip";
  title: string;
  icon: string;
  text: string;
}

export interface BulletItem {
  label: string;
  text: string;
}

export interface BulletListBlock {
  type: "bulletList";
  items: BulletItem[];
}

export interface ImageWithCaptionBlock {
  type: "imageWithCaption";
  src: string;
  alt: string;
  caption?: string;
}

export type ContentBlock =
  | ParagraphBlock
  | Heading2Block
  | Heading3Block
  | ProTipBlock
  | BulletListBlock
  | ImageWithCaptionBlock
  | CallToActionBlock;

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string; // URL or path
}

export interface BlogTag {
  label: string;
  slug: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string; // lead paragraph / meta description
  coverImage: string; // URL or path
  coverImageAlt: string;
  author: BlogAuthor;
  publishedAt: string; // ISO date string e.g. "2023-10-24"
  readingTimeMinutes: number;
  category: string;
  tags: BlogTag[];
  content: ContentBlock[];
  relatedArticles?: RelatedArticle[];
}