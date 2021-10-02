import { User } from '../models/User';

export interface CreateUser {
  create(data: CreateUserDTO): User;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
