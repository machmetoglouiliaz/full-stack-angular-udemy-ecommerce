import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryMenu } from './product-category-menu';

describe('ProductCategoryMenu', () => {
  let component: ProductCategoryMenu;
  let fixture: ComponentFixture<ProductCategoryMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
