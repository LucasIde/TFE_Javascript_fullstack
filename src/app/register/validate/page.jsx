import Link from "next/link";

export default function ValidateRegistration() {
    return (
        <main className="register container mx-auto flex flex-col justify-center">
            <h1 className="bgc--blue text-2xl my-2">You are now Registered</h1>
            <div className="bgc--blue p-1 flex justify-center">
                <Link href={"/"} className="register_button m-2">Go back to home page</Link>
            </div>
        </main>
    );
}