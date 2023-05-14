export const getAllShows = async () => {
  try {
    const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
    const shows = await response.json();

    const transformedData = [];

    shows.forEach((show) => {
      const showData = show.show;
      const score = show.score;

      const transformedShow = {
        id: showData.id.toString(),
        score: score,
        name: showData.name,
        title: showData.name,
        image: showData.image?.medium || null,
        premieredOn: showData.premiered,
        endedOn: showData.ended,
        averageRuntime: showData.averageRuntime,
        summary: showData.summary,
        language: showData.language,
        genres: showData.genres,
        rating: showData.rating?.average,
        schedule: showData.schedule,
      };

      transformedData.push(transformedShow);
    });

    // console.log(transformedData);
    return transformedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getShowById = async (id) => {
  const allShows = await getAllShows();
  const selectedShow = allShows.find((show) => show.id === id);
  console.log(selectedShow);
  return selectedShow;
};

export const getFilteredShows = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allShows = await getAllShows();
  let filteredEvents = allShows.filter((e) => {
    const showDate = new Date(e.premieredOn);
    return showDate.getFullYear() === year && showDate.getMonth() === month - 1;
  });

  return filteredEvents;
};
