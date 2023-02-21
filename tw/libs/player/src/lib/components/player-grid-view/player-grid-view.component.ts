import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {AgGridEvent, ColDef} from 'ag-grid-community';
import {Player, SuspectedPlayer} from '../../models/classes/player.class';
import {SelectOptionFilterComponent} from './grid-filters/select-option-filter/select-option-filter.component';
import {PlayerLevel} from '../../models/enums/player-level.enum';
import {GetPlayersFilters, GridFilterChangeParams} from "../../models/interfaces/player-item.interface";
import {FiltersMangerService} from "../../services/filters-manger.service";

export enum GridStyleOf {
  Player = 'player-grid',
}

@Component({
  selector: 'tw-player-grid-view',
  providers: [FiltersMangerService],
  template: `
    <ag-grid-angular class="ag-theme-alpine"
                     [ngClass]="gridClass"
                     [rowData]="rowData"
                     (gridReady)="autoSize($event)"
                     [columnDefs]="columnDefs">
    </ag-grid-angular>
  `,
  styleUrls: ['./player-grid-view.component.scss'],
})
export class PlayerGridViewComponent implements OnInit {
  @Input() filters!: GetPlayersFilters | null;

  @Input() rowData: Player[] = [];
  @Output() onFilterChange = new EventEmitter<GridFilterChangeParams>()
  public gridClass = GridStyleOf.Player;
  private _columnDefs: ColDef[] = [];
  private _cellClassRules = {
    suspected: (params: { data: SuspectedPlayer }) => !!params.data.isSuspected
  };

  get columnDefs(): ColDef[] {
    return this._columnDefs;
  }

  ngOnInit(): void {
    this.setColumnDefs(  // filters should be from server (maybe with combination with caching)
      [
        {
          field: "id",
          sortable: true,
          cellClassRules: this._cellClassRules,
        },
        {
          field: "name",
          sortable: true,
          valueFormatter: (item) => item.value.toUpperCase(),
          cellClassRules: this._cellClassRules,
        },
        {
          field: "score",
          width: 160,
          sortable: true,
          cellClassRules: this._cellClassRules,
        },
        {
          width: 160,
          field: "level",
          sortable: true,
          cellClassRules: this._cellClassRules,
          filterFramework: SelectOptionFilterComponent,
          filterParams: {
            defaultValue: PlayerLevel.None,
            options: Object.values(PlayerLevel),
            callback: (value: PlayerLevel) => this.onFilterChange.emit({level: value})
          }
        },
      ]);
  }

  autoSize(event: AgGridEvent): void {
    event.api.sizeColumnsToFit();
  }

  setColumnDefs(value: ColDef[], cssClass?: GridStyleOf) {
    this._columnDefs = value;
    if (cssClass) {
      this.gridClass = cssClass;
    }
  }
}
