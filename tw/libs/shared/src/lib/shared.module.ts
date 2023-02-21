import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalStoreDbService} from "./services/local-store-db.service";
import {SearchbarComponent} from './components/searchbar/searchbar.component';
import {SplitPipe} from './pipes/split.pipe';
import {AgGridModule} from "ag-grid-angular";
import {BrowserModule} from "@angular/platform-browser";
import {ButtonsModule} from "./directives/buttons/buttons.module";
import { PaginationModule } from './components/pagination/pagination.module';
import { FormsModule } from '@angular/forms';
import {PaginationService} from "./components/pagination/pagination.service";

@NgModule({
  providers: [LocalStoreDbService,PaginationService],
  imports: [
    FormsModule,
    CommonModule,
    ButtonsModule,
    AgGridModule.withComponents(),
    PaginationModule
  ],
  declarations: [
    SearchbarComponent,
    SplitPipe,
  ],
  exports: [
    SearchbarComponent,
    SplitPipe,
    PaginationModule,
    ButtonsModule
  ]
})
export class SharedModule {
}
