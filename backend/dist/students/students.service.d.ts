import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';
export declare class StudentsService {
    private readonly studentRepo;
    constructor(studentRepo: Repository<Student>);
    findAll(): Promise<Student[]>;
    findById(id: number): Promise<Student>;
    findByStudentId(studentId: string): Promise<Student>;
    create(dto: CreateStudentDto): Promise<Student>;
    update(id: number, dto: UpdateStudentDto): Promise<Student>;
    remove(id: number): Promise<{
        message: string;
    }>;
    bulkImport(students: CreateStudentDto[]): Promise<Student[]>;
}
