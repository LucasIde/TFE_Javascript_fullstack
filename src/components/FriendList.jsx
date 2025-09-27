'use client'

import { useEffect, useState } from "react";

export default function FriendsList() {
  const [friends, setFriends] = useState({
    accepted: [],
    pendingSent: [],
    pendingReceived: [],
  });
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const currentUserId = Number(localStorage.getItem("userId")); // stocké après login

  // ----------- API HELPERS ------------
  async function apiCall(url, method = "GET") {
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Erreur");
      return null;
    }
    fetchFriends();
    return data;
  }

  async function fetchFriends() {
    try {
      const res = await fetch("http://localhost:8080/api/friends", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setFriends(await res.json());
    } catch (err) {
      console.error(err);
    }
  }

  function sendRequest(friendId) {
    if (friendId === currentUserId) {
      alert("Impossible de s’ajouter soi-même !");
      return;
    }
    setQuery("");
    return apiCall(`http://localhost:8080/api/friends/${friendId}`, "POST");
  }
  function acceptRequest(friendId) {
    return apiCall(`http://localhost:8080/api/friends/${friendId}/accept`, "PUT");
  }
  function declineRequest(friendId) {
    return apiCall(`http://localhost:8080/api/friends/${friendId}/decline`, "PUT");
  }
  function removeFriend(friendId) {
    return apiCall(`http://localhost:8080/api/friends/${friendId}`, "DELETE");
  }

  // ----------- SEARCH ------------
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/friends/search?query=${query}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) {
          setResults(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    fetchFriends();
  }, []);

  // ----------- RENDER ------------
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Recherche */}
      <section>
        <h2 className="text-xl font-bold mb-2">Ajouter un ami</h2>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="entrer le nom d'utilisateur"
            className="w-full border rounded p-2"
          />

          {query.length >= 2 && (
            <ul className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-gray-800 border rounded shadow z-10">
              {results.length === 0 ? (
                <li className="p-2 text-sm text-gray-400 italic">
                  Aucun utilisateur trouvé
                </li>
              ) : (
                results.map((u) => (
                  <li key={u.id} className="p-2 flex justify-between items-center">
                    <span>{u.username}#{u.discriminator}</span>
                    <button
                      onClick={() => sendRequest(u.id)}
                      className="px-2 py-1 bg-green-600 text-[#dfd2d2] rounded hover:bg-green-700"
                    >
                      Ajouter
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

      </section>

      {/* Demandes reçues */}
      <section>
        <h2 className="text-xl font-bold mb-2">Demandes reçues</h2>
        {friends.pendingReceived.length === 0 && (
          <p className="text-gray-500">Aucune demande reçue</p>
        )}
        <ul className="divide-y divide-gray-200 rounded border">
          {friends.pendingReceived.map((u) => (
            <li key={u.id} className="p-2 flex justify-between items-center">
              <span>{u.username}#{u.discriminator}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => acceptRequest(u.id)}
                  className="px-2 py-1 bg-green-600 text-[#dfd2d2] rounded hover:bg-green-700"
                >
                  Accepter
                </button>
                <button
                  onClick={() => declineRequest(u.id)}
                  className="px-2 py-1 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700"
                >
                  Refuser
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Demandes envoyées */}
      <section>
        <h2 className="text-xl font-bold mb-2">Demandes envoyées</h2>
        {friends.pendingSent.length === 0 && (
          <p className="text-gray-500">Aucune demande envoyée</p>
        )}
        <ul className="divide-y divide-gray-200 rounded border">
          {friends.pendingSent.map((u) => (
            <li key={u.id} className="p-2 flex justify-between items-center">
              <span>{u.username}#{u.discriminator}</span>
              <span className="text-gray-500">En attente</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Amis */}
      <section>
        <h2 className="text-xl font-bold mb-2">Mes amis</h2>
        {friends.accepted.length === 0 && (
          <p className="text-gray-500">Aucun ami pour l’instant</p>
        )}
        <ul className="divide-y divide-gray-200 rounded border">
          {friends.accepted.map((u) => (
            <li key={u.id} className="p-2 flex justify-between items-center">
              <span>{u.username}#{u.discriminator}</span>
              <button
                onClick={() => removeFriend(u.id)}
                className="px-2 py-1 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
