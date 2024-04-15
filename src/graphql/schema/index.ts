import { gql } from 'apollo-server-express';
import { User } from './types/user.graphql';
import { Profile } from './types/profile.graphql';
import { Post } from './types/post.graphql';
import { Comment } from './types/comment.graphql';
import { Auth } from './types/auth.graphql';
import { CreateCommentInput } from './inputs/create-comment-input.graphql';
import { UserQuery } from './queries/user-queries.graphql';
import { PostQuery } from './queries/post-queries.graphql';
import { CommentQuery } from './queries/comment-queries.graphql';
import { AuthMutation } from './mutations/auth-mutations.graphql';
import { PostMutation } from './mutations/post-mutations.graphql';
import { CommentMutation } from './mutations/comment-mutations.graphql';

export const typeDefs = gql`
  ${User}
  ${Profile}
  ${Post}
  ${Comment}
  ${Auth}

  ${CreateCommentInput}

  type Query {
    ${UserQuery}
    ${PostQuery}
    ${CommentQuery}
  }

  type Mutation {
    ${AuthMutation}
    ${PostMutation}
    ${CommentMutation}
  }
`;
