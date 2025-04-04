"use client";

import { useStudentContext } from "@/Context/studentContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from './studentData.module.css'
import { useRouter } from "next/navigation";

type FormData = {
    name: string;
    rollNo: string;
    fatherName: string;
    studentClass: string;
};

export default function StudentData() {
    const { students, setStudents } = useStudentContext();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        rollNo: '',
        studentClass: '',
        fatherName: ''
    });

    useEffect(() => {
        const storedStudents = localStorage.getItem("students");
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        }
    }, [setStudents]);

    const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const deleteBtnHandler = (index: number) => {
        const updatedStudents = [...students];
        updatedStudents.splice(index, 1);
        setStudents(updatedStudents);
        localStorage.setItem("students", JSON.stringify(updatedStudents));
    };

    const editBtnHandler = (index: number) => {
        setEditIndex(index);
        const student = students[index];
        setFormData({
            name: student.name,
            rollNo: student.rollNo.toString(),
            fatherName: student.fatherName,
            studentClass: student.studentClass
        });
    };

    const updateBtnHandler = () => {
        if (editIndex !== null) {
            const updatedStudents = [...students];
            updatedStudents[editIndex] = {
                name: formData.name,
                rollNo: parseInt(formData.rollNo), // number
                fatherName: formData.fatherName,
                studentClass: formData.studentClass
            };
            setStudents(updatedStudents);
            localStorage.setItem("students", JSON.stringify(updatedStudents));
            setEditIndex(null);
            setFormData({
                name: '',
                rollNo: '',
                studentClass: '',
                fatherName: ''
            });
        }
    };

    const router = useRouter();
    const route = () => {
        router.push("/createStudent");
    }

    return (
        <div>
            <div className="student-data">
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Sr.No</th>
                            <th className={styles.th}>Student Fullname</th>
                            <th className={styles.th}>Roll No</th>
                            <th className={styles.th}>Edit/Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students &&
                            students.map((student, index) => (
                                <tr key={index + Number(student.rollNo)}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>
                                        {editIndex === index ? (

                                            <>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={onChangeStatus}
                                                    placeholder="Edit Student Name"
                                                    className={styles.input}
                                                />
                                                <input
                                                    type="text"
                                                    name="fatherName"
                                                    value={formData.fatherName}
                                                    onChange={onChangeStatus}
                                                    placeholder="Edit Father Name"
                                                    className={styles.input}
                                                />
                                            </>
                                        ) : (
                                            <span>{student.name} {student.fatherName}</span>
                                        )}
                                    </td>
                                    <td className={styles.td}>
                                        {editIndex === index ? (
                                            <input
                                                type="text"
                                                name="rollNo"
                                                value={formData.rollNo}
                                                onChange={onChangeStatus}
                                                placeholder="Edit Roll No"
                                                className={styles.input}
                                            />
                                        ) : (
                                            <Link href={`/studentData/${student.rollNo}`} className={styles.link}>
                                                {student.rollNo}
                                            </Link>
                                        )}
                                    </td>
                                    <td className={styles.actionSection}>
                                        {editIndex === index ? (
                                            <button
                                                onClick={updateBtnHandler}
                                                className={`${styles.button} ${styles.save}`}
                                            >
                                                Save Changes
                                            </button>
                                        ) : (
                                            <div className={styles.buttonContainer}>
                                                <button
                                                    onClick={() => editBtnHandler(index)}
                                                    className={`${styles.button} ${styles.edit}`}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteBtnHandler(index)}
                                                    className={`${styles.button} ${styles.delete}`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.addNavigator} onClick={route}>
                +
            </div>

            {!students.length && <p className={styles.noData}>No Data Available</p>}
        </div>
    );
}
