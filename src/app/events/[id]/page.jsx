import EventPage from "@/components/eventFullPage/eventDisplayPage";


export default async function EventDetailPage({ params }) {
  const {id} = await params;
  
  return (
    <main>
      <EventPage id={id}/>
    </main>
  );
}