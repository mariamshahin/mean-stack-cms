import { createAction, props } from '@ngrx/store';
import { DraftData } from '../../drafts.model';

export enum DraftActionsTypes {
  UpdateDraft = '[Drafts] Update Draft',
  UpdateDraftSuccess = '[Drafts] Update Draft Success',
  UpdateDraftFail = '[Drafts] Update Draft Fail',
}

export const updateDraft = createAction(
  DraftActionsTypes.UpdateDraft,
  props<{
    payload: DraftData;
    id: number;
  }>()
);

export const updateSuccess = createAction(
  DraftActionsTypes.UpdateDraftSuccess,
  props<{
    response: string;
  }>()
);

export const updateFail = createAction(
  DraftActionsTypes.UpdateDraftSuccess,
  props<{
    error: string;
  }>()
);
