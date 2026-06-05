import { TestBed } from '@angular/core/testing';
import { KITS_MOCK } from '../../data/mocks/kits.mock';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should add a line and update count', () => {
    const kit = KITS_MOCK[0];
    const variant = kit.variants[0];
    service.addLine(kit, variant, 2);
    expect(service.itemCount()).toBe(2);
    expect(service.lines().length).toBe(1);
  });

  it('should persist to localStorage', () => {
    const kit = KITS_MOCK[0];
    service.addLine(kit, kit.variants[0], 1);
    const stored = JSON.parse(localStorage.getItem('bendecal.cart') ?? '[]');
    expect(stored.length).toBe(1);
  });
});
