import { app } from '@/firebase/firebaseconfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const auth = getAuth(app);

export async function signupWithEmailPassword(email: string, password: string) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user, 'User created successfully.');

        await sendEmailVerification(user);
        console.log('Verification email sent successfully to:', user.email);
        return user;
    } catch (error: any) {
        console.error('Error during sign up:', error.message);
        throw new Error(error.message);  
    }
}

export async function loginWithEmailPassword(email: string, password: string) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user, 'User logged in');
        return user;
    } catch (error: any) {
        console.error('Error when logging in:', error.message);
        throw new Error(error.message); 
    }
}
