import { useRouter } from "next/navigation";


export default function EventCard({ data }) {
    const router = useRouter();


    const nbImageGame = Math.min(data.Games.length, 3);
    return (
        <div className="eventCard" onClick={() => router.push(`/events/${data.id}`)}>
            <div className="p-4">
                <h2 className="eventCard_title text-xl">{data.title} :</h2>
                <div className="eventCard_visibility p-4">{data.visibility}</div>
                <p className="eventCard_desc text-lg line-clamp-3 my-4">{data.description}</p>
                <div className="flex justify-between">
                    <div>Created By : {data.creator.username}</div>
                    <div>status : {data.status}</div>
                    <div>{data.participantCount} / {data.max_player} Players</div>
                </div>
                {/* {(data.winner) && <span>the winner is :</span>} */}
            </div>
            <div
                className={`eventCard_footer grid ${nbImageGame === 1
                    ? "grid-cols-1"
                    : nbImageGame === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
            >
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
