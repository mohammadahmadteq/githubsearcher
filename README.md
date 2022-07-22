Git Hub Search Bar, Task 1.


### The Task
To design a search engine that calls the git hub search API, we should be able to choose to search between repositories and users.

### Requirements:
1. ReactJS used for UI,
2. antDesign for templates.
3. Redux Persist for caching.
4. Redux for state management.
5. Prevent excessive API calls.
6. Responsive design to readjust the layourt at smaller screen sizes of < 768px

### High Level Approach.
Functional componenets have been prioritized over class componenets a they allow for more flexibility via allowing react hooks introduced in react 16.8+. Other than that react-redux useSelector and useDispatch have been utilized as these have less boiler plate setup than mapStatetoProps and mapDispatchtoProps.

Whenever the API is called, the results are stored via the resultsReducer, these can be accesed by the content.js componenet which handles displaying the contents. Other properites like inputted text, and drop down selection are also stored via their respective reducers, in order for inter-component integration and data sharing. For example, whenever the drop menu seleciton is changed the screen has to be cleared and new results of the same search term has to be displayed. This required drop menu to access the saved inputText otherwise it won't be able to make the new API call.

API calls and data handling is done via the useData custom hook. This hook contains two functions. updateData and concatData. These functions are destructured into display componenets so that they can access them. updateData calls the API via the getSearchResults.js component,and once it asynchroniously gets back the results it updates the resultsReducer state with new data. This refreshed the results. This function is called whenever the user changes the search input and also whenever the rop down selection is changed. concatData function asynchroniously calls the API to get the results, but instead of updating the resultsReducer it appends the results to the end, via the concat array. This allows for the contents component to render the new results. This function is called whnever the last element is displayed on the screen.

Sometimes the APi results can contain repeating components to prevent that lodash unique is imported and used. Unlike javascript sets, unqie performs a deep comparision allowing for filtering the array and removing duplicates.

To make sure excessive API calls are not made debounce delay of 6 seconds have been implemented. GitHub search API only allows 10 calls per minute or one call every six seconds. ALso, to prevent calling the API even after all the results have been displayed, there is a state in the store, remainingReducer. This gives us the number of items present. This is then coimpared with the length of the results state. if both are equal then no more API calls are made. API calls are also not made whenever the isLoading state is set to true.

Caching is implemented via redux persisit. Results are stored as an array of objects which contain the search term, type, pgae number and number of remaining items. Which afre later loaded form local storage into the application suing a cache variable in the data. Using array.findIndex, if it has a value >-1 which means it contains the search term, type and page number, than instead of calliung API the results are taken from the cache array.
