import { AuthDto } from '../../utils/dtos/auth.dto';
import { authService } from '../../utils/ioc/services.ioc';
import { isUserExist } from '../../utils/validators/is-user-exist';

export const authMutationResolver = {
  register: async (_: any, registerDto: AuthDto) => {
    await isUserExist(registerDto);

    return authService.register(registerDto);
  },
  login: async (_: any, loginDto: AuthDto) => {
    return authService.login(loginDto);
  },
};
