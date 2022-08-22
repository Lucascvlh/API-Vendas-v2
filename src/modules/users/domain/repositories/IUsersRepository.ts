import { ICreateUsers } from '../models/ICreateUsers';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findAll(user: IUser): Promise<IUser | undefined>;
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUsers): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
