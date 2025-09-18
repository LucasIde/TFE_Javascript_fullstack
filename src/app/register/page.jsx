import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
  return (
    <main className="register flex flex-col justify-center items-center gap-8">
        <h1 className="bgc--blue px-20 py-4 text-lg">Register Page</h1>
        <RegisterForm />
    </main>
  );
}