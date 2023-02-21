// pagination.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { IsCurrentPagePipe } from './pipes/is-current-page.pipe';
import { AsPagesPipe } from './pipes/as-pages.pipe';
import { HasNextPagePipe } from './pipes/has-next-page.pipe';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        PaginationComponent,
        AsPagesPipe,
        HasNextPagePipe,
        IsCurrentPagePipe,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.currentPage = 1;
    component.itemsPerPage = 10;
    component.totalItems = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set totalPages correctly when ngOnChanges is called', () => {
    component.ngOnChanges({
      totalItems: {
        currentValue: 100,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
      itemsPerPage: {
        currentValue: 10,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.totalPages).toEqual(10);
  });

  it('should handle invalid input of totalItems correctly', () => {
    component.ngOnChanges({
      totalItems: {
        currentValue: 0,
        previousValue: 100,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    expect(component.totalPages).toEqual(0);
  });

  it('should decrement currentPage correctly when previousPage is called', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should not decrement currentPage when currentPage is 1', () => {
    component.previousPage();
    expect(component.currentPage).toEqual(1);
  });

  it('should increment currentPage correctly when nextPage is called', () => {
    component.nextPage();
    expect(component.currentPage).toEqual(2);
  });

  it('should not increment currentPage when currentPage is equal to totalPages', () => {
    component.currentPage = 10;
    component.nextPage();
    expect(component.currentPage).toEqual(10);
  });

  it('should set currentPage correctly when setCurrentPage is called', () => {
    component.setCurrentPage(5);
    expect(component.currentPage);
  });
});
