"use client";
import { useState } from "react";

export default function DatePicker({dates,setDates}) {
  const [start, setStart] = useState("");

  const addDate = () => {
    if (!start) return;
    setDates([...dates, {start}]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="datetime-local"
          value={start}
          step="900"
          onChange={(e) => setStart(e.target.value)}
        />
        <button type="button" onClick={addDate} className="px-4 py-2 bg-blue-600 text-white rounded">
          Ajouter
        </button>
      </div>

      <ul className="list-disc pl-6">
        {dates.map((element, index) => (
          <li key={index}>
            {new Date(element.start).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}