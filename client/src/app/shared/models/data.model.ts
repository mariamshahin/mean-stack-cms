import { NavigationExtras } from '@angular/router';
import { TemplateRef } from '@angular/core';

export enum Role {
  admin = 'admin',
  editor = 'editor',
  author = 'author',
  contributer = 'contributer',
  subscriber = 'subscriber',
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: Role;
  full_name?: string;
  summary?: string;
  image_url?: string;
  updated_at: string;
}

export interface Route {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
  redirect?: boolean;
}

export interface DataTableColumn {
  name?: string;
  prop: string;
  flexGrow: number;
  cellTemplate?: TemplateRef<any>;
}

export class User {
  token?: string;
  user: UserData;

  constructor(data) {
    this.token = data.token;
    this.user._id = data.user._id;
    this.user.username = data.user.username;
    this.user.email = data.user.email;
    this.user.role = data.user.role;
    this.user.full_name = data.user.full_name || '';
    this.user.summary = data.user.summary || '';
    this.user.image_url = data.user.image_url || '';
    this.user.updated_at = data.user.updated_at;
  }
}
