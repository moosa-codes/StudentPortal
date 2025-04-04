"use client";

import { loginWithEmailPassword } from "@/firebase/firebaseauth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from './LoginAndSignup.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const loginHandler = async () => {
        try {
            await loginWithEmailPassword(email, password);
            router.push('/home');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError('Login Failed');
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Log in</h1>

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
            <button className={styles.button} onClick={loginHandler}>Login</button>
            <br />
            <span>Don't have an account?</span>
            <Link href={'/signup'} className={styles.link}>Sign up</Link>

        </div>
    );
}
