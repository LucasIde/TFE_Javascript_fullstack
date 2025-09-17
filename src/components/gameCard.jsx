export default function GameCard({game}) {
    return (
        <div className="gameCard">
            {(game.heures) && <div className="gameCard_hours px-4">Played {game.heures} Hours</div>}
            <img src={game.image} alt="game_picture" className="gameCard_picture"/>
            <div className="gameCard_name px-4">{game.nom}</div>
        </div>
    );
}