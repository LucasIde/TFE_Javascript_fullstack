import EventDislay from "@/components/eventMainpage/eventDisplay";
import NewEventDisplay from "@/components/eventMainpage/neweventDisplay";

export default function eventsPage() {

    return (
        <main>
            <h1>events pages</h1>
            <EventDislay/>
            <NewEventDisplay/>
        </main>
    );
}