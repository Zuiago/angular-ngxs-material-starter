export interface FormModel {
  autosave: boolean;
  username: string;
  password: string;
  email: string;
  description: string;
  requestGift: boolean;
  birthday: Date;
  rating: number;
}

export interface FormStateModel {
  form: FormModel;
}
