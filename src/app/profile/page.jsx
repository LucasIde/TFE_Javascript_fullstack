'use client';

import { useRouter } from "next/navigation";

export default function WorkInProgress() {
  const router = useRouter();

  return (
    <div className="work_page flex flex-col items-center justify-center min-h-screen text-[#dfd2d2] p-6">
      {/* Icône / illustration */}
<div className="mb-6 animate-spin-slow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-20 h-20 text-yellow-400"
  >
    <path d="M19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.66l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a7.03 7.03 0 00-1.7-.98l-.38-2.65A.488.488 0 0014 2h-4a.488.488 0 00-.49.42l-.38 2.65c-.63.24-1.21.56-1.74.95l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.12.66l2.11 1.65c-.05.32-.08.65-.08.99s.03.67.08.99l-2.11 1.65a.5.5 0 00-.12.66l2 3.46c.14.24.43.33.68.22l2.49-1c.53.39 1.11.71 1.74.95l.38 2.65c.04.25.24.42.49.42h4c.25 0 .45-.17.49-.42l.38-2.65c.63-.24 1.21-.56 1.74-.95l2.49 1c.25.11.54.02.68-.22l2-3.46a.5.5 0 00-.12-.66l-2.11-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
  </svg>
</div>


      {/* Titre */}
      <h1 className="text-2xl md:text-4xl font-bold mb-2">🚧 Work in Progress 🚧</h1>
      <p className="text-lg text-gray-300 mb-8 text-center max-w-lg">
        Cette page est en cours de construction.
        Reviens bientôt pour découvrir de nouvelles fonctionnalités ✨
      </p>

      {/* Bouton retour */}
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition"
      >
        Retour à l’accueil
      </button>
    </div>
  );
}
