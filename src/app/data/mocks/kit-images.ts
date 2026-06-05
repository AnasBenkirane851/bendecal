import { Kit } from '../../core/models/kit.model';
import { defaultKitImageKeys } from '../../core/config/asset-url';

export function withDefaultKitImages(kit: Kit): Kit {
  if (kit.images.length > 0) {
    return kit;
  }
  return {
    ...kit,
    images: defaultKitImageKeys(kit.slug),
  };
}
