import { Component, Input, Inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AdminState, selectAdmin } from 'app/modules/admin/store';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() width = 50;
  @Input() height = 50;
  @Input() profile = true;
  @Input() user: { [key: string]: any };

  userData$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state.auth.data?.user)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store<AdminState>
  ) {}
}
