import { userService } from '../../utils/ioc/services.ioc';

export const userQueryResolver = {
  users: () => userService.findAll(),
  user: async (_: any, { username }: { username: string }) => {
    return await userService.findOne(username);
  },
};
