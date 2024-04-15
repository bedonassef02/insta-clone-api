import { userService } from '../../utils/ioc/services.ioc';

export const userQueryResolver = {
  users: () => userService.findAll(),
  user: async (_: any, { username }: { username: string }) => {
    const user = await userService.findOne(username);
    console.log(user)
    return {
      ...user,
      posts: user ? user.posts : [],
      profile: user ? user.profile : undefined,
    };
  },
};
