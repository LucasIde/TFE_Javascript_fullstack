'use client'

import { useState, useEffect } from "react";

export default function UserSearchInvite({ eventId, setRefreshEvent, invitedUsers }) {
  console.log(eventId, invitedUsers);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const invitedIds = new Set(invitedUsers.map(u => u.id));

  // Charger les amis une fois
  useEffect(() => {
    async function fetchFriends() {
      try {
        const res = await fetch("http://localhost:8080/api/friends", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setFriends(data.accepted); // ✅ uniquement les amis acceptés
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchFriends();
  }, []);

  // Recherche utilisateur
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/friends/search/user?query=${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setResults(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  async function inviteUser(userId) {
    try {
      const res = await fetch(`http://localhost:8080/api/events/${eventId}/invite/${userId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de l'invitation");
      setRefreshEvent(prev => !prev);
      alert("Invitation envoyée ✅");
    } catch (err) {
      alert(err.message);
    }
  }

  async function removeUser(userId) {
    try {
      const res = await fetch(`http://localhost:8080/api/events/${eventId}/invite/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setRefreshEvent(prev => !prev);
      alert("Invitation supprimée ✅");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full border rounded p-2"
        />

        {loading && <p className="text-sm text-gray-500">Recherche...</p>}

        {results.length > 0 && (
          <ul className="divide-y divide-gray-200 rounded border bg-[#dfd2d2] text-[#dfd2d2] mt-2">
            {results.map((u) => (
              <li key={u.id} className="p-2 flex justify-between items-center bg-[#001d41] text-[#dfd2d2]">
                <span>{u.username}#{u.discriminator}</span>
                {invitedIds.has(u.id) ? (
                  <button
                    onClick={() => removeUser(u.id)}
                    className="px-2 py-1 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700"
                  >
                    Retirer
                  </button>
                ) : (
                  <button
                    onClick={() => inviteUser(u.id)}
                    className="px-2 py-1 bg-green-600 text-[#dfd2d2] rounded hover:bg-green-700"
                  >
                    Inviter
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {!loading && query.length >= 2 && results.length === 0 && (
          <p className="text-sm text-gray-500 italic mt-2">Aucun utilisateur trouvé</p>
        )}
      </div>

      {/* Liste d'amis */}
      <div>
        <h3 className="font-medium mb-2">Amis</h3>
        {friends.length > 0 ? (
          <ul className="divide-y divide-gray-200 rounded border bg-[#dfd2d2] text-[#dfd2d2]">
            {friends.map((f) => (
              <li key={f.id} className="p-2 flex justify-between bg-[#001d41] items-center">
                <span>{f.username}#{f.discriminator}</span>
                {invitedIds.has(f.id) ? (
                  <button
                    onClick={() => removeUser(f.id)}
                    className="px-2 py-1 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700"
                  >
                    Retirer
                  </button>
                ) : (
                  <button
                    onClick={() => inviteUser(f.id)}
                    className="px-2 py-1 bg-blue-600 text-[#dfd2d2] rounded hover:bg-blue-700"
                  >
                    Inviter
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">Pas encore d'amis</p>
        )}
      </div>
    </div>
  );
}
