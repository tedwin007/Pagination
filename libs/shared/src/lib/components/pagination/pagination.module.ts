import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { AsPagesPipe } from './pipes/as-pages.pipe';
import { HasNextPagePipe } from './pipes/has-next-page.pipe';
import { IsCurrentPagePipe } from './pipes/is-current-page.pipe';
import { SplitArrayPipe } from '../../pipes/splitArray.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SplitArrayPipe,
    PaginationComponent,
    IsCurrentPagePipe,
    AsPagesPipe,
    HasNextPagePipe
  ],
  exports:[PaginationComponent,SplitArrayPipe]
})
export class PaginationModule { }
