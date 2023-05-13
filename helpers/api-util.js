export const getAllEvents = async () => {
  const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
  const data = await response.json();

  console.log(data);

  //   const events = data.map((event: any) => {
  //     return {
  //       id: event.show.id,
  //       title: event.show.name,
  //       description: event.show.summary,
  //       location: event.show.network.country.name,
  //       date: event.show.premiered,
  //       image: event.show.image.medium,
  //       isFeatured: event.show.isFeatured,
  //     };
  //   });
  //   return events;
};

// export const getEventById = async (id: number) => {
//   const allEvents = await getAllEvents();
//   return allEvents.find((event) => event.id === id);
// };
