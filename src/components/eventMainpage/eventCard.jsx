import datas from "@/data/event.json"

console.log(datas[0]);

const data = datas[0]

const nbImageGame = Math.min(data.Games.length, 3);

export default function EventCard() {
    return (
        <div className="eventCard">
            <div className="p-4">
                <h2 className="eventCard_title text-xl">{data.title} :</h2>
                <div className="eventCard_visibility p-4">{data.visibility}</div>
                <p className="eventCard_desc text-lg line-clamp-3 my-4">{data.description}</p>
                <div className="flex justify-between">
                    <div>Created By : {data.creator.username}</div>
                    <div>status : {data.status}</div>
                    <div>{data.Users.length} / {data.max_player} Players</div>
                </div>
                {/* {(data.winner) && <span>the winner is :</span>} */}
            </div>
            <div className={`eventCard_footer grid grid-cols-${nbImageGame}`}>
                {data.Games.slice(0, 3).map((game, index) =>
                    <div key={index} className={(nbImageGame > 1) ? "eventCard_image--diagonal" : "eventCard_image"}>
                        <img src={game.headerImage || "/images/default_horizontal.png"}
                            alt={game.name}
                            className=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
}