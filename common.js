/**
 * @description sends a fetch request of the passed type to the passed endpoint and returns an object containing the response
 * @param {string} method HTTP method to be used for the request: GET, POST, PATCH, DELETE
 * @param {string} url the full url to be used for the request, including any query parameters
 * @param {object} bodyParams a JSON object containing the properties to be sent in the body of the request.  Only used for POST and PATCH requests
 * @returns {object} the response object returned from the fetch.
 */
async function sendFetchRequest(method, url, bodyParams) {
  // console.log ("client send fetch request", "method: ", method, "url: ", url, "bodyParms: ", bodyParms);
  try {
    // set the opetions to be passed in the request
    const options = {
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    // if a POST or PATCH request, add the bodyParams to the options
    if (["POST", "PATCH"].includes(method)) {
      options.body = JSON.stringify(bodyParams);
    }
    // asynchronously call the fetch method
    const response = await fetch(url, options);
    //check the received response
    if (!response.ok) {
      // expects a JSend object with an errorData property to be received if there is a 'fail' error
      const errorData = await response.json();
      if (errorData.status === "fail") {
        // return the errorData is a 'fail' response
        return errorData;
      }
      console.error(`Error received: ${response.status}`);
    }
    // return the received data if successful response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
