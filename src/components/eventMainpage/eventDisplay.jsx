'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "./eventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

async function handledisplay(setEvents) {
  console.log("test");
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

export default function EventDisplay() {
  const [events, setEvents] = useState({});
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    handledisplay(setEvents);
    setToken(localStorage.getItem("token"));
  }, []);

  // Fonction utilitaire pour filtrer une liste
  function filterEvents(list = []) {
    if (!search) return list;
    return list.filter(ev =>
      ev.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Composant section avec slider
  function EventSection({ title, data, prefix }) {
    const filtered = filterEvents(data);
    if (!filtered?.length) return null;

    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 }, // mobile
            768: { slidesPerView: 2 }, // tablette
            1024: { slidesPerView: 3 }, // desktop
            1240: { slidesPerView: 4 }, // desktop
          }}
        >
          {filtered.map((el, i) => (
            <SwiperSlide key={`${prefix}-${i}`} >
              <EventCard data={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }


  console.log("events:", events);
  return (
    <div className="px-8">
      {/* 🔍 SearchBar + bouton créer */}
      <div className="mb-6 flex items-center justify-between">
        <input
          type="text"
          placeholder="Rechercher un événement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded px-3 py-2 mr-4"
        />

        {token && (
          <button
            onClick={() => router.push("/events/create")}
            className="bg-blue-600 text-[#dfd2d2] px-4 py-2 rounded hover:bg-blue-700"
          >
            + Créer un événement
          </button>
        )}
      </div>

      {/* Sections avec slider */}
      <EventSection title="Mes événements" data={events?.participant} prefix="p" />
      <EventSection title="Invitations" data={events?.invited} prefix="i" />
      <EventSection title="Événements publics" data={events?.public} prefix="pub" />
    </div>
  );
}
