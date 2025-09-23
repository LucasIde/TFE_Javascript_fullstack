'use client'

import { useEffect, useState } from "react";
import EventDescription from "./description.component";

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
        console.log(response);
        setEvent(response);
    }
    catch (err) {
        console.error("server Error");
    }
}


export default function EventPage({ id }) {

    const [event, setEvent] = useState({});

    useEffect(() => {
        getEvent({ setEvent, id });
    }, []);

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
            <EventDescription text={event.description}/>
            {/* Jeux */}
            <section>
                <h2 className="text-xl font-semibold mb-4">Jeux</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {event.Games?.map((game) => (
                        <div
                            key={game.id}
                            className="rounded-lg overflow-hidden flex flex-col"
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
                                className="rounded-lg p-4 shadow-sm bg-gray-700 flex flex-col justify-center items-center"
                            >
                                <p className="text-lg">débute le {start.toLocaleDateString()} à {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </p>
                                <p className="text-lg font-medium">se termine le {end.toLocaleDateString()} à {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
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
        </div>
    );
}