'use client';

import { useParams } from 'next/navigation';
import { useStudentContext } from "@/Context/studentContext";
import { useEffect, useState } from 'react';
import styles from './studentDetails.module.css'

const StudentDetails = () => {
    const { students } = useStudentContext();
    const { rollNo } = useParams<{ rollNo: string }>();

    const [student, setStudent] = useState<{
        name: string;
        rollNo: number;
        studentClass: string;
        fatherName: string;
    } | null>(null);

    useEffect(() => {
        if (students.length && rollNo) {
            const rollNoNumber = parseInt(rollNo, 10);
            const foundStudent = students.find(stud => stud.rollNo === rollNoNumber);
            if (foundStudent) {
                setStudent({
                    name: foundStudent.name,
                    rollNo: parseInt(foundStudent.rollNo.toString(), 10),
                    studentClass: foundStudent.studentClass,
                    fatherName: foundStudent.fatherName,
                });
            } else {
                setStudent(null);
            }
        }
    }, [students, rollNo]);

    // if (!student) return <div>Student not found</div>;

    return (
        <div className={styles.container}>
            {student && (
                <div>
                    <h1 className={styles.heading}>Student Details</h1>
                    <p className={styles.data}><strong className={styles.str}>Name:</strong> {student.name}</p>
                    <p className={styles.data}><strong className={styles.str}>Roll No:</strong> {student.rollNo}</p>
                    <p className={styles.data}><strong className={styles.str}>Class:</strong> {student.studentClass}</p>
                    <p className={styles.data}><strong className={styles.str}>Father&apos;s Name:</strong> {student.fatherName}</p>
                </div>
            )}
        </div>
    );
};

export default StudentDetails;
