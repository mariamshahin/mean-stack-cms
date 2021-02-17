export interface Control {
  type?: 'text' | 'email' | 'password' | 'textarea';
  name: string;
  placeholder: string;
  errors?: { errName: string; errMsg: string }[];
  required?: boolean;
  disabled?: boolean;
}
