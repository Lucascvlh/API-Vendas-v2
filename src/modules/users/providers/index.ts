import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementions/BcryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
