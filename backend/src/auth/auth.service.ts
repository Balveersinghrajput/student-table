import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { StudentsService } from '../students/students.service';

@Injectable()
export class AuthService {
  private readonly adminEmail: string;
  private readonly adminPasswordHash: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly studentsService: StudentsService,
  ) {
    this.adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    // Hash the admin password at startup
    const plainPassword = this.configService.get<string>('ADMIN_PASSWORD');
    // We use hashSync here since it only runs once at startup
    this.adminPasswordHash = bcrypt.hashSync(plainPassword, 10);
  }

  async adminLogin(email: string, password: string) {
    if (email !== this.adminEmail) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, this.adminPasswordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', email, role: 'admin' };
    return {
      token: this.jwtService.sign(payload),
      message: 'Login successful',
    };
  }

  async studentLogin(studentId: string) {
    const student = await this.studentsService.findByStudentId(studentId);
    return {
      student,
      message: 'Student login successful',
    };
  }
}
