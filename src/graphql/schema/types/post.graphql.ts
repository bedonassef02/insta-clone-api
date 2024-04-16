export const Post = `type Post {
  id: Int!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
}`;
