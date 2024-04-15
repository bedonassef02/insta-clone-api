import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { AuthDto } from '../utils/dtos/auth.dto';
import { JWT_SECRET } from '../utils/constants';

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: AuthDto) {
    const user = await this.userService.findOne(loginDto.username);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const valid = await bcrypt.compare(loginDto.password, user.password);
    if (!valid) {
      throw new Error('Invalid username or password');
    }
    return this.generateResponse(user);
  }

  async register(registerDto: AuthDto) {
    const existingUser = await this.userService.findOne(registerDto.username);

    if (existingUser) {
      throw new Error('Username already exists');
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.create(registerDto);
    return this.generateResponse(user);
  }

  private generateResponse(user: any) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        profile: user.profile.id,
      },
    };
  }
}
