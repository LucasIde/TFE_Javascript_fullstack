'use client'

import { validateRegister } from "@/utils/registerForm-utils";
import { redirect } from "next/navigation";
import { useActionState, useId } from "react";
import { useAuth } from "./authContext";


async function registerAction(state, formData) {
	const data = Object.fromEntries(formData);

	const validation = validateRegister(data);
	if (!validation.ok) {
		return {
			errorMessage: validation.errors, // tableau [{field, message}]
			data
		};
	}

	// TODO Call API for register
	// peut utiliser validation.data
	const res = await fetch('http://localhost:8080/api/auth/register', {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify({ username :data.username, email : data.email, password :data.password }),
	});
	if (!res.ok) {
		const error = await res.json();
		alert(error.error || "Un problème est survenu, veuillez réessayer plus tard.");
		return;
	}

	// TODO Save JWT in React App

	// Si crédential valide, on redirigre la page "accueil"
	redirect("/login");
}

// find if there is an error in the input field
function getFieldError(errors, field) {
	return errors?.find((e) => e.field === field)?.message;
}

export default function RegisterForm() {

	const inputId = useId();
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        redirect("/");
    }

	const initialState = {
		errorMessage: null
	};

	const [state, handleRegister, isPending] = useActionState(registerAction, initialState);


	return (
		<div className="container flex justify-center mx-auto">
			<form action={handleRegister} className="registerForm flex flex-col gap-6">
				<div className="flex justify-between">
					<label htmlFor={inputId + 'email'}>Email : </label>
					<input id={inputId + 'email'} type='email' name='email'
						defaultValue={state?.data?.email || ""}
						className={`registerForm_input  ${getFieldError(state?.errorMessage, "email") ? "warning" : ""}`}
					/>
				</div>
				{getFieldError(state?.errorMessage, "email") && (
					<p className="text-sm">
						{getFieldError(state?.errorMessage, "email")}
					</p>
				)}
				<div className="flex justify-between">
					<label htmlFor={inputId + 'username'}>Pseudo : </label>
					<input id={inputId + 'username'} type='text' name='username'
						defaultValue={state?.data?.username || ""}
						className={`registerForm_input  ${getFieldError(state?.errorMessage, "username") ? "warning" : ""}`}
					/>
				</div>
				{getFieldError(state?.errorMessage, "username") && (
					<p className="text-sm">
						{getFieldError(state?.errorMessage, "username")}
					</p>
				)}
				<div className="flex justify-between">
					<label htmlFor={inputId + 'password'}>Password : </label>
					<input id={inputId + 'password'} type='password' name='password'
						defaultValue={state?.data?.password || ""}
						className={`registerForm_input  ${getFieldError(state?.errorMessage, "password") ? "warning" : ""}`}
					/>
				</div>
				{getFieldError(state?.errorMessage, "password") && (
					<p className="text-sm">
						{getFieldError(state?.errorMessage, "password")}
					</p>
				)}
				<div className="flex justify-between">
					<label htmlFor={inputId + 'confirm'}>Confirm Password : </label>
					<input id={inputId + 'confirm'} type='password' name='confirm'
						defaultValue={state?.data?.confirm || ""}
						className={`registerForm_input  ${getFieldError(state?.errorMessage, "confirm") ? "warning" : ""}`}
					/>
				</div>
				{getFieldError(state?.errorMessage, "confirm") && (
					<p className="text-sm">
						{getFieldError(state?.errorMessage, "confirm")}
					</p>
				)}
				<div>
					<button type='submit' disabled={isPending} className="register_button p-1">Register</button>
				</div>
			</form>
		</div>
	);
}