import { useRouter } from "next/navigation";


export default function NewEventCard({ data }) {
    const router = useRouter();


    const nbImageGame = Math.min(data.Games.length, 3);
    return (
        <div className="eventCard p-4" onClick={() => router.push(`/events/${data.id}`)}>
            <div
                className={`grid ${nbImageGame === 1
                    ? "grid-cols-1"
                    : nbImageGame === 2
                        ? "grid-cols-2"
                        : "grid-cols-3"
                    }`}
            >
                {data.Games.slice(0, 3).map((game, index) =>
                    <div key={index} className={`eventCard_image ${(nbImageGame > 1) ? "eventCard_image--diagonal" : "eventCard_image--single"}`}>
                        {(nbImageGame > 1) ?
                            < img src={game.libraryImage || "/images/default_vertical.png"}
                                alt={game.name}
                                className="" />
                            : <img src={game.headerImage || "/images/default_horizontal.png"}
                                alt={game.name}
                                className=""/>}
                    </div>
                )}
            </div>
            <div className="py-3">
                <div className="flex justify-between items-center">
                    <h2 className="eventCard_title text-2xl">{data.title}</h2>
                    <div className={`eventCard_visibility--${data.visibility}`}>{data.visibility}</div>
                </div>
                <p className="eventCard_desc text-md line-clamp-3 my-4">{data.description}</p>
                <div className="flex justify-between">
                    <div className="eventCard_creator">{data.creator.username}</div>
                    <div>{data.Users.length} / {data.max_player} Players</div>
                    <div>status : {data.status}</div>
                </div>
                {/* {(data.winner) && <span>the winner is :</span>} */}
            </div>
        </div>
    );
}
