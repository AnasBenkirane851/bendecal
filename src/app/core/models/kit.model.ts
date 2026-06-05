import { Fitment } from './fitment.model';
import { KitVariant } from './kit-variant.model';

export interface Kit {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  fitments: Fitment[];
  variants: KitVariant[];
  includes: string[];
  featured?: boolean;
}
