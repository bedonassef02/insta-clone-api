import { authMutationResolver } from './resolvers/auth.resolver';
import {
  commentMutationResolver,
  commentQueryResolver,
} from './resolvers/comment.resolver';
import { postMutationResolver, postQueryResolver } from './resolvers/post.resolver';
import { userQueryResolver } from './resolvers/user.resolver';

export const resolvers = {
  Query: {
    ...userQueryResolver,
    ...commentQueryResolver,
    ...postQueryResolver
  },
  Mutation: {
    ...authMutationResolver,
    ...commentMutationResolver,
    ...postMutationResolver
  },
};
