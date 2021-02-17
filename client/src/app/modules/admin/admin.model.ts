export interface Profile {
  username: string;
  email: string;
  full_name: string;
  summary: string;
}

export interface Password {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
