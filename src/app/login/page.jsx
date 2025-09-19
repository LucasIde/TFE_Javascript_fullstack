import LoginForm from "@/components/auth/loginForm.jsx";

export default function LoginPage() {
  return (
    <main className="register flex flex-col justify-center items-center gap-8">
        <h1 className="bgc--blue px-20 py-4 text-lg">Login Page</h1>
        <LoginForm />
    </main>
  );
}