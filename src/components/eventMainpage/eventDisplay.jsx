'use client'

import EventCard from "./eventCard";

export default function EventDisplay() {
  async function handledisplay() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/events", {
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
      console.log("events:", response);
    } catch (err) {
      console.error("Erreur fetch events:", err);
    }
  }

  return (
    <div>
      <button onClick={handledisplay} className="p-2 bg-blue-600 text-white rounded">
        Afficher les events
      </button>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
      </div>
    </div>
  );
}
