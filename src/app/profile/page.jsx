'use client'

import GameCard from "@/components/gameCard";
import datas from "@/data/user.json"
import { useAuth } from "@/components/auth/authContext";
import { redirect } from "next/navigation";

const data = datas.users[2];

export default function ProfilePage() {
  const {isAuthenticated} = useAuth();
  if (!isAuthenticated) {
    redirect("/");
  }

  return (
  <main className="container mx-auto flex justify-center">
    <div>
      <div className="flex justify-center">
        <div className="bgc--blue profileUser inline-flex items-center gap-6 p-6">
          <img src={data.avatar} alt="avatar_picture" />
          <h2 className="text-2xl">{data.pseudo}</h2>
        </div>
      </div>
      <div className="flex gap-6 my-4 justify-between">
        <div className="bgc--blue px-12 py-4 text-lg">Event Played:<span className="border_stat">{data.stats.nbEvents}</span></div>
        <div className="bgc--blue px-12 py-4 text-lg">Event Win: <span className="border_stat">{data.stats.nbVictoires}</span></div>
        <div className="bgc--blue px-12 py-4 text-lg">
          Win Ratio:
          <span className="border_stat">
            {(data.stats.nbEvents == 0) ?
            "0%" :
            (`${((data.stats.nbVictoires / data.stats.nbEvents) * 100).toFixed(2)}%`)}
          </span>
        </div>
      </div>
      {/* globale rectangle */}
      <div className="bgc--blue flex flex-col p-6 my-4 text-xl">classement global: <span className="border_stat">{data.classementGlobal}</span></div>
      {(data.steamLogged) && <div className="flex gap-6 bgc--blue p-6 my-4">
        {data.top3Jeux.map((element, index) => <GameCard  key={index} game={element}/>)}
      </div>}
      <div className="flex justify-center">
        <div className="bgc--blue my-4 inline-flex flex-col items-center p-4 text-xl"> Favorite Game:<GameCard game={data.jeuPrefere}/></div>
      </div>
    </div>
  </main>
  );
}