import React from "react";
import * as ActionCreators from "../Redux/Actions/index";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import getResults from "./getSearchResults";
import { debounce, uniq } from "lodash";

export function useData() {
  // Selectors required for operation
  const persistedData = useSelector((state) => state.pReducer);
  const savedResults = useSelector((state) => state.resultsReducer);
  //----------------------------------------------------

  //Actions required for operations, done via action creators. Actions are destructure and bound by bindActionCreators.
  const dispatch = useDispatch();
  const { saveResults, Remaining, startLoading, persistData } =
    bindActionCreators(ActionCreators, dispatch);
  //-------------------------------------------------------------------------------------------------------------------

  // First function in the custom hook, this gives an async call to to our API and stores the results in our results reducer and persists the results as well to locally store them
  const updateData = async (search, type, page) => {
    let cache = [...[], ...persistedData.storage];
    saveResults([]);
    const cacheIndex = await cache.findIndex((obj) => {
      return obj.search === search && obj.type === type && obj.page === page;
    });

    if (search.length >= 3) {
      if (cacheIndex > -1) {
        saveResults(cache[cacheIndex].items);
        Remaining(cache[cacheIndex].total);
        startLoading(false);
      } else {
        await startLoading(true);
        const Results = await getResults(search, type, page);
        saveResults(Results["items"]);
        Remaining(Results["total_count"]);
        search.length >= 3
          ? cache.push({
              search: search,
              type: type,
              page: page,
              total: Results["total_count"],
              items: Results["items"],
            })
          : console.log("no persisting");
        persistData({ storage: cache });
        await startLoading(false);
      }
    }
  };
  //------------------------------------------------------------------------------------------------------------

  //Second function, gives async call to our api, but instead of updating our results store it appends the result at the end of it, used for infinite scrollong.
  const concatData = async (search, type, page) => {
    let cache = [...[], ...persistedData.storage];
    startLoading(true);
    const cacheIndex = await cache.findIndex((obj) => {
      return obj.search === search && obj.type === type && obj.page === page;
    });

    if (cacheIndex > -1) {
      startLoading(true);
      saveResults(await savedResults.concat(cache[cacheIndex].items));
      startLoading(false);
    } else {
      startLoading(true);
      const Results = await getResults(search, type, page);
      saveResults(savedResults.concat(uniq(Results["items"])));
      Remaining(Results["total_count"]);
      console.log();
      search.length >= 3
        ? cache.push({
            search: search,
            type: type,
            page: page,
            total: Results["total_count"],
            items: Results["items"],
          })
        : console.log("no persisting");
      persistData({ storage: cache });
      const endloadding = debounce(() => startLoading(false), 6000); //6 second debounce to prevent API 403 too many requests error.
      endloadding();
    }
  };

  //------------------------------------------------------------------------------------------------------
  return [updateData, concatData];
}
