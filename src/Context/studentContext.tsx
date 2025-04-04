'use client';
import { useContext, createContext, ReactNode, useState } from "react";


type StudentType = {
    name: string;
    rollNo: number | string;
    studentClass: string;
    fatherName: string;
}

type StudentContextPropType = {
    students: StudentType[];
    addStudents: (student: StudentType) => void;
    setStudents: (students: StudentType[]) => void;
}

const StudentContext = createContext<StudentContextPropType | null>(null);

const StudentContextProvider = ({ children }: { children: ReactNode }) => {

    const [students, setStudents] = useState<StudentType[]>([]);

    const addStudents = (student: StudentType) => {
        setStudents([...students, student])
    }

    return (
        <>
            <StudentContext.Provider value={{ addStudents, students, setStudents }}>
                {children}
            </StudentContext.Provider>
        </>
    )
}

export default StudentContextProvider;
export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('');
    }
    return context;
}; 