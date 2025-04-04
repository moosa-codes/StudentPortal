'use client'

import CreateStudentRouteBtn from "@/Components/createStudentRouteBtn";
import styles from './home.module.css';
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseconfig";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

    const logoutHandler = async () => {
        signOut(auth)
            .then(() => {
                router.push("/");
                console.log("Logout successful");
            })
            .catch(() => {
                console.log("Logout failed");
            });
    };
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.heading}>Welcome Tutor!</h1>
            <CreateStudentRouteBtn className={styles.button} />
            <button className={styles.logout} onClick={logoutHandler}>Logout</button>
        </div>
    )
}
