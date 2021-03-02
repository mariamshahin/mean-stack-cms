import { createAction, props } from '@ngrx/store';
import { DraftData } from '../../drafts.model';

export enum DraftActionsTypes {
  CreateDraft = '[Drafts] Create Draft',
  CreateDraftSuccess = '[Drafts] Create Draft Success',
  CreateDraftFail = '[Drafts] Create Draft Fail',
}

export const createDraft = createAction(
  DraftActionsTypes.CreateDraft,
  props<{
    payload: DraftData;
  }>()
);

export const createSuccess = createAction(
  DraftActionsTypes.CreateDraftSuccess,
  props<{
    response: string;
  }>()
);

export const createFail = createAction(
  DraftActionsTypes.CreateDraftFail,
  props<{
    error: string;
  }>()
);
