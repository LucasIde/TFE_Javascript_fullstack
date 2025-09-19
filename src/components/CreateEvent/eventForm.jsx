'use client'

import { useActionState, useId, useState } from "react";
import DatePicker from "./datePicker";

async function CreateEventAction(state, formData) {
    const data = Object.fromEntries(formData);
    return state;
}

// doit récuper le creator du user qui fait un fetch
//final date remplace la selection des dates quand le status passe a planned/finished
//participant s'ajoute après dans l'ath pas dans le form
// invité = participant pas invité
// chat dans l'ath final voir comment gérer ça plus tard
// winner apparait quand tu fais passer le status de l'event a finish
export default function EventForm() {

    const inputId = useId();
    const [dates, setDates] = useState([]);

    const initialState = {
        errorMessage: null
    };

    const { state, handleCreateEvent, isPending } = useActionState(CreateEventAction, initialState);

    return (
        <div>
            <form action={CreateEventAction} className="flex flex-col">
                <label htmlFor={inputId + "title"}>Title</label>
                <input type="text" name="title" id={inputId + "title"} />
                <label htmlFor={inputId + "description"}>Description</label>
                <textarea name="description" id={inputId + "description"}></textarea>
                <label htmlFor={inputId + "status"}>Status</label>
                <select name="status" id={inputId + "status"} defaultValue="pending_validation">
                    <option value="pending_validation">Pending_validation</option>
                    <option value="planned">Planned</option>
                    <option value="finished">Finished</option>
                </select>
                <label htmlFor={inputId + "visibility"}>Visibility</label>
                <select name="visibility" id={inputId + "visibility"} defaultValue="private">
                    <option value="private">private</option>
                    <option value="public">public</option>
                </select>
                <label htmlFor={inputId + "max_player"}>Max_Player</label>
                <input type="number" name="max_player" id={inputId + "max_player"} />
                <DatePicker dates={dates} setDates={setDates} />
				<button type='submit' disabled={isPending} className="register_button p-1">Create Event</button>
            </form>
        </div>
    );
}