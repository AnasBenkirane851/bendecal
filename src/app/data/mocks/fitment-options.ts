import { KITS_MOCK } from './kits.mock';

export function getMakes(): string[] {
  const makes = new Set<string>();
  for (const kit of KITS_MOCK) {
    for (const f of kit.fitments) {
      makes.add(f.make);
    }
  }
  return [...makes].sort();
}

export function getModelsForMake(make: string): string[] {
  const models = new Set<string>();
  for (const kit of KITS_MOCK) {
    for (const f of kit.fitments) {
      if (f.make === make) {
        models.add(f.model);
      }
    }
  }
  return [...models].sort();
}

export function getYearsForMakeModel(make: string, model: string): number[] {
  const years = new Set<number>();
  for (const kit of KITS_MOCK) {
    for (const f of kit.fitments) {
      if (f.make === make && f.model === model) {
        for (let y = f.yearFrom; y <= f.yearTo; y++) {
          years.add(y);
        }
      }
    }
  }
  return [...years].sort((a, b) => b - a);
}
