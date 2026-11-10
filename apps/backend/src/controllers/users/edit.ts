// filepath: /Users/marrybye/Documents/Универ/КПЗ/KPZ-4/src/controllers/users/edit.ts
import { Request, Response, NextFunction } from 'express';

import { UserService } from 'service/UserService';
import { UserResponseDTO } from '../../dto/user_response_dto';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { username, name } = req.body;
  const userService = new UserService();

  const { result, error } = await userService.edit(id, username, name);

  if (error) {
    return next(error);
  }

  const userDTO = new UserResponseDTO(result);

  res.customSuccess(200, 'User successfully saved.', userDTO);
};