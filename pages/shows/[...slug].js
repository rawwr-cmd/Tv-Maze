import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";

import ShowList from "../../components/shows/show-list";
import ResultsTitle from "../../components/shows/result-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const fetcher = (url) => fetch(url).then((res) => res.json());

const FilteredShows = () => {
  const [loadedShows, setLoadedShows] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useSWR(
    "https://api.tvmaze.com/search/shows?q=all",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedData = data.map((show) => {
        const showData = show.show;
        const score = show.score;

        return {
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
      });

      setLoadedShows(transformedData);
    }
  }, [data]);

  const filteredYear = parseInt(slug?.[0]);
  const filteredMonth = parseInt(slug?.[1]);

  let pageHeadData = () => (
    <Head>
      <title>Filtered Shows</title>
      <meta name="description" content={`A list of filtered shows.`} />
    </Head>
  );

  if (!loadedShows || loadedShows.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading</p>
      </Fragment>
    );
  }

  pageHeadData = (
    <Head>
      <title>Filtered Shows</title>
      <meta
        name="description"
        content={`All shows for ${filteredMonth}/${filteredYear}`}
      />
    </Head>
  );

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear < 1994 ||
    filteredYear > 2020 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">Show All Shows</Button>
        </div>
      </Fragment>
    );
  }

  const filteredShows = loadedShows.filter((show) => {
    const showDate = new Date(show.premieredOn);
    return (
      showDate.getFullYear() === filteredYear &&
      showDate.getMonth() === filteredMonth - 1
    );
  });

  if (filteredShows.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No shows found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/">Show All Shows</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={date} />
      <ShowList items={filteredShows} />
    </div>
  );
};

export default FilteredShows;
