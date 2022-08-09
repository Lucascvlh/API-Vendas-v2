import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}
  public async execute({ id, name, email }: IRequest): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customerRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
