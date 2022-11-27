import { BookData } from "./bookData";

export class FormData {
  id: number; 
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  userData: { 
    password: string; 
    confirmpassword: string
  };
}
  