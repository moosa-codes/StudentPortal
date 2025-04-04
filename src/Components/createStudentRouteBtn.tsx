"use client";
import { useRouter } from "next/navigation";

type ClassNameType = {
    className?: string;
}

const CreateStudentRouteBtn = ({ className }: ClassNameType) => {
    const router = useRouter();

    const btnHandler = () => {
        router.push('/createStudent');
    }

    return (
        <button className={className} onClick={btnHandler}>Create Students</button>
    );
}

export default CreateStudentRouteBtn;
