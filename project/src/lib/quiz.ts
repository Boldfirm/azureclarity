import { domains, type DomainId } from '@/data/questions';

export function domainLabel(id: DomainId): string {
  const d = domains.find((x) => x.id === id);
  return d ? d.short : id;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
