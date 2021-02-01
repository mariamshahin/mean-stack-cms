export enum Role {
  admin,
  editor,
  author,
  contributer,
  subscriber,
}

export interface Auth {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: Role;
    full_name?: string;
    summary?: string;
    image_url?: string;
    updated_at: string;
  };
}
