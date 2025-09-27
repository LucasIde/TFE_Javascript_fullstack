'use client'

import { useEventContext } from "@/context/eventContext.js";

export default function EventPageGame({ handleVote }) {
	const { event, gameVote, setGameVote, voteSummary } = useEventContext();
	return (
		<>
			<section>
				<h2 className="text-xl font-semibold mb-4">Jeux</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
					{(event.finalGames?.length == 0) ? event.Games?.map((game) => (
						<div
							key={game.id}
							className={`EventPage_games bg-[#001d41] rounded-lg overflow-hidden flex flex-col ${(gameVote.includes(game.id)) ? "outline outline-3 outline-[#dfd2d2]" : "outline outline-3 outline-[#dfd2d2]/10"}`}
							onClick={() => handleVote(gameVote, setGameVote, game.id)}
						>
							{game.headerImage ? (
								<img
									src={game.headerImage}
									alt={game.name}
									className="w-full h-32 object-cover"
								/>
							) : (
								<img
									src="/images/default_horizontal.png"
									alt={game.name}
									className="w-full h-32 object-cover"
								/>
							)}
							<div className="p-2 flex-1 flex items-center justify-center">
								<h3 className="text-center text-sm font-medium">{game.name}</h3>
							</div>
							<span className="EventPage_games_vote text-[#dfd2d2] text-xs px-2 py-1 rounded-full">
								{voteSummary?.games[game.id] || 0} votes
							</span>
						</div>))
						: event.finalGames?.map((game) => (
							<div
								key={game.id}
								className={`EventPage_games--final bg-[#001d41] rounded-lg overflow-hidden flex flex-col "outline outline-3 outline-[#dfd2d2]/10"}`}
								onClick={() => handleVote(gameVote, setGameVote, game.id)}
							>
								{game.headerImage ? (
									<img
										src={game.headerImage}
										alt={game.name}
										className="w-full h-32 object-cover"
									/>
								) : (
									<img
										src="/images/default_horizontal.png"
										alt={game.name}
										className="w-full h-32 object-cover"
									/>
								)}
								<div className="p-2 flex-1 flex items-center justify-center">
									<h3 className="text-center text-sm font-medium">{game.name}</h3>
								</div>
								<span className="EventPage_games_vote text-[#dfd2d2] text-xs px-2 py-1 rounded-full">
									{voteSummary?.games[game.id] || 0} votes
								</span>
							</div>))
					}
				</div>
			</section>
		</>
	);
}
