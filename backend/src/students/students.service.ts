import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findByStudentId(studentId: string): Promise<Student> {
    const student = await this.studentRepo.findOneBy({ studentId });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepo.create({
      ...dto,
      status: dto.status || 'Active',
    });
    return this.studentRepo.save(student);
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findById(id);
    Object.assign(student, dto);
    return this.studentRepo.save(student);
  }

  async remove(id: number): Promise<{ message: string }> {
    const student = await this.findById(id);
    await this.studentRepo.remove(student);
    return { message: `Student ${student.name} deleted` };
  }

  async bulkImport(students: CreateStudentDto[]): Promise<Student[]> {
    const entities = students.map((dto) =>
      this.studentRepo.create({ ...dto, status: dto.status || 'Active' }),
    );
    return this.studentRepo.save(entities);
  }
}
