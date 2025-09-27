'use client'

import { useEventContext } from "@/context/eventContext.js";

export default function EventPageDate({ handleVote }) {
	const { event, dateVote, setDateVote, voteSummary } = useEventContext();
	return (
		<>
			<section>
				<h2 className="text-xl font-semibold mb-4">Dates proposées</h2>
				{!event.finalDate && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{event.EventDates?.map((date) => {
						const start = new Date(date.date);
						const end = new Date(start.getTime() + event.event_duration * 60 * 60 * 1000);

						return (
							<div
								key={date.id}
								className={`EventPage_dates rounded-lg p-4 shadow-sm bg-gray-700 flex flex-col justify-center items-center ${(dateVote.includes(date.id)) ? "outline outline-2 outline-[#dfd2d2]" : "outline outline-2 outline-[#dfd2d2]/40"}`}
								onClick={() => handleVote(dateVote, setDateVote, date.id)}
							>
								<p className="text-lg">débute le {start.toLocaleDateString()} à {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} </p>
								<p className="text-lg font-medium">se termine le {end.toLocaleDateString()} à {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
								<span className="EventPage_dates_vote text-[#dfd2d2] text-xs px-2 py-1 rounded-full">
									{voteSummary?.dates[date.id] || 0} votes
								</span>
							</div>
						);
					})}
				</div>)}

				{event.finalDate && (
					<div
						className="EventPage_dates rounded-lg p-4 shadow-sm bg-gray-700 flex flex-col justify-center items-center outline outline-2 outline-[#dfd2d2]"
					>
						{(() => {
							const start = new Date(event.finalDate);
							const end = new Date(start.getTime() + event.event_duration * 60 * 60 * 1000);

							return (
								<>
									<p className="text-lg">
										débute le {start.toLocaleDateString()} à{" "}
										{start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
									</p>
									<p className="text-lg font-medium">
										se termine le {end.toLocaleDateString()} à{" "}
										{end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
									</p>
								</>
							);
						})()}
					</div>
				)}


			</section>
		</>
	);
}
