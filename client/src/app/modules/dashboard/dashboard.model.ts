import { Auth, Role } from 'app/shared/models/data.model';

export class AuthUser implements Auth {
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

  constructor(authData: Auth) {
    this.token = authData.token;
    this.user._id = authData.user._id;
    this.user.username = authData.user.username;
    this.user.email = authData.user.email;
    this.user.role = authData.user.role;
    this.user.full_name = authData.user.full_name || '';
    this.user.summary = authData.user.summary || '';
    this.user.image_url = authData.user.image_url || '';
    this.user.updated_at = authData.user.updated_at;
  }
}
