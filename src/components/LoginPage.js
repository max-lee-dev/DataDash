import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import { Box, Center, Input, Button, HStack } from "@chakra-ui/react"

function LoginPage() {
    const [hello, setHello] = useState('what');
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    useEffect(() => {

        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
        });
    }, [])

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        if (user) await signOut(auth);
    };

    return (
        <Box>
            <HStack>
            <Box>
                <h3> Register User </h3>
                <Input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />

                <Input
                    placeholder="Password..."
                    type={'password'}
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}

                />
                <Button onClick={register}>Register</Button>
            </Box>

            <Box>
                <h3> Login User </h3>
                <Input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}

                />

                <Input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}

                />
                <Button onClick={login}>Login</Button>
            </Box>
            </HStack>
            Signed in as: {user?.email}
            <Button onClick={logout}>Logout</Button>
        </Box>
    );
}

export default LoginPage;