const gitUrl = "https://api.github.com/search/";

//Call the API
async function getResults(inputText, type, pageNumber) {
  let results = [];

  const finType = type === "Users" ? "users" : "repositories";
  const query = gitUrl + finType + "?q=" + inputText + "&page=" + pageNumber;
  const response = await fetch(query);
  results = await response.json();
  return results;
}

export default getResults;
