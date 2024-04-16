import { AuthDto } from '../dtos/auth.dto';
import { userService } from '../ioc/services.ioc';

export const isUserExist = async (registerDto: AuthDto): Promise<void> => {
  const existingUser = await userService.findOne(registerDto.username);

  if (existingUser) {
    throw new Error('Username already exists');
  }
};
