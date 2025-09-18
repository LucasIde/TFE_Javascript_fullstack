'use client'
import { redirect } from "next/navigation";
import { useActionState, useId } from "react";

async function loginAction(state, formData) {
    const data = Object.fromEntries(formData);

    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email : data.email, password :data.password }),
    });
    const response = await res.json()
    if (!res.ok) {
        alert(response.error || "Un problème est survenu, veuillez réessayer plus tard.");
        return;
    }
    localStorage.setItem("token", response.token);
    console.log(response);
    // TODO Save JWT in React App

    // Si crédential valide, on redirigre la page "accueil"
    // redirect("/register/homepage");
}

export default function LoginForm() {

    const inputId = useId();

    const initialState = {
        errorMessage: null
    };

    const [state, handleRegister, isPending] = useActionState(loginAction, initialState);


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
                <div>
                    <button type='submit' disabled={isPending} className="register_button p-1">Login</button>
                    {/* {console.log(state.errorMessage)} */}
                </div>
            </form>
        </div>
    );
}