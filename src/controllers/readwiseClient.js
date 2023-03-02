const fetchFromExportApi = async (token, updatedAfter = null) => {
  try {
    console.log("fetch processing for readwise");
    let fullData = [];
    let nextPageCursor = null;

    while (true) {
      const queryParams = new URLSearchParams();
      if (nextPageCursor) {
        queryParams.append("pageCursor", nextPageCursor);
      }
      if (updatedAfter) {
        queryParams.append("updatedAfter", updatedAfter);
      }
      console.log(
        "Making export api request with params " + queryParams.toString()
      );
      const response = await fetch(
        "https://readwise.io/api/v2/export/?" + queryParams.toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      const responseJson = await response.json();
      fullData.push(...responseJson["results"]);
      nextPageCursor = responseJson["nextPageCursor"];
      if (!nextPageCursor) {
        break;
      }
    }
    return fullData;
  } catch (error) {
    console.log(error);
  }
};

export default fetchFromExportApi;
