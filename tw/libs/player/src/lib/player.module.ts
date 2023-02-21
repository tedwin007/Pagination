import { ModuleWithProviders, NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SharedModule } from '@tw/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayerGridViewComponent } from './components/player-grid-view/player-grid-view.component';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerService } from './player.service';
import { PlayerComponent } from './player.component';
import { AgGridModule } from 'ag-grid-angular';
import { PlayerApiService } from './services/player-api.service';
import { ToGridPlayerPipe } from './pipes/to-grid-player.pipe';
import { FiltersMangerService } from './services/filters-manger.service';
import { SelectOptionFilterComponent } from './components/player-grid-view/grid-filters/select-option-filter/select-option-filter.component';
import {TournamentGridComponent} from "./components/tournament-grid/tournament-grid.component";
import {
  TournamentGridInfoComponent
} from "./components/tournament-grid/components/tournament-grid-info/tournament-grid-info.component";

const LocationProvider = [
    {provide: APP_BASE_HREF, useValue: ''},
    Location,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
];

@NgModule({
  declarations: [
    PlayerComponent,
    TournamentGridInfoComponent,
    PlayerGridViewComponent,
    TournamentGridComponent,
    PlayerComponent,
    ToGridPlayerPipe,
    SelectOptionFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    PlayerRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers: [PlayerService,PlayerApiService,FiltersMangerService,LocationProvider],
  exports: [
    SharedModule,
    PlayerGridViewComponent,
    PlayerComponent,
    ToGridPlayerPipe,
  ],
})
export class PlayerModule {
  static forRoot(): ModuleWithProviders<PlayerModule> {
    return {
      ngModule: PlayerModule,
      providers: [PlayerService,PlayerApiService],
    };
  }

  static forChild(): ModuleWithProviders<PlayerModule> {
    return {
      ngModule: PlayerModule,
      providers: [PlayerService],
    };
  }
}
