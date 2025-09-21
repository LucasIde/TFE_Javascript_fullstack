import { useState } from "react";

export default function GameSearch({ games, setGames }) {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);

	async function handleSearch(value) {
		const excludedId = games.map(g => g.id).join(",");
		setQuery(value);

		if (value.length < 2) {
			setResults([]);
			return;
		}

		const res = await fetch(`http://localhost:8080/api/games/search?query=${value}&excludedId=${excludedId}`);
		const data = await res.json();
		setResults(data);
	}

	function handleSelect(game) {
		// éviter les doublons
		console.log(game);
		if (!games.find((g) => g.id === game.id)) {
			setGames([...games, game]);
		}
		// vider le champ et les résultats
		setQuery("");
		setResults([]);
	}

	const deleteElement = (index) => {
		setGames(games.filter((_, i) => i !== index));
	};


	async function HandleAdd() {
		if (games.find((g) => g.name.toLowerCase() === query.toLowerCase())) {
			setQuery("");
			setResults([]);
			return;
		}
		let game = results.find((g) => g.name.toLowerCase() === query.toLowerCase())
		if (!game) {
			const res = await fetch('http://localhost:8080/api/games/add', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: query, isCustom: true }),
			});
			const response = await res.json()
			if (!res.ok) {
				alert(response.error || "Un problème est survenu, veuillez réessayer plus tard.");
				return;
			}
			game = response.game;
		}
		handleSelect(game);
	}

	return (
		<div className="relative">
			<div className="flex">
				<input
					type="text"
					value={query}
					onChange={(e) => handleSearch(e.target.value)}
					placeholder="Rechercher un jeu..."
					className="gameInput--bg w-full border p-2 rounded border-slate-600"
				/>
				<button type="button" onClick={() => HandleAdd()} className="add_date px-4 py-2 mx-2 rounded-lg shadow">
					Ajouter
				</button>
			</div>
			{results.length > 0 && (
				<ul className="custom-scroll absolute z-10 bg-white border w-full rounded shadow max-h-64 overflow-y-auto border-slate-500">
					{results.map((game) => (
						<li
							key={game.id}
							onClick={() => handleSelect(game)}
							className="gameInput gameInput--bg cursor-pointer p-2 hover:bg-gray-100 flex gap-2 items-center"
						>
							<img
								src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/capsule_184x69.jpg`}
								alt={game.name}
								className="gameInput_picture"
								onError={(e) => {
									e.currentTarget.src = "/images/default_horizontal.png"; // image de fallback
								}}
							/>
							{game.name}
						</li>
					))}
				</ul>
			)}

			{/* Liste des jeux sélectionnés */}
			{games.length > 0 && (
				<div className="gameWrapper p-4 mt-3 flex flex-wrap gap-2 rounded">
					{games.map((game, index) => (
						<div
							key={game.id}
							className="gameInput gameInput--bg flex items-center gap-2 border rounded p-2 border-slate-600"
						>
							<img
								src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appId}/capsule_184x69.jpg`}
								alt={game.name}
								className="gameInput_picture"
								onError={(e) => {
									e.currentTarget.src = "/images/default_horizontal.png"; // image de fallback
								}}
							/>
							<span>{game.name}</span>
							<button type="button" onClick={() => deleteElement(index)} className="delete_date">
								Supprimer
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
