// filepath: [destroy.ts](http://_vscodecontentref_/1)
import { Request, Response, NextFunction } from 'express';

import { UserService } from 'service/UserService';
import { UserResponseDTO } from '../../dto/user_response_dto';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const userService = new UserService();

  const { result, error } = await userService.destroy(id);

  if (error) {
    return next(error);
  }

  const userDTO = new UserResponseDTO(result);

  res.customSuccess(200, 'User successfully deleted.', userDTO);
};