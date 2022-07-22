Git Hub Search Bar, Task 1.


### The Task
To design a search engine that calls the git hub search API, we should be able to choose to search between repositories and users.

### Requirements:
1. ReactJS used for UI,
2. antDesign for templates.
3. Redux Persist for caching.
4. Redux for state management.
5. Prevent excessive API calls

### The Approach.
Functional componenets have been prioritized over class componenets a they allow for more flexibility via allowing react hooks introduced in react 16.8+. Other than that react-redux useSelector and useDispatch have been utilized as these have less boiler plate setup than mapStatetoProps and mapDispatchtoProps.

Whenever the API is called, the results are stored via the resultsReducer, these can be accesed by the content.js componenet which handles displaying the contents. Other properites like inputted text, and drop down selection are also stored via their respective reducers, in order for inter-component integration and data sharing. For example, whenever the drop menu seleciton is changed the screen has to be cleared and new results of the same search term has to be displayed. This required drop menu to access the saved inputText otherwise it won't be able to make the new API call.

API calls and data handling is done via the useData custom hook. This hook contains two functions. updateData and concatData. These functions are destructured into display componenets so that they can access them. updateData calls the API via the getSearchResults.js component,and once it asynchroniously gets back the results it updates the resultsReducer state with new data. This refreshed the results. This function is called whenever the user changes the search input and also whenever the rop down selection is changed. concatData function asynchroniously calls the API to get the results, but instead of updating the resultsReducer it appends the results to the end, via the concat array. This allows for the contents component to render the new results. This function is called whnever the last element is displayed on the screen.
