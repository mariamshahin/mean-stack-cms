import { createAction, props } from '@ngrx/store';
import { Post } from 'app/shared/models/data.model';

export enum DraftsActionsTypes {
  ViewDrafts = '[Drafts] View Drafts',
  ViewDraftsSuccess = '[Drafts] View Drafts Success',
  ViewDraftsFail = '[Drafts] View Drafts Fail',
  DeleteDraft = '[Drafts] Delete Draft',
  DeleteDraftSuccess = '[Drafts] Delete Draft Success',
  DeleteDraftFail = '[Drafts] Delete Draft Fail',
}

export const viewDrafts = createAction(DraftsActionsTypes.ViewDrafts);

export const draftsSuccess = createAction(
  DraftsActionsTypes.ViewDraftsSuccess,
  props<{
    drafts: Post[];
  }>()
);

export const draftsFail = createAction(
  DraftsActionsTypes.ViewDraftsFail,
  props<{
    error: string;
  }>()
);

export const deleteDraft = createAction(
  DraftsActionsTypes.DeleteDraft,
  props<{
    id: number;
  }>()
);

export const deleteSuccess = createAction(
  DraftsActionsTypes.DeleteDraftSuccess,
  props<{
    response: string;
  }>()
);

export const deleteFail = createAction(
  DraftsActionsTypes.DeleteDraftFail,
  props<{
    error: string;
  }>()
);
