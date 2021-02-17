import { createAction, props } from '@ngrx/store';

export enum UpdateImageActionsTypes {
  UpdateImage = '[Update Profile] Update Image',
  UpdateImageSuccess = '[Update Profile] Update Image Success',
  UpdateImageFail = '[Update Profile] Update Image Fail',
}

export const updateImage = createAction(
  UpdateImageActionsTypes.UpdateImage,
  props<{
    payload: any;
  }>()
);

export const updateSuccess = createAction(
  UpdateImageActionsTypes.UpdateImageSuccess,
  props<{
    response: string;
  }>()
);

export const updateFail = createAction(
  UpdateImageActionsTypes.UpdateImageFail,
  props<{
    error: string;
  }>()
);
