// filepath: [show.ts](http://_vscodecontentref_/0)
import { Request, Response, NextFunction } from 'express';

import { UserService } from 'service/UserService';
import { UserResponseDTO } from '../../dto/user_response_dto';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = new UserService();

  const { result, error } = await userService.show(id);

  if (error) {
    return next(error);
  }

  const userDTO = new UserResponseDTO(result);

  res.customSuccess(200, 'User found.', userDTO);
};