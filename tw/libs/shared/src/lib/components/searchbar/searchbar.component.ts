import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';
import {tap, takeUntil, debounceTime} from 'rxjs/operators';

@Component({
  selector: 'shared-searchbar',
  template: `
      <div class="searchbar-container">
          <input #SearchBarInput
                 [(ngModel)]="value"
                 type="text"
                 class="searchbar-input"
                 [placeholder]="placeHolder"
                 (input)="onSearchChange(SearchBarInput.value) ">
          <span><i class="fa fa-search"></i></span>
      </div>
  `,
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {
  @Input() value?: string = ''
  @Input() placeHolder = 'Search Term'
  @Output() searchChange = new EventEmitter<string>();
  private _ngUnsubscribe = new Subject<null>()
  private _query$ = new BehaviorSubject<string>('');
  reset = () => this.value = ''

  ngOnInit(): void {
    this._query$.asObservable().pipe(
      takeUntil(this._ngUnsubscribe),
      debounceTime(200),
      tap((val: string) => this.searchChange.emit(val)),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this._ngUnsubscribe.next(null)
    this._ngUnsubscribe.complete()
  }

  onSearchChange(term: string): void {
    this._query$.next(term)
  }
}

