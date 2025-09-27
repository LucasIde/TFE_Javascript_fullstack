import { useEventContext } from "@/context/eventContext";
import { handleEndEvent, handleSaveFinalChoices, updateEventStatus } from "../eventApi";
import UserSearchInvite from "@/components/eventpage/componentsEvent/UserSearchInvite.component.jsx";


export function ModalFinalVote({ id }) {

	const { event, voteSummary, setRefreshEvent,
		showFinalForm, setShowFinalForm,
		finalDateId, setFinalDateId,
		finalGameIds, setFinalGameIds,
		message, setMessage } = useEventContext();

	return (
		<>
			{showFinalForm && (
				<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4 relative">
						<button
							onClick={() => setShowFinalForm(false)}
							className="absolute top-2 right-2 text-gray-400 hover:text-[#dfd2d2]"
						>
							✕
						</button>

						<h2 className="text-xl font-semibold">Définir les choix finaux</h2>

						{/* Sélection date */}
						<div>
							<label className="block font-medium mb-2">Date finale :</label>
							<select
								value={finalDateId || ""}
								onChange={(e) => setFinalDateId(e.target.value)}
								className="p-2 rounded bg-gray-700 text-[#dfd2d2] w-full"
							>
								<option value="">-- Sélectionner une date --</option>
								{[...event.EventDates]
									.sort((a, b) => (voteSummary?.dates[b.id] || 0) - (voteSummary?.dates[a.id] || 0))
									.map(d => (
										<option key={d.id} value={d.id}>
											{new Date(d.date).toLocaleString()} — {voteSummary?.dates[d.id] || 0} votes
										</option>
									))}
							</select>
						</div>

						{/* Sélection jeux */}
						<div>
							<label className="block font-medium mb-2">Jeux finaux (max 3):</label>
							<div className="grid gap-2">
								{[...event.Games]
									.sort((a, b) => (voteSummary?.games[b.id] || 0) - (voteSummary?.games[a.id] || 0))
									.map(g => (
										<label key={g.id} className="flex items-center gap-2">
											<input
												type="checkbox"
												value={g.id}
												checked={finalGameIds.includes(Number(g.id))}
												onChange={(e) => {
													const id = Number(e.target.value);
													setFinalGameIds(prev =>
														prev.includes(id)
															? prev.filter(x => x !== id)
															: prev.length < 3
																? [...prev, id]
																: prev
													);
												}}
											/>
											<span>{g.name}</span>
											<span className="text-gray-400 text-sm ml-auto">
												({voteSummary?.games[g.id] || 0} votes)
											</span>
										</label>
									))}
							</div>
						</div>

						{/* Bouton submit */}
						<button
							onClick={() => {
								handleSaveFinalChoices({ id, finalDateId, finalGameIds, setMessage, setShowFinalForm, setRefreshEvent });
								updateEventStatus(id, "planned", setRefreshEvent); // 👈 ajout ici
							}}
							className="px-4 py-2 bg-green-600 text-[#dfd2d2] rounded hover:bg-green-700"
						>
							Enregistrer
						</button>

						{message && <p className="text-sm text-green-400">{message}</p>}
					</div>
				</div>
			)}
		</>
	);
}


export function ModalInvite({ id }) {

	const { showInviteModal, setShowInviteModal, setRefreshEvent, event } = useEventContext();

	return (
		<>
			{showInviteModal && (
				<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
						<button
							onClick={() => setShowInviteModal(false)}
							className="absolute top-2 right-2 text-gray-400 hover:text-[#dfd2d2]"
						>
							✕
						</button>

						<h2 className="text-xl font-semibold">Inviter un utilisateur</h2>
						<UserSearchInvite eventId={id} setRefreshEvent={setRefreshEvent} invitedUsers={event.Users || []} />
					</div>
				</div>
			)}
		</>
	);
}

export function ModalEndEvent({id}) {

	const { event, setRefreshEvent, showEndModal, setShowEndModal, selectedWinner, setSelectedWinner} = useEventContext();

	return (
		<>
			{showEndModal && (
				<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
					<div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 relative">
						<button
							onClick={() => setShowEndModal(false)}
							className="absolute top-2 right-2 text-gray-400 hover:text-[#dfd2d2]"
						>
							✕
						</button>

						<h2 className="text-xl font-semibold">Clôturer l'événement</h2>

						<p>Sélectionnez le gagnant (optionnel) :</p>
						<select
							value={selectedWinner || ""}
							onChange={(e) => setSelectedWinner(e.target.value || null)}
							className="w-full p-2 rounded bg-gray-700 text-[#dfd2d2]"
						>
							<option value="">— Pas de gagnant —</option>
							{event.Users?.map(u => (
								<option key={u.id} value={u.id}>
									{u.username}#{u.discriminator}
								</option>
							))}
						</select>

						<button
							onClick={() => handleEndEvent(id, selectedWinner, setRefreshEvent, setShowEndModal)}
							className="px-4 py-2 bg-red-600 text-[#dfd2d2] rounded hover:bg-red-700 w-full"
						>
							Clôturer l'événement
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default function EventPageModal({id}) {
	return (
		<>
			<ModalFinalVote id={id}/>
			<ModalInvite id={id}/>
			<ModalEndEvent id={id}/>
		</>
	);
}
