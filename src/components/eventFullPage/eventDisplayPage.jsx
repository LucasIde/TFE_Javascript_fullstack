'use client'

import { useEffect, useState } from "react";
import EventDescription from "./description.component";
import { jwtDecode } from "jwt-decode";


function getUserFromToken() {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const decoded = jwtDecode(token);
        return decoded; // { id, username, role, ... }
    } catch (err) {
        console.error("Token invalide :", err);
        return null;
    }
}

async function getEvent({ setEvent, id }) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/events/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error(`Erreur serveur: ${res.status}`);
        }

        const response = await res.json();
        setEvent(response);
    }
    catch (err) {
        console.log("server Error");
    }
}

async function submitVotes(id, selectedGameIds, selectedDateIds) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/events/${id}/votes`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            gameIds: selectedGameIds,   // ex: [12, 37, 45]
            dateIds: selectedDateIds,   // ex: [5, 9]
        }),
    });

    if (!res.ok) {
        console.log("server Error");
        return;
    }

    return res.json();
}

async function getMyVotes({ id, setGameVote, setDateVote }) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/events/${id}/votes`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
        const data = await res.json();
        setGameVote(data.gameIds);
        setDateVote(data.dateIds);
    }
}

async function fetchSummary({ id, setVoteSummary }) {
    const res = await fetch(`http://localhost:8080/api/events/${id}/votes/summary`);
    if (res.ok) {
        const data = await res.json();
        const games = Object.fromEntries(data.games.map(g => [g.id, g.votes]));
        const dates = Object.fromEntries(data.dates.map(g => [g.id, g.votes]));
        setVoteSummary({ games, dates });
    }
}

async function putcloseVote(id) {
    {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/events/${id}/votes/close`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Erreur lors de la clôture des votes");
            const data = await res.json();
            alert(data.message || "Votes clôturés ✅");
        } catch (err) {
            alert(err.message);
        }
    }
}

async function handleSaveFinalChoices({ id, finalDateId, finalGameIds, setMessage, setShowFinalForm }) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/events/${id}/final`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ finalDateId, finalGameIds })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Erreur serveur");
        }

        const data = await res.json();
        setMessage(data.message || "Choix finaux enregistrés ✅");
        setShowFinalForm(false);
    } catch (err) {
        setMessage(err.message);
    }
}

function handleVote(getData, setData, id) {
    if (getData.includes(id)) {
        setData(getData.filter(data => data !== id));
    }
    else if (getData.length < 3) {
        setData([...getData, id]);
    }
}

