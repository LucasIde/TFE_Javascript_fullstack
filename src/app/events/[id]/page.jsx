import EventPage from "@/components/eventFullPage/eventDisplayPage";


export default async function EventDetailPage({ params }) {
  const {id} = await params;

  return (
    <div className="pt-20">
      <EventPage id={id}/>
    </div>
  );
}
