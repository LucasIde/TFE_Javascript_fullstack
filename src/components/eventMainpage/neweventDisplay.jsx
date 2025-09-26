'use client'

import { useEffect, useState } from "react";
import NewEventCard from "./neweventCard";

async function handledisplay(setEvents) {

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
    setEvents(response);
  }
  catch (err) {
    console.error("server Error");
  }
}

export default function NewEventDisplay() {

  const [events, setEvents] = useState({});

  useEffect(() => {
    handledisplay(setEvents);
  }, []);

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {events?.public?.map((element, index) =>
          <NewEventCard key={index} data={element}/>)}

        {events?.private?.map((element, index) =>
          <NewEventCard key={index} data={element}/>)}
      </div>
    </div>
  );
}
