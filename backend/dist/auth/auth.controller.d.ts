import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    adminLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        message: string;
    }>;
    studentLogin(body: {
        studentId: string;
    }): Promise<{
        student: import("../students/student.entity").Student;
        message: string;
    }>;
}
