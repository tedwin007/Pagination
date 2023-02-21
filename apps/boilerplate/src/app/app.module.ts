import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedModule} from "@tw/shared";
import {PlayerModule} from "@tw/player";

/**
 * If that was a "real" application built as (part) of a product,
 * the app was only the layout & routing glue (of different domains feature)
 */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot([{
      path: '',
      loadChildren: () => import('@tw/player').then(m => m.Player())
    }]),
    CommonModule,
    BrowserModule,
    FormsModule,
    PlayerModule.forChild(),
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
