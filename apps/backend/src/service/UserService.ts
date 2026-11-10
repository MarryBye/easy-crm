import { getRepository } from 'typeorm';

import { Role, Language } from '../orm/entities/users/types';
import { User } from '../orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

class UserService {
  private userRepository = getRepository(User);

  private makeCustomError(errors: string[]) {
    return new CustomError(404, "Raw", errors.join("\n"));
  }

  async list(): Promise<{ result: User[] | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors: string[] = [];

    const users = await this.userRepository.find({
      relations: ['car', 'orders_as_driver', 'orders_as_client'],
    });

    if (!users || users.length === 0) {
      errors.push("No users found.");
    }

    if (errors.length === 0) {
      data.result = users;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async show(id: number | string): Promise<{ result: User | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors: string[] = [];

    const user = await this.userRepository.findOne(id, {
      relations: ['car', 'orders_as_driver', 'orders_as_client'],
    });

    if (!user) {
      errors.push("User not found.");
    }

    if (errors.length === 0) {
      data.result = user;
    } else {
      data.error = this.makeCustomError(errors);
    }

    return data;
  }

  async create(
    email: string,
    password: string,
    username?: string,
    name?: string,
    role?: Role,
    language?: Language,
  ): Promise<{ result: User | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors: string[] = [];

    try {
      const userExists = await this.userRepository.findOne({ where: { email } });
      if (userExists) {
        errors.push(`User with email ${email} already exists.`);
      }

      if (errors.length === 0) {
        const user = this.userRepository.create();
        user.email = email;
        user.password = password;
        user.username = username ?? null;
        user.name = name ?? null;
        user.role = role ?? 'STANDARD';
        user.language = language ?? 'en-US';

        if (errors.length === 0) {
          await this.userRepository.save(user);
          data.result = user;
        } else {
          data.error = this.makeCustomError(errors);
        }
      } else {
        data.error = this.makeCustomError(errors);
      }

      return data;
    } catch (error) {
      errors.push((error as any).message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }

  async edit(id: number | string, username?: string, name?: string): Promise<{ result: User | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors: string[] = [];

    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        errors.push("User not found.");
        data.error = this.makeCustomError(errors);
        return data;
      }

      if (username !== undefined) {
        user.username = username;
      }

      if (name !== undefined) {
        user.name = name;
      }

      if (errors.length === 0) {
        await this.userRepository.save(user);
        data.result = user;
      } else {
        data.error = this.makeCustomError(errors);
      }

      return data;
    } catch (error) {
      errors.push((error as any).message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }

  async destroy(id: number | string): Promise<{ result: User | null; error: CustomError | null }> {
    let data = { result: null, error: null };
    let errors: string[] = [];

    try {
      const { result, error } = await this.show(id);

      if (error) {
        data.error = error;
        return data;
      }

      if (errors.length === 0) {
        data.result = result;
        await this.userRepository.delete(id);
      } else {
        data.error = this.makeCustomError(errors);
      }

      return data;
    } catch (error) {
      errors.push((error as any).message);
      data.error = this.makeCustomError(errors);
      return data;
    }
  }
}

export { UserService };