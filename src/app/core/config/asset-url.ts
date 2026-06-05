import { environment } from '../../../environments/environment';

export function defaultKitImageKeys(slug: string): string[] {
  return [`kits/${slug}/hero.webp`];
}

export function resolveAssetUrl(path: string): string {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const key = path.replace(/^\//, '');
  const base = environment.assetsBaseUrl.replace(/\/$/, '');
  if (base) {
    return `${base}/${key}`;
  }
  const prefix = environment.assetsLocalPrefix.replace(/\/$/, '');
  return `${prefix}/${key}`;
}

export function resolveKitHeroUrl(slug: string, images: string[]): string {
  const first = images[0];
  if (first) {
    return resolveAssetUrl(first);
  }
  return resolveAssetUrl(defaultKitImageKeys(slug)[0]);
}
