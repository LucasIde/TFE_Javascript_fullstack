import { useEventContext } from "@/context/eventContext.js";
import { handleJoinEvent, putAcceptInvite, putcloseVote } from "../eventApi.js";

export function EventPageButton_End({ isCreatorOrAdmin }) {
	const { event, setShowEndModal } = useEventContext();
	return (
		<>
			{isCreatorOrAdmin && event.status === "planned" && (
				<button
					onClick={() => setShowEndModal(true)}
					className="px-4 py-2 bg-[#E63946] text-[#dfd2d2] rounded hover:bg-[#D62839]"
				>
					Terminer l'événement
				</button>
			)}
		</>
	);
}

export function EventPageButton_EndVote({ id, isCreatorOrAdmin }) {
	const { event, setRefreshEvent, setShowFinalForm, setShowInviteModal } = useEventContext();
	return (
		<>
			{isCreatorOrAdmin && (
				<>
					{/* Clôturer les votes */}
					{!event.votesClosed && (
						<button
							onClick={() => {
								putcloseVote(id, setRefreshEvent);
							}}
							className="px-4 py-2 bg-[#F77F00] text-[#dfd2d2] rounded hover:bg-[#E76F00]"
						>
							Clôturer les votes
						</button>
					)}

					{/* Définir les choix finaux */}
					{event.votesClosed && (
						<button
							onClick={() => setShowFinalForm(prev => !prev)}
							className="px-4 py-2 bg-[#4361EE] text-[#dfd2d2] rounded hover:bg-[#364FC7]"
						>
							{(event.finalGames?.length == 0) ? "Définir les choix finaux" : "Changer les choix finaux"}
						</button>
					)}
					<button
						onClick={() => setShowInviteModal(true)}
						className="px-4 py-2 bg-[#219E91] text-[#dfd2d2] rounded hover:bg-[#1f9287ff]"
					>
						Inviter des utilisateurs
					</button>
				</>
			)}
		</>
	);
}

export function EventPageButton_JoinPublic({ id }) {
	const { event, setRefreshEvent, user } = useEventContext();
	return (
		<>
			{event.visibility === "public" &&
				!event.Users?.some(u => u.id === user?.id && u.UserEvent.status === "accepted") && (
					<button
						onClick={() => handleJoinEvent(id, setRefreshEvent)}
						className="px-4 py-2 bg-[#06D6A0] text-[#dfd2d2] rounded hover:bg-[#05B38A]"
					>
						Rejoindre l'événement
					</button>
				)}
		</>
	);
}

export function EventPageButton_AcceptInvite({ id }) {
	const { event, setRefreshEvent, user } = useEventContext();
	return (
		<>
			{event.Users?.some(u => u.id === user?.id && u.UserEvent.status === "invited") && (
				<button
					onClick={() => putAcceptInvite(id, setRefreshEvent)}
					className="px-4 py-2  bg-[#118AB2] text-[#dfd2d2] rounded hover:bg-[#0F6F8F]"
				>
					Accepter l'invitation
				</button>
			)}
		</>
	);
}



export default function EventPageButton({ id, isCreatorOrAdmin }) {
	const { event } = useEventContext();

	return (
		<>
			{(event.status != "finished") && < div className="flex gap-4" >
				<EventPageButton_End isCreatorOrAdmin={isCreatorOrAdmin} />
				<EventPageButton_EndVote isCreatorOrAdmin={isCreatorOrAdmin} id={id} />
				{(event.status == "pending") && <EventPageButton_JoinPublic id={id} />}
				<EventPageButton_AcceptInvite id={id} />
			</div >}
		</>
	);
}
