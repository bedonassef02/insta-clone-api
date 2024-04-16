import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import { ProfileService } from '../../services/profile.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

export const userService = new UserService();

export const postService = new PostService();

export const profileService = new ProfileService();

export const tokenService = new TokenService();

export const authService = new AuthService(userService, tokenService);

export const commentService = new CommentService();
