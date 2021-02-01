import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { SharedState, selectSharedState } from '../../../store';
import { closeAlert } from '../../../store/alert/alert.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  alert$ = this.store.pipe(
    select(selectSharedState),
    map((state) => state.alert)
  );

  constructor(private store: Store<SharedState>) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(closeAlert());
  }
}
