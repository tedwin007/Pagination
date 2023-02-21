import {Component, ElementRef, ViewChild} from '@angular/core';
import {IFilterAngularComp} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, IDoesFilterPassParams, IFilterParams} from 'ag-grid-community';
import {GetPlayersFilters, withOptions, FiltersMangerService, PlayerLevel} from '@tw/player';
import {Observable} from "rxjs";


export type FiltersParams = withOptions<IFilterParams & { callback: (value: string) => void, defaultValue: string }>;

@Component({
  selector: 'app-select-option-filter',
  template: `
    <div *ngIf="state | async as filters">
      <select class="form-select form-select-lg"
              #InputEl
              [value]="getValue(filters)"
              (change)="executeCallback()">
        <option *ngFor="let item of options;trackBy:trackByFunc"
                [selected]="!!item && item === value">{{item}}</option>
      </select>
    </div>
  `,
})
export class SelectOptionFilterComponent implements IFilterAngularComp {
  @ViewChild('InputEl') inputEl !: ElementRef;
  state: Observable<GetPlayersFilters> = this.filtersService.getState();
  defaultValue = '';
  value!: string | number | boolean;
  field!: keyof GetPlayersFilters & string;
  options!: string[];
  callback?: (value: string) => void;
  constructor(private filtersService: FiltersMangerService) {
  }
  getValue(filters?: GetPlayersFilters) {
    return filters?.[this.field] || this.defaultValue
  }

  agInit(params: FiltersParams): void {
    this.options = params.options
    this.field = params.colDef.field as keyof GetPlayersFilters;
    this.defaultValue = params.defaultValue
    this.callback = params.callback

  }

  trackByFunc(item: number, option: string) {
    return option
  }

  isFilterActive(): boolean {
    return true
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return !!(this.field && this.options?.includes(params.data[this.field]))
  }

  getModel() {
    return;
  }

  setModel(model: any) {
    return;
  }

  executeCallback() {
    this.callback?.(this.inputEl.nativeElement.value)
  }

  public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
    this.inputEl.nativeElement.value = this.filtersService.getFilterQueryData(this.field) || this.defaultValue;
  }

}