export default function EventPage({ id }) {

    const [event, setEvent] = useState({});
    const [gameVote, setGameVote] = useState([]);
    const [dateVote, setDateVote] = useState([]);
    const [voteSummary, setVoteSummary] = useState({ games: [], dates: [] })

    const [finalDateId, setFinalDateId] = useState(null);
    const [finalGameIds, setFinalGameIds] = useState([]);
    const [message, setMessage] = useState("");
    const [showFinalForm, setShowFinalForm] = useState(false);





    useEffect(() => {
        getEvent({ setEvent, id });
        getMyVotes({ id, setGameVote, setDateVote });
        fetchSummary({ id, setVoteSummary });
    }, []);
    const user = getUserFromToken();

    let isCreatorOrAdmin

    if (!user) {
        isCreatorOrAdmin = 0;
    }
    else {
        isCreatorOrAdmin = user.id === event.creator?.id || user.role === "admin";
        console.log(isCreatorOrAdmin);
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            {/* Header */}
            <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <p className="text-sm text-gray-500">Status : {event.status}</p>
                </div>
                <div className="space-y-1 text-md">
                    <p><span className="font-medium">Visibilité :</span> {event.visibility}</p>
                    <p><span className="font-medium">Nombre de Participant :</span> {event?.Users?.length} / {event.max_player}</p>
                    <p>
                        <span className="font-medium">Organisé par :</span>{" "}
                        {event?.creator?.username}#{event?.creator?.discriminator}
                    </p>
                </div>
            </section>

            {/* Description */}
            <EventDescription text={event.description} />

            {isCreatorOrAdmin && (
                <div className="flex gap-4">
                    {/* Clôturer les votes */}
                    {!event.votesClosed && (
                        <button
                            onClick={async () => putcloseVote(id)}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Clôturer les votes
                        </button>
                    )}

                    {/* Définir les choix finaux */}
                    {event.votesClosed && (
                        <button
                            onClick={() => setShowFinalForm(!showFinalForm)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Définir les choix finaux
                        </button>
                    )}
                </div>
            )}


            {/* Jeux */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Jeux</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {event.Games?.map((game) => (
                        <div
                            key={game.id}
                            className={`EventPage_games rounded-lg overflow-hidden flex flex-col ${(gameVote.includes(game.id)) ? "border" : ""}`}
                            onClick={() => handleVote(gameVote, setGameVote, game.id)}
                        >
                            {game.headerImage ? (
                                <img
                                    src={game.headerImage}
                                    alt={game.name}
                                    className="w-full h-32 object-cover"
                                />
                            ) : (
                                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm">
                                    No image
                                </div>
                            )}
                            <div className="p-2 flex-1 flex items-center justify-center">
                                <h3 className="text-center text-sm font-medium">{game.name}</h3>
                            </div>
                            <span className="EventPage_games_vote text-white text-xs px-2 py-1 rounded-full">
                                {voteSummary?.games[game.id] || 0} votes
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Dates */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Dates proposées</h2>
                {!event.finalDate && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {event.EventDates?.map((date) => {
                        const start = new Date(date.date);
                        const end = new Date(start.getTime() + event.event_duration * 60 * 60 * 1000);

                        return (
                            <div
                                key={date.id}
                                className={`EventPage_dates rounded-lg p-4 shadow-sm bg-gray-700 flex flex-col justify-center items-center ${(dateVote.includes(date.id)) ? "border" : ""}`}
                                onClick={() => handleVote(dateVote, setDateVote, date.id)}
                            >
                                <p className="text-lg">débute le {start.toLocaleDateString()} à {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </p>
                                <p className="text-lg font-medium">se termine le {end.toLocaleDateString()} à {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                                <span className="EventPage_dates_vote text-white text-xs px-2 py-1 rounded-full">
                                    {voteSummary?.dates[date.id] || 0} votes
                                </span>
                            </div>
                        );
                    })}
                </div>)}

                {event.finalDate && (
                    <div className="mt-6 p-4 rounded-lg bg-blue-50 text-center">
                        <p className="font-semibold text-blue-700">
                            Date finale : {new Date(event.finalDate).toLocaleString()}
                        </p>
                    </div>
                )}
            </section>

            <button className="bg-blue-900 px-3 py-1 rounded border" onClick={() => submitVotes(id, gameVote, dateVote)}>Vote</button>

            {/* Participants */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Participants</h2>
                <ul className="divide-y divide-gray-200 rounded-lg">
                    {event.Users?.map((user) => (
                        <li key={user.id} className="p-2 text-sm flex justify-between">
                            <span>
                                {user.username}#{user.discriminator}
                            </span>
                            <span className="text-gray-500">
                                {user.UserEvent.role} ({user.UserEvent.status})
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            {showFinalForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4 relative">
                        <button
                            onClick={() => setShowFinalForm(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-semibold">Définir les choix finaux</h2>

                        {/* Sélection date */}
                        <div>
                            <label className="block font-medium mb-2">Date finale :</label>
                            <select
                                value={finalDateId || ""}
                                onChange={(e) => setFinalDateId(e.target.value)}
                                className="p-2 rounded bg-gray-700 text-white w-full"
                            >
                                <option value="">-- Sélectionner une date --</option>
                                {[...event.EventDates]
                                    .sort((a, b) => (voteSummary?.dates[b.id] || 0) - (voteSummary?.dates[a.id] || 0))
                                    .map(d => (
                                        <option key={d.id} value={d.id}>
                                            {new Date(d.date).toLocaleString()} — {voteSummary?.dates[d.id] || 0} votes
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Sélection jeux */}
                        <div>
                            <label className="block font-medium mb-2">Jeux finaux (max 3):</label>
                            <div className="grid gap-2">
                                {[...event.Games]
                                    .sort((a, b) => (voteSummary?.games[b.id] || 0) - (voteSummary?.games[a.id] || 0))
                                    .map(g => (
                                        <label key={g.id} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                value={g.id}
                                                checked={finalGameIds.includes(Number(g.id))}
                                                onChange={(e) => {
                                                    const id = Number(e.target.value);
                                                    setFinalGameIds(prev =>
                                                        prev.includes(id)
                                                            ? prev.filter(x => x !== id)
                                                            : prev.length < 3
                                                                ? [...prev, id]
                                                                : prev
                                                    );
                                                }}
                                            />
                                            <span>{g.name}</span>
                                            <span className="text-gray-400 text-sm ml-auto">
                                                ({voteSummary?.games[g.id] || 0} votes)
                                            </span>
                                        </label>
                                    ))}
                            </div>
                        </div>

                        {/* Bouton submit */}
                        <button
                            onClick={() =>  handleSaveFinalChoices({ id, finalDateId, finalGameIds, setMessage, setShowFinalForm })}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Enregistrer
                        </button>

                        {message && <p className="text-sm text-green-400">{message}</p>}
                    </div>
                </div>
            )}


        </div >
    );
}
