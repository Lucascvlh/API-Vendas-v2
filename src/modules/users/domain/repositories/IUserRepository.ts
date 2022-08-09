import { IUSer } from '../models/IUser';

export interface IUserRepository {
  findByName(name: string): Promise<IUSer | undefined>;
  findById(id: string): Promise<IUSer | undefined>;
  findByEmail(email: string): Promise<IUSer | undefined>;
}
