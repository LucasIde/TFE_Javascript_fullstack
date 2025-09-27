import EventPage from "@/components/eventpage/Eventpage";


export default async function EventDetailPage({ params }) {
  const {id} = await params;

  return (
    <div className="pt-20 pb-5">
      <EventPage id={id}/>
    </div>
  );
}
