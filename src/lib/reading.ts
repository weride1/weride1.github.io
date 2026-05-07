// 中文 ~ 350 字/分钟；英文 ~ 220 词/分钟，混合时分别计权后取整
const CN_CHARS_PER_MIN = 350;
const EN_WORDS_PER_MIN = 220;

export function estimateReadingMinutes(raw: string): number {
  if (!raw) return 1;

  // 去掉 Markdown 噪音：代码块、行内代码、链接语法、图片、HTML
  const stripped = raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '');

  const cnChars = (stripped.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 英文单词：连续的拉丁字母/数字
  const enWords = (stripped.match(/[A-Za-z0-9]+/g) || []).length;

  const minutes = cnChars / CN_CHARS_PER_MIN + enWords / EN_WORDS_PER_MIN;
  return Math.max(1, Math.ceil(minutes));
}

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

// GitHub 风格的 anchor slug，与 rehype-slug 默认行为对齐
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 抽取 Markdown 中的 H2/H3 作为 TOC（H1 通常是文章标题，单独处理）
export function extractToc(raw: string): TocItem[] {
  if (!raw) return [];

  // 排除代码块内的 # 行
  const noCode = raw.replace(/```[\s\S]*?```/g, '');
  const lines = noCode.split(/\r?\n/);
  const toc: TocItem[] = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = m[2].replace(/[*_`]/g, '').trim();
    toc.push({ depth, text, slug: slugify(text) });
  }
  return toc;
}
