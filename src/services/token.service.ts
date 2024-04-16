import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { Payload } from '../utils/types/payload.type';

export class TokenService {
  private async generate(payload: Payload): Promise<string> {
    return jwt.sign(payload, JWT_SECRET);
  }

  private createPayload(user: any): Payload {
    return {
      id: user.id,
      username: user.username,
      profile: user.profile.id,
    };
  }

  async generateResponse(user: any): Promise<{ token: string; user: Payload }> {
    const payload: Payload = this.createPayload(user);
    const token: string = await this.generate(payload);
    return {
      token,
      user: payload,
    };
  }
}
