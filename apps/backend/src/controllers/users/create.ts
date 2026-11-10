import { Request, Response, NextFunction } from 'express';

import { UserService } from 'service/UserService';
import { UserResponseDTO } from '../../dto/user_response_dto';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const userService = new UserService();
  const { email, password, username, name, role, language } = req.body;

  const { result, error } = await userService.create(email, password, username, name, role, language);

  if (error) {
    return next(error);
  }

  const userDTO = new UserResponseDTO(result);

  res.customSuccess(201, 'User successfully created.', userDTO);
};