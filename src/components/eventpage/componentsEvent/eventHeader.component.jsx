"use client"

import { useEventContext } from "@/context/eventContext";

export default function EventPageHeader() {
	const {event} = useEventContext();

	return (
		<>
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
		</>
	);
}
