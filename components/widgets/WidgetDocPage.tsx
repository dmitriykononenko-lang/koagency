import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Страница-документ виджета (поддержка, инструкция, политика) из Markdown-текста (data/widgetDocs.ts).
 * Поддерживает то, что есть в текстах разработки: заголовки, абзацы, списки (в т.ч. вложенные),
 * таблицы, разделитель, жирный, код, ссылки. Front matter и HTML-комментарии отбрасываются.
 */

export function readDoc(raw: string) {
  let body = raw;
  const meta: Record<string, string> = {};
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3);
    raw
      .slice(3, end)
      .split('\n')
      .forEach((l) => {
        const i = l.indexOf(':');
        if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim();
      });
    body = raw.slice(end + 4);
  }
  body = body.replace(/<!--[\s\S]*?-->/g, '');
  return { meta, body };
}

function inline(text: string, key = 'i'): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const k = `${key}-${n++}`;
    if (t.startsWith('**')) out.push(<strong key={k} className="font-semibold text-[#101010]">{inline(t.slice(2, -2), k)}</strong>);
    else if (t.startsWith('`')) out.push(<code key={k} className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[0.9em]">{t.slice(1, -1)}</code>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const ext = href.startsWith('http');
      out.push(
        <a key={k} href={href} className="text-[#E60000] underline-offset-2 hover:underline" {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {label}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Якорь заголовка как на GitHub: «Подписка и оплата» → «подписка-и-оплата». */
function slugify(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*`]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s/g, '-');
}

type Item = { text: string; children: { ordered: boolean; items: string[] } | null };

function render(md: string): ReactNode[] {
  const lines = md.split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;
  const isUl = (l: string) => /^\s*[-*] /.test(l);
  const isOl = (l: string) => /^\s*\d+\. /.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = line.match(/^(#{1,4}) (.*)$/);
    if (h) {
      const lvl = h[1].length;
      const cls =
        lvl === 1
          ? 'mb-6 mt-2 text-3xl font-bold tracking-tight text-[#101010] sm:text-4xl'
          : lvl === 2
            ? 'mb-4 mt-12 text-2xl font-bold tracking-tight text-[#101010]'
            : lvl === 3
              ? 'mb-2 mt-8 text-lg font-semibold text-[#101010]'
              : 'mb-2 mt-6 text-base font-semibold text-[#101010]';
      const Tag = (`h${lvl}` as unknown) as 'h1';
      out.push(
        <Tag key={k++} id={slugify(h[2])} className={`scroll-mt-24 ${cls}`}>
          {inline(h[2], `h${k}`)}
        </Tag>,
      );
      i++;
      continue;
    }
    if (line.startsWith('>')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quote.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(
        <blockquote key={k++} className="my-6 rounded-r-xl border-l-4 border-[#E60000] bg-[#fff7f7] px-5 py-4 text-[15px] leading-relaxed text-[#333]">
          {inline(quote.join(' '), `q${k}`)}
        </blockquote>,
      );
      continue;
    }
    if (/^---\s*$/.test(line)) {
      out.push(<hr key={k++} className="my-12 border-black/10" />);
      i++;
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i].trim())) rows.push(lines[i].trim().slice(1, -1).split('|').map((c) => c.trim()));
        i++;
      }
      const [head, ...rest] = rows;
      out.push(
        <div key={k++} className="my-6 overflow-x-auto rounded-xl border border-black/10">
          <table className="w-full min-w-[520px] text-left text-[15px]">
            <thead className="bg-[#f5f5f5]">
              <tr>{head.map((c, j) => <th key={j} className="px-4 py-3 font-semibold text-[#101010]">{inline(c, `th${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {rest.map((r, ri) => (
                <tr key={ri} className="border-t border-black/5">
                  {r.map((c, j) => <td key={j} className="px-4 py-3 align-top text-[#444]">{inline(c, `td${ri}${j}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (isUl(line) || isOl(line)) {
      const ordered = isOl(line) && !/^\s/.test(line);
      const items: Item[] = [];
      while (i < lines.length && (isUl(lines[i]) || isOl(lines[i]))) {
        const l = lines[i];
        if (/^\s{2,}/.test(l) && items.length) {
          const last = items[items.length - 1];
          if (!last.children) last.children = { ordered: isOl(l), items: [] };
          last.children.items.push(l.replace(/^\s*([-*]|\d+\.) /, ''));
        } else items.push({ text: l.replace(/^\s*([-*]|\d+\.) /, ''), children: null });
        i++;
      }
      const ListTag = ordered ? 'ol' : 'ul';
      out.push(
        <ListTag key={k++} className={`my-4 space-y-2 pl-6 text-[16px] leading-relaxed text-[#333] ${ordered ? 'list-decimal' : 'list-disc'} marker:text-[#E60000]`}>
          {items.map((it, j) => (
            <li key={j}>
              {inline(it.text, `li${k}${j}`)}
              {it.children && (
                <ul className="mt-2 list-disc space-y-1.5 pl-6">
                  {it.children.items.map((c, ci) => <li key={ci}>{inline(c, `lc${k}${j}${ci}`)}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ListTag>,
      );
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4} |\||>|---\s*$)/.test(lines[i]) && !isUl(lines[i]) && !isOl(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    out.push(
      <p key={k++} className="my-4 text-[16px] leading-relaxed text-[#333]">
        {para.map((p, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {inline(p, `p${k}${j}`)}
          </span>
        ))}
      </p>,
    );
  }
  return out;
}

export function WidgetDocPage({
  file,
  backHref,
  backLabel,
  kicker,
  children,
}: {
  file: string;
  backHref: string;
  backLabel: string;
  kicker: string;
  children?: ReactNode;
}) {
  const { body } = readDoc(file);
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-black/5 bg-[#f5f5f5] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pb-4">
          <Link href={backHref} className="inline-flex items-center gap-2 text-sm text-[#666] transition-colors hover:text-[#E60000]">
            ← {backLabel}
          </Link>
        </div>
      </div>
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#999]">{kicker}</div>
        {render(body)}
        {children}
      </article>
    </div>
  );
}
