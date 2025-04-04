"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStudentContext } from "@/Context/studentContext";
import styles from './createStudent.module.css';

type FormData = {
    name: string;
    rollNo: string;  // Keeping it string to allow user input, will convert later
    studentClass: string;
    fatherName: string;
};

export default function CreateStudent() {
    const [isSaved, setIsSaved] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { addStudents } = useStudentContext();

    const [form, setForm] = useState<FormData>({
        name: '',
        rollNo: '',
        studentClass: '',
        fatherName: '',
    });


    const onChangeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setError(null);
    };

    // form toggler
    const toggleForm = () => {
        setShowForm((prev) => !prev);
        setError(null);
    };

    // form submit and save to local storage
    const saveBtnHandler = () => {
        const { name, rollNo, studentClass, fatherName } = form;

        if (!name.trim() || !studentClass.trim() || !fatherName.trim()) {
            setError("All fields are required.");
            return;
        }

        if (!rollNo.trim() || isNaN(Number(rollNo))) {
            setError("Enter a valid roll number.");
            return;
        }

        const newStudent = { name, rollNo: Number(rollNo), studentClass, fatherName };

        // get students
        const savedStudents = localStorage.getItem("students");
        const students = savedStudents ? JSON.parse(savedStudents) : [];

        // store students in local storage
        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));
        addStudents(newStudent);

        // Reset form & show success message
        setIsSaved(true);
        setShowForm(false);
        setError(null);

        setTimeout(() => setIsSaved(false), 3000);

        setForm({ name: "", rollNo: "", studentClass: "", fatherName: "" });
    };

    return (
        <div className={styles.container}>
            <p className={styles.heading}>Create Your Student Here...</p>

            <button onClick={toggleForm} className={styles.addButton}>
                {showForm ? "Close Form" : "Add Student"}
            </button>

            {showForm && (
                <form className={styles.form}>
                    <h3>Fill The Requirements</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChangeStatus}
                            placeholder="Student Name"
                            className={styles.input}
                        />
                    </label>
                    <label>
                        Roll No:
                        <input
                            type="text"
                            name="rollNo"
                            value={form.rollNo}
                            onChange={onChangeStatus}
                            placeholder="Student Roll No"
                            className={styles.input}
                        />
                    </label>
                    <label>
                        Class:
                        <input
                            type="text"
                            name="studentClass"
                            value={form.studentClass}
                            onChange={onChangeStatus}
                            placeholder="Student Class"
                            className={styles.input}
                        />
                    </label>
                    <label>
                        Father&apos;s Name:
                        <input
                            type="text"
                            name="fatherName"
                            value={form.fatherName}
                            onChange={onChangeStatus}
                            placeholder="Father's Name"
                            className={styles.input}
                        />
                    </label>

                    <button type="button" onClick={saveBtnHandler} className={styles.saveButton}>
                        Save
                    </button>
                </form>
            )}

            {isSaved && <p className={styles.success}>Your Data has been saved.</p>}

            <Link href={'/studentData'} className={styles.listLink}>
                See All Students
            </Link>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}
