import bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { AuthDto } from '../utils/dtos/auth.dto';
import { TokenService } from './token.service';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: AuthDto) {
    const user = await this.userService.findOne(loginDto.username);

    if (!user || (await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Invalid username or password');
    }

    return await this.tokenService.generateResponse(user);
  }

  async register(registerDto: AuthDto) {
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userService.create(registerDto);
    return await this.tokenService.generateResponse(user);
  }
}
