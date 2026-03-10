import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from '../students/students.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly configService;
    private readonly studentsService;
    private readonly adminEmail;
    private readonly adminPasswordHash;
    constructor(jwtService: JwtService, configService: ConfigService, studentsService: StudentsService);
    adminLogin(email: string, password: string): Promise<{
        token: string;
        message: string;
    }>;
    studentLogin(studentId: string): Promise<{
        student: import("../students/student.entity").Student;
        message: string;
    }>;
}
