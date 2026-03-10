import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  studentId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  fatherName: string;

  @Column({ nullable: true })
  className: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 0 })
  age: number;

  @Column({ default: 0 })
  math: number;

  @Column({ default: 0 })
  science: number;

  @Column({ default: 0 })
  english: number;

  @Column({ default: 0 })
  computer: number;

  @Column({ default: 0 })
  attendance: number;

  @Column({ default: 'Active' })
  status: string;

  @Column({ nullable: true })
  profilePhoto: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
