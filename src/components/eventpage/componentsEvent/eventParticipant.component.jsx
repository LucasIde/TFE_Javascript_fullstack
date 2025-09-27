"use client"

import { useEventContext } from "@/context/eventContext";
import { deleteParticipant } from "../eventApi";

export default function EventPageParticipant({ id }) {
	const { event, setRefreshEvent, user } = useEventContext();

	return (
		<>
			<section className="eventPage_box">
				<h2 className="text-xl font-semibold mb-2">Participants</h2>
				<ul className="divide-y divide-gray-200 rounded-lg">
					{event.Users?.map((u) => (
						<li key={u.id} className="p-2 text-sm flex justify-between items-center">
							<span>
								{u.username}#{u.discriminator}
							</span>
							<span className="text-gray-500">
								{u.UserEvent.role} ({u.UserEvent.status})
							</span>

							{/* 👇 Bouton quitter (uniquement si user connecté et pas créateur) */}
							{user?.id === u.id && u.id !== event.creator?.id && (
								<button
									onClick={async () => deleteParticipant(id, u.id, setRefreshEvent)}
									className="ml-4 px-2 py-1 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700"
								>
									Quitter
								</button>
							)}
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
