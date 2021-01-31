export interface Control {
  type?: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  errors?: { errName: string; errMsg: string }[];
  required?: boolean;
  disabled?: boolean;
}
