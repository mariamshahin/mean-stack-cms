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
  _id: number;
  username: string;
  email: string;
  role: Role;
  full_name?: string;
  summary?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  token?: string;
  user: UserData;
}

export interface Post {
  _id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user: string;
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
  cellTemplate?: TemplateRef<any>;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
}
