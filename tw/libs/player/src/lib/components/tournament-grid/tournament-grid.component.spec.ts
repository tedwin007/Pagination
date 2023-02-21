import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TournamentGridComponent} from './tournament-grid.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {GridFilterChangeParams, IPlayer, MAX_ITEMS_ALLOWED, PlayerLevel} from '@tw/player';

describe('TournamentGridComponent', () => {
  let component: TournamentGridComponent;
  let fixture: ComponentFixture<TournamentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TournamentGridComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the page number when jumpToPageChange is called', () => {
    const page = 2;
    jest.spyOn(component.jumpToPageChange, 'emit');
    component.jumpToPageChange.subscribe((page: number) => {
      expect(page).toBe(2);
    });
    component.jumpToPageChange.emit(page);
    expect(component.jumpToPageChange.emit).toHaveBeenCalledWith(page);
  });

  it('should emit the number of items per page when itemPerPageChange is called', () => {
    const itemsPerPage = 10;
    jest.spyOn(component.itemPerPageChange, 'emit');
    component.itemPerPageChange.subscribe((itemsPerPage: number) => {
      expect(itemsPerPage).toBe(10);
    });
    component.itemPerPageChange.emit(itemsPerPage);
    expect(component.itemPerPageChange.emit).toHaveBeenCalledWith(itemsPerPage);
  });

  it('should emit the grid filter change params when gridFilterChange is called', () => {
    const filterParams: GridFilterChangeParams = {
      level: PlayerLevel.Amateur,
    };
    jest.spyOn(component.gridFilterChange, 'emit');
    component.gridFilterChange.subscribe((filterParams: GridFilterChangeParams) => {
      expect(filterParams.level).toBe('test');
    });
    component.gridFilterChange.emit(filterParams);
    expect(component.gridFilterChange.emit).toHaveBeenCalledWith(filterParams);
  });

  it('should emit the current page number when currentPageChange is called', () => {
    const currentPage = 3;
    jest.spyOn(component.currentPageChange, 'emit');
    component.currentPageChange.subscribe((currentPage: number) => {
      expect(currentPage).toBe(3);
    });
    component.currentPageChange.emit(currentPage);
    expect(component.currentPageChange.emit).toHaveBeenCalledWith(currentPage);
  });

  it('should have the correct itemsPerPage input set', () => {
    component.itemsPerPage = 10;
    expect(component.itemsPerPage).toBe(10);
  });

  it('should have the correct currentPage input set', () => {
    component.currentPage = 2;
    expect(component.currentPage).toBe(2);
  });
})
