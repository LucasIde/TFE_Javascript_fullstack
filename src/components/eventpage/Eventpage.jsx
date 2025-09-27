'use client'

import EventPageDate from "./componentsEvent/eventDate.component";
import EventPageDescription from "./componentsEvent/eventDescription.component";
import EventPageGame from "./componentsEvent/eventGame.component";
import EventPageHeader from "./componentsEvent/eventHeader.component";
import { EventContext } from "@/context/eventContext";
import { submitVotes } from "./eventApi";
import useEvent from "./useEvent";
import EventPageButton from "./componentsEvent/eventButton.component";
import EventPageParticipant from "./componentsEvent/eventParticipant.component";
import EventPageModal from "./componentsEvent/eventModal.component";


export default function EventPage({ id }) {
	const eventState = useEvent(id);
	const isCreatorOrAdmin = (!eventState.user) ? false : (eventState.user.id === eventState.event.creator?.id || eventState.user.role === "admin");

	function handleVote(getData, setData, id) {
		if (getData.includes(id)) {
			setData(getData.filter(data => data !== id));
		}
		else if (getData.length < 3) {
			setData([...getData, id]);
		}
	}

	return (
		<div className="eventPage eventPage_box-reverse container mx-auto flex flex-col gap-5">
			<EventContext.Provider value={eventState}>
				<EventPageHeader />
				<EventPageDescription />
				{/* doit refaire l'export des buttons */}
				<EventPageButton id={id} isCreatorOrAdmin={isCreatorOrAdmin} />
				<EventPageGame handleVote={handleVote} />
				<EventPageDate handleVote={handleVote} />
				{(!eventState.event?.votesClosed) && <div className="text-center">
					<button
						className="bg-blue-900 px-50 py-2 my-4 rounded border"
						onClick={() => submitVotes(id, eventState.gameVote, eventState.dateVote, eventState.setRefreshVote)}>
						Vote
					</button>
				</div>}
				<EventPageParticipant id={id} />
				<EventPageModal id={id} />
				{/* dois ajouter Participant et modal */}
			</EventContext.Provider>
		</div>
	);
}
