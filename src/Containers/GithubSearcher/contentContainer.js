import { useEffect } from "react";
import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useData } from "../../Services/useData";

let PageNum = 2;
function useContent() {
  // Selectors required for operation
  const results = useSelector((state) => state.resultsReducer);
  const type = useSelector((state) => state.dropDownReducer);
  const inputText = useSelector((state) => state.searchReducer);
  const Remaining = useSelector((state) => state.remainingReducer);
  const isLoading = useSelector((state) => state.loadingReducer);
  //--------------------------------------------------------------------------------

  /*useEffect is utilized here to initialize the page numbers back to 0 whenever either 
  the inputText in the searchbox is updarted or the dropdown selection is changed */
  useEffect(() => {
    PageNum = 2;
  }, [type, inputText]);
  const [updateData, concatData] = useData();
  //---------------------------------------------------------------------------------------

  /*This part handles the infinite scroll, IntersectionObserver checks whenever the last element is on screen, 
  which updates the entries. useRef call backs the lastRef call back */
  const observer = useRef(null);

  const lastRefCalllback = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        results.length !== Remaining &&
        isLoading === false
      ) {
        concatData(inputText, type, PageNum);
        PageNum++;
      }
    });
    if (node) observer.current.observe(node);
  });
  //--------------------------------------------------------------------------

  return [results, isLoading, lastRefCalllback];
}

export default useContent;
