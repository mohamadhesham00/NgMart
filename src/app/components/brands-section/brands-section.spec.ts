import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsSection } from './brands-section';

describe('BrandsSection', () => {
  let component: BrandsSection;
  let fixture: ComponentFixture<BrandsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
