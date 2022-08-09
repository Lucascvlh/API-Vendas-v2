import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
