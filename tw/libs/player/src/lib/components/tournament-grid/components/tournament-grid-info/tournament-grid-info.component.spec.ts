import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentGridInfoComponent } from './tournament-grid-info.component';

describe('TournamentGridInfoComponent', () => {
  let component: TournamentGridInfoComponent;
  let fixture: ComponentFixture<TournamentGridInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentGridInfoComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentGridInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total number of pages correctly', () => {
    component.itemsPerPage = 10;
    component.total = 30;
    expect(component.getTotalPages()).toEqual(3);
  });

  it('should return 0 total pages when items per page or total is missing', () => {
    expect(component.getTotalPages()).toEqual(0);
  });

  it('should emit jumpToPageChanged event with a valid page number', () => {
    jest.spyOn(component,'getTotalPages').mockReturnValue(100);
    jest.spyOn(component.jumpToPageChanged, 'emit');
    const page = 3;
    component.jumpToPage(String(page));
    expect(component.jumpToPageChanged.emit).toHaveBeenCalledWith(page);
  });

  it('should Not emit jumpToPageChanged event with a valid page number', () => {
    jest.spyOn(component,'getTotalPages').mockReturnValue(2);
    jest.spyOn(component.jumpToPageChanged, 'emit');
    const page = 3;
    component.jumpToPage(String(page));
    expect(component.jumpToPageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('should emit jumpToPageChanged event with last page number when the entered page number is greater than the total pages', () => {
    jest.spyOn(component.jumpToPageChanged, 'emit');
    component.itemsPerPage = 10;
    component.total = 20;
    const page = 3;
    component.jumpToPage(String(page + 1));
    expect(component.jumpToPageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit jumpToPageChanged event when the entered page number is invalid', () => {
    jest.spyOn(component.jumpToPageChanged, 'emit');
    component.itemsPerPage = 10;
    component.total = 30;
    const invalidPage = 'invalid';
    component.jumpToPage(invalidPage);
    expect(component.jumpToPageChanged.emit).not.toHaveBeenCalled();
  });
});
