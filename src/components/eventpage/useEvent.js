import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/EventPage-utils";
import { fetchSummary, getEvent, getMyVotes } from "./eventApi";

export default function useEvent(id) {

	const [event, setEvent] = useState({});
	const [gameVote, setGameVote] = useState([]);
	const [dateVote, setDateVote] = useState([]);
	const [voteSummary, setVoteSummary] = useState({ games: [], dates: [] })
	const [refreshVote, setRefreshVote] = useState(false);
	const [refreshEvent, setRefreshEvent] = useState(false);
	const [showEndModal, setShowEndModal] = useState(false);
	const [selectedWinner, setSelectedWinner] = useState(null);
	const [finalDateId, setFinalDateId] = useState(null);
	const [finalGameIds, setFinalGameIds] = useState([]);
	const [message, setMessage] = useState("");
	const [showFinalForm, setShowFinalForm] = useState(false);
	const [user, setUser] = useState(null);
	const [showInviteModal, setShowInviteModal] = useState(false);

	useEffect(() => {
		getMyVotes({ id, setGameVote, setDateVote });
		fetchSummary({ id, setVoteSummary });
	}, [id, refreshVote])

	useEffect(() => {
		getEvent({ setEvent, id });
		setUser(getUserFromToken());
	}, [id, refreshEvent]);

	return {
		event, setEvent,
		gameVote, setGameVote,
		dateVote, setDateVote,
		voteSummary, setVoteSummary,
		refreshVote, setRefreshVote,
		refreshEvent, setRefreshEvent,
		showEndModal, setShowEndModal,
		selectedWinner, setSelectedWinner,
		finalDateId, setFinalDateId,
		finalGameIds, setFinalGameIds,
		message, setMessage,
		showFinalForm, setShowFinalForm,
		user, setUser,
		showInviteModal, setShowInviteModal
	}
}
