export async function getEvent({ setEvent, id }) {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch(`http://localhost:8080/api/events/${id}`, {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});

		if (!res.ok) {
			throw new Error(`Erreur serveur: ${res.status}`);
		}

		const response = await res.json();
		console.log(response);
		setEvent(response);
	}
	catch (err) {
		console.log("server Error");
	}
}

export async function submitVotes(id, selectedGameIds, selectedDateIds, setRefreshVote) {
	const token = localStorage.getItem("token");
	const res = await fetch(`http://localhost:8080/api/events/${id}/votes`, {
		method: "PUT",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			gameIds: selectedGameIds,   // ex: [12, 37, 45]
			dateIds: selectedDateIds,   // ex: [5, 9]
		}),
	});

	if (!res.ok) {
		console.log("server Error");
		return;
	}
	setRefreshVote((prev) => !prev);
	return res.json();
}

export async function getMyVotes({ id, setGameVote, setDateVote }) {
	const token = localStorage.getItem("token");
	const res = await fetch(`http://localhost:8080/api/events/${id}/votes`, {
		headers: { "Authorization": `Bearer ${token}` }
	});
	if (res.ok) {
		const data = await res.json();
		setGameVote(data.gameIds);
		setDateVote(data.dateIds);
	}
}

export async function fetchSummary({ id, setVoteSummary }) {
	const res = await fetch(`http://localhost:8080/api/events/${id}/votes/summary`);
	if (res.ok) {
		const data = await res.json();
		const games = Object.fromEntries(data.games.map(g => [g.id, g.votes]));
		const dates = Object.fromEntries(data.dates.map(g => [g.id, g.votes]));
		setVoteSummary({ games, dates });
	}
}

export async function putcloseVote(id, setRefreshEvent) {
	{
		try {
			const token = localStorage.getItem("token");
			const res = await fetch(`http://localhost:8080/api/events/${id}/votes/close`, {
				method: "PUT",
				headers: { "Authorization": `Bearer ${token}` }
			});
			if (!res.ok) throw new Error("Erreur lors de la clôture des votes");
			const data = await res.json();
			setRefreshEvent(prev => !prev);
			alert(data.message || "Votes clôturés ✅");
		} catch (err) {
			alert(err.message);
		}
	}
}

export async function handleSaveFinalChoices({ id, finalDateId, finalGameIds, setMessage, setShowFinalForm, setRefreshEvent }) {
	try {
		const token = localStorage.getItem("token");
		const res = await fetch(`http://localhost:8080/api/events/${id}/final`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ finalDateId, finalGameIds })
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.error || "Erreur serveur");
		}

		const data = await res.json();
		setMessage(data.message || "Choix finaux enregistrés ✅");
		setRefreshEvent(prev => !prev);
		setShowFinalForm(false);
	} catch (err) {
		setMessage(err.message);
	}
}

export async function handleJoinEvent(id, setRefreshEvent) {
	try {
		const res = await fetch(
			`http://localhost:8080/api/events/${id}/join`,
			{
				method: "POST",
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			}
		);
		if (res.ok) {
			setRefreshEvent(prev => !prev);
			alert("Vous avez rejoint l'événement ✅");
		} else {
			const err = await res.json();
			alert(err.error || "Erreur lors de la tentative de rejoindre");
		}
	} catch (err) {
		alert("Erreur réseau");
	}
}

export async function updateEventStatus(id, newStatus, setRefreshEvent) {
	try {
		console.log("yo");
		const token = localStorage.getItem("token");
		const res = await fetch(`http://localhost:8080/api/events/${id}/status`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ status: newStatus })
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.error || "Erreur serveur");
		}

		setRefreshEvent(prev => !prev);
	} catch (err) {
		alert(err.message || "Impossible de mettre à jour le statut");
	}
}

export async function handleEndEvent(id, winnerId, setRefreshEvent, setShowEndModal) {
	try {
		const res = await fetch(`http://localhost:8080/api/events/${id}/end`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ winnerId: winnerId || null })
		});

		if (res.ok) {
			setRefreshEvent(prev => !prev);
			setShowEndModal(false);
			alert("Événement clôturé ✅");
		} else {
			const err = await res.json();
			alert(err.error || "Erreur lors de la clôture");
		}
	} catch (err) {
		alert("Erreur réseau");
	}
}

export async function putAcceptInvite(id, setRefreshEvent) {
	const res = await fetch(
		`http://localhost:8080/api/events/${id}/accept`,
		{
			method: "PUT",
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
	if (res.ok) {
		setRefreshEvent(prev => !prev);
		alert("Invitation acceptée ✅");
	} else {
		alert("Erreur lors de l'acceptation");
	}
}

export async function deleteParticipant(id, userId, setRefreshEvent) {
	console.log(id, userId);
	const res = await fetch(
		`http://localhost:8080/api/events/${id}/invite/${userId}`,
		{
			method: "DELETE",
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		}
	);
	if (res.ok) {
		setRefreshEvent(prev => !prev);
		alert("Vous avez quitté l'événement ✅");
	} else {
		alert("Erreur lors de la sortie");
	}
}
