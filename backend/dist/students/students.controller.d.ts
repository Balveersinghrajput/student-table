import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    findAll(): Promise<import("./student.entity").Student[]>;
    findById(id: number): Promise<import("./student.entity").Student>;
    create(dto: CreateStudentDto): Promise<import("./student.entity").Student>;
    update(id: number, dto: UpdateStudentDto): Promise<import("./student.entity").Student>;
    remove(id: number): Promise<{
        message: string;
    }>;
    bulkImport(students: CreateStudentDto[]): Promise<import("./student.entity").Student[]>;
    uploadPhoto(id: number, file: Express.Multer.File): Promise<import("./student.entity").Student>;
}
