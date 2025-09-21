"use client";
import { useState } from "react";

export default function DatePicker({ dates, setDates }) {
  const [newDate, setNewDate] = useState("");

  const addDate = () => {
    if (!newDate || dates.includes(newDate) || dates.length >= 10) return;
    setDates([...dates, newDate]);
  };

  const deleteElement = (index) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  return (
    <div className="eventForm_date p-4 rounded-lg border border-slate-700 shadow-inner">
      <h3 className="text-lg font-semibold mb-3">Propositions de dates (max 10)</h3>

      {/* Ajout d’une date */}
      <div className="flex gap-2 mb-4">
        <input
          type="datetime-local"
          value={newDate}
          step="900"
          onChange={(e) => setNewDate(e.target.value)}
          className="eventForm_input flex-1 p-2 rounded border border-slate-600"
        />
        <button type="button" onClick={addDate} className="add_date px-4 py-2 rounded-lg shadow">
          Ajouter
        </button>
      </div>

      {/* Liste des dates */}
      <ul className="space-y-2">
        {dates.map((element, index) => (
          <li key={index} className="eventForm_input flex justify-between items-center p-2 rounded border border-slate-700">
            <span>{new Date(element).toLocaleString()}</span>
            <button type="button" onClick={() => deleteElement(index)} className="delete_date">
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
