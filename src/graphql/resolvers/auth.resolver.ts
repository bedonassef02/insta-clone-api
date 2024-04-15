import { AuthDto } from '../../utils/dtos/auth.dto';
import { authService } from '../../utils/ioc/services.ioc';

export const authMutationResolver = {
  register: async (_: any, registerDto: AuthDto) => {
    return authService.register(registerDto);
  },
  login: async (_: any, loginDto: AuthDto) => {
    return authService.login(loginDto);
  },
};
