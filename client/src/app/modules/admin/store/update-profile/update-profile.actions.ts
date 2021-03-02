import { createAction, props } from '@ngrx/store';
import { Profile } from '../../admin.model';

export enum UpdateProfileActionsTypes {
  UpdateProfile = '[Update Profile] Update Profile',
  UpdateProfileSuccess = '[Update Profile] Update Profile Success',
  UpdateProfileFail = '[Update Profile] Update Profile Fail',
}

export const updateProfile = createAction(
  UpdateProfileActionsTypes.UpdateProfile,
  props<{
    payload: Profile;
  }>()
);

export const updateSuccess = createAction(
  UpdateProfileActionsTypes.UpdateProfileSuccess,
  props<{
    response: string;
    data: any;
  }>()
);

export const updateFail = createAction(
  UpdateProfileActionsTypes.UpdateProfileFail,
  props<{
    error: string;
  }>()
);
