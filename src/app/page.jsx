import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white pt-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Organise tes sessions gaming facilement 🎮
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Choisis un jeu, trouve une date avec tes amis, et lance la partie.
          Tout est centralisé dans un seul espace simple et efficace.
        </p>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 transition font-semibold"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1e293b] grid grid-cols-1 gap-6  md:gap-0 md:grid-cols-2 text-center">
        <div>
          <h2 className="text-4xl font-bold">125+</h2>
          <p className="text-gray-300">Événements organisés</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold">300+</h2>
          <p className="text-gray-300">Joueurs inscrits</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Planifie une date</h3>
          <p className="text-gray-300">
            Propose plusieurs créneaux et votez ensemble pour trouver la meilleure dispo.
          </p>
        </div>
        <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Événements publics ou privés</h3>
          <p className="text-gray-300">
            Organise un event ouvert à tous ou limite l’accès avec des invitations.
          </p>
        </div>
        <div className="bg-[#0f172a] rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-2">Invitations & statuts</h3>
          <p className="text-gray-300">
            Suis en un coup d’œil qui participe, qui hésite et qui refuse.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-[#1e293b] text-center">
        <h2 className="text-3xl font-bold mb-12">Comment ça marche ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">1. Crée ton événement</h3>
            <p className="text-gray-300">Ajoute un titre, une description et propose des dates.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">2. Invite tes amis</h3>
            <p className="text-gray-300">Envoie des invitations et propose des jeux au vote.</p>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">3. Lance la partie</h3>
            <p className="text-gray-300">Tout le monde est prêt ? La session peut commencer !</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Prêt à organiser ta prochaine session ?
        </h2>
        <Link
          href="/register"
          className="px-8 py-4 rounded-2xl bg-green-600 hover:bg-green-700 transition font-semibold text-lg"
        >
          Rejoindre maintenant
        </Link>
      </section>
    </div>
  );
}
