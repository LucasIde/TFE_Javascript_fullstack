'use client'

import { useActionState, useId, useState } from "react";
import DatePicker from "./datePicker";
import GameSearch from "./gameSearch";
import { redirect } from "next/navigation";


async function CreateEventAction(state, formData, dates, games) {
    const data = Object.fromEntries(formData);
    const token = localStorage.getItem("token");
    if (!data.title || !data.description || !data.visibility || !data.max_player || !data.event_duration || data.event_duration < 1 || dates.length == 0 || games.length == 0) {
        alert("incomplete information");
        return { message: "incomplet information", data };
    }
    const res = await fetch('http://localhost:8080/api/events/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: data.title,
            description: data.description,
            visibility: data.visibility,
            max_player: data.max_player,
            event_duration : data.event_duration,
            dates,
            games,
        })
    });
    if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Un problème est survenu, veuillez réessayer plus tard.");
        return;
    }
    redirect("/events");
}

// doit récuper le creator du user qui fait un fetch
//final date remplace la selection des dates quand le status passe a planned/finished
//participant s'ajoute après dans l'ath pas dans le form
// invité = participant pas invité
// chat dans l'ath final voir comment gérer ça plus tard
// winner apparait quand tu fais passer le status de l'event a finish
// status en attente avant validation des dates/juex / planned quand tout est valider / finished quand l'event est terminer
export default function EventForm() {

    const inputId = useId();
    const [dates, setDates] = useState([]);
    const [games, setGames] = useState([]);

    const initialState = {
        errorMessage: null
    };

    const [state, handleCreateEvent, isPending] = useActionState((state, formData) => CreateEventAction(state, formData, dates, games), initialState);

    return (
        <div className="container mx-auto">
            <form
                action={handleCreateEvent}
                className="eventForm bgc--blue p-6 rounded-xl space-y-6 max-w-2xl mx-auto"
                // empêche d'envoyer le form via la touche enter
                onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                        e.preventDefault();
                        e.target.blur(); // "valide" le champ en perdant le focus
                    }
                }}
            >
                <h2 className="text-2xl font-bold text-center mb-4">Créer un nouvel événement</h2>
                {/* Title */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor={inputId + "title"} className="font-medium text-[#cfd8e3]">Titre</label>
                    <input type="text" name="title" defaultValue={state?.data?.title || ""} id={inputId + "title"} className="eventForm_input p-2 rounded border border-slate-600" />
                </div>
                {/* Description */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor={inputId + "description"} className="font-medium text-[#cfd8e3]">Description</label>
                    <textarea name="description" id={inputId + "description"} defaultValue={state?.data?.description || ""} rows={3} className="eventForm_input p-2 rounded border border-slate-600" />
                </div>
                {/* Visibility + Max Players */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col justify-between space-y-2">
                        <label htmlFor={inputId + "visibility"} className="font-medium text-[#cfd8e3]">Visibilité</label>
                        <select name="visibility" id={inputId + "visibility"} defaultValue="private" className="eventForm_input p-2 rounded border border-slate-600">
                            <option value="private">Privé</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                    <div className="flex flex-col justify-between space-y-2">
                        <label htmlFor={inputId + "max_player"} className="font-medium text-[#cfd8e3]">Nombre max. de joueurs</label>
                        <input type="number" name="max_player" id={inputId + "max_player"} defaultValue={state?.data?.max_player || ""} className="eventForm_input p-2 rounded border border-slate-600" />
                    </div>
                    <div className="flex flex-col justify-between space-y-2">
                        <label htmlFor={inputId + "event_duration"} className="font-medium text-[#cfd8e3]">durée de l'event (en heure)</label>
                        <input type="number" name="event_duration" id={inputId + "event_duration"} defaultValue={state?.data?.event_duration || ""} className="eventForm_input p-2 rounded border border-slate-600" />
                    </div>
                </div>
                {/* Date Picker */}
                <GameSearch games={games} setGames={setGames} />
                <DatePicker dates={dates} setDates={setDates} />
                {/* Submit */}
                <button type="submit" disabled={isPending} className="submit_button w-full py-2 mt-4 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPending ? "Création en cours…" : "Créer l’événement"}
                </button>
            </form>


        </div>
    );
}
