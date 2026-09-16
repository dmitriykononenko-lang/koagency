import { LEGAL_ENTITY, SUPPORT_EMAIL } from '@/lib/contacts';

/**
 * Полный блок реквизитов ИП для оферты, счетов, юридических документов.
 * Одна точка правды — данные тянутся из `lib/contacts.ts`.
 */
export function LegalRequisites({ compact = false }: { compact?: boolean }) {
  const { legalName, inn, bank } = LEGAL_ENTITY;
  const rows: Array<[string, string]> = [
    ['Наименование', legalName],
    ['ИНН', inn],
    ['Банк', bank.name],
    ['БИК', bank.bik],
    ['Расчётный счёт', bank.account],
    ['Корреспондентский счёт', bank.correspondentAccount],
  ];

  if (compact) {
    return (
      <div className="rounded-xl border border-black/10 bg-[#f8f8f8] p-4 text-sm">
        <dl className="grid gap-1.5 sm:grid-cols-[max-content_1fr]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-[#666] sm:whitespace-nowrap sm:pr-4">{k}</dt>
              <dd className="font-mono text-[13px] text-[#101010] break-all">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f8f8f8]">
      <dl className="divide-y divide-black/5">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-3 sm:grid-cols-[220px_1fr] sm:gap-6 sm:px-6 sm:py-4">
            <dt className="text-sm text-[#666]">{k}</dt>
            <dd className="font-mono text-[14px] text-[#101010] break-all sm:text-[15px]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-black/5 bg-white px-5 py-3 text-sm text-[#666] sm:px-6">
        Контакт для обращений:{' '}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-[#E60000] underline-offset-4 hover:underline"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}
