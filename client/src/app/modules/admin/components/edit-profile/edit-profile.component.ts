import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'app/shared/components/ui-elements/modal/modal.component';
import { selectAdmin } from 'app/modules/admin/store';
import { FormControlModel } from 'app/shared/components/ui-elements/form-control/form-control.model';
import { updateProfile } from '../../store/update-profile/update-profile.actions';
import { updateImage } from '../../store/update-image/update-image.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modalComponent: ModalComponent;
  faCamera = faCamera;
  userData$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state.auth.data?.user)
  );
  updateImage$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state.updateImage?.response)
  );

  userSub: Subscription;
  formSub: Subscription;
  imageSub: Subscription;
  profileForm: FormGroup;
  user: {
    username: string;
    email: string;
    full_name?: string;
    summary?: string;
  };
  isFormDisabled = true;
  overlay = false;

  imageFile: any = '';
  croppedImage: any = '';
  initialSelectText = 'Select Profile Photo';
  selectText = this.initialSelectText;

  formTemplateControls = [
    new FormControlModel({
      name: 'full_name',
      placeholder: 'Full Name',
    }),
    new FormControlModel({
      type: 'textarea',
      name: 'summary',
      placeholder: 'Summary',
    }),
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    this.userSub = this.userData$.subscribe((user) => (this.user = user));
    this.imageSub = this.updateImage$.subscribe(() => {
      this.modalComponent?.close();
      this.imageFile = null;
      this.selectText = this.initialSelectText;
    });

    this.profileForm = new FormGroup({
      full_name: new FormControl(this.user.full_name, [Validators.required]),
      summary: new FormControl(this.user.summary, [Validators.required]),
    });
    this.formSub = this.profileForm.valueChanges.subscribe((data) =>
      data.full_name !== this.user.full_name ||
      data.summary !== this.user.summary
        ? (this.isFormDisabled = false)
        : (this.isFormDisabled = true)
    );
  }

  get controls(): object {
    return this.formTemplateControls;
  }

  onSubmit(): void {
    if (this.profileForm.invalid || this.isFormDisabled) {
      return;
    }
    this.store.dispatch(
      updateProfile({
        payload: {
          username: this.user.username,
          email: this.user.email,
          ...this.profileForm.value,
        },
      })
    );
  }

  openModal() {
    return this.modalComponent.open();
  }

  selectFile(e) {
    this.imageFile = e;
    this.selectText = e
      ? 'Crop selected image and upload'
      : 'Select Profile Photo';
  }

  imageCrop(e) {
    this.croppedImage = e;
  }

  submitUploadImage() {
    if (!this.croppedImage) {
      return;
    }
    console.log(this.croppedImage);
    this.store.dispatch(
      updateImage({
        payload: {
          image: this.croppedImage,
        },
      })
    );
  }

  ngOnDestroy() {
    this.modalComponent?.close();
    this.userSub.unsubscribe();
    this.formSub.unsubscribe();
    this.imageSub.unsubscribe();
  }
}
