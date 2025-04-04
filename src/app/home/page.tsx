import CreateStudentRouteBtn from "@/Components/createStudentRouteBtn";
import styles from './home.module.css'; 

export default function Home() {
    return (
        <div className={styles.homeContainer}>
            <h1 className={styles.heading}>Welcome Tutor!</h1>
            <CreateStudentRouteBtn className={styles.button} /> 
        </div>
    )
}
