import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { AuthDto } from '../utils/dtos/auth.dto';

const JWT_SECRET: string = process.env.JWT_SECRET as string;

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
    return jwt.sign({ userId: user.id }, JWT_SECRET);
  }

  async register(registerDto:AuthDto) {
    const existingUser = await this.userService.findOne(registerDto.username);

    if (existingUser) {
      throw new Error('Username already exists');
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.create(registerDto);
    return jwt.sign({ userId: user.id }, JWT_SECRET);
  }
}
