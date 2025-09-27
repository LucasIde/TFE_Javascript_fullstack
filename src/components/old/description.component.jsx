'use client'

import { useState } from "react";

export default function EventDescription({ text }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 600; // nombre de caractères max avant coupure

  if (!text) return null;

  const isLong = text.length > limit;
  const displayText = expanded || !isLong ? text : text.slice(0, limit) + "...";

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p className="">{displayText}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-600 hover:underline text-sm font-medium"
        >
          {expanded ? "Réduire" : "Voir plus"}
        </button>
      )}
    </div>
  );
}
