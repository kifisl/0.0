import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/layouts/defaultLayout";
import Product from "@/components/products";

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/search/byName?query=${query}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          }
        );

        const data = await response.json();
        console.log("data", data);
        setSearchResults(data.result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setIsLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);

  if (isLoading) {
    return (
      <DefaultLayout>
        <h3>Loading...</h3>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div>
        <h1>Search Results</h1>
        <p>Showing results for: {query}</p>
        {searchResults && searchResults.length > 0 ? (
          <div className="d-flex">
            {searchResults.map((obj, i) => (
              <Product {...obj} key={i} />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default SearchResults;
