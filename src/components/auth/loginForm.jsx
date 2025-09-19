'use client'
import { redirect } from "next/navigation";
import { useActionState, useId } from "react";
import { useAuth } from "./authContext";

async function loginAction(state, formData, login) {
    const data = Object.fromEntries(formData);

    const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const response = await res.json()
    if (!res.ok) {
        alert(response.error || "Un problème est survenu, veuillez réessayer plus tard.");
        return;
    }
    login(response.token);
    console.log(response);

    // Si crédential valide, on redirigre la page "accueil"
    redirect("/");
}

export default function LoginForm() {

    
    const inputId = useId();
    const { login, isAuthenticated } = useAuth();
    if (isAuthenticated) {
        redirect("/");
    }

    const initialState = {
        errorMessage: null
    };

    const [state, handleRegister, isPending] = useActionState((state, formData) => loginAction(state, formData, login), initialState);


    return (
        <div className="container flex justify-center mx-auto">
            <form action={handleRegister} className="registerForm flex flex-col gap-6">
                <div className="flex justify-between">
                    <label htmlFor={inputId + 'email'}>Email : </label>
                    <input id={inputId + 'email'} type='email' name='email'
                        defaultValue={state?.data?.email || ""}
                        className="registerForm_input"
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor={inputId + 'password'}>Password : </label>
                    <input id={inputId + 'password'} type='password' name='password'
                        defaultValue={state?.data?.password || ""}
                        className="registerForm_input"
                    />
                </div>
                <div className="flex justify-center">
                    <button type='submit' disabled={isPending} className="register_button p-1">Login</button>
                </div>
            </form>
        </div>
    );
}