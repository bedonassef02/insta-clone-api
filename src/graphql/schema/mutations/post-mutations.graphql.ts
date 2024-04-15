export const PostMutation = `
  createPost(title: String!, content: String!): Post
  updatePost(id: Int!, content: String!): Post
  deletePost(id: Int!): Boolean
`;
