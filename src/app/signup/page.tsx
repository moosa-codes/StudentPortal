"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './LoginAndSignup.module.css';
import { signupWithEmailPassword } from "@/firebase/firebaseauth";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const loginHandler = async () => {
        try {
            await signupWithEmailPassword(email, password);
            router.push('/home');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Sign In Failed');
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Sign Up</h1>

            {error && <p className={styles.error}>{error}</p>}

            <label className={styles.label}>Email:
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); }}
                />
            </label>
            <br />

            <label className={styles.label}>Password:
                <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                />
            </label>
            <br />
            <button className={styles.button} onClick={loginHandler}>Sign Up</button>
            <br />
            <span>Already Have An Account?</span>
            <Link href={'/login'} className={styles.link}>Login</Link>
        </div>
    );
}