// Extract workshop ID from the URL parameters
const params = new URLSearchParams(document.location.search);
const workshopID = params.get("id");

// Select DOM elements for workshop details, bookmarks, and comments
const descriptionWrapper = document.querySelector(".description");
const bookmarksWrapper = document.querySelector(".links");
const commentsWrapper = document.querySelector(".comments");

/**
 * @description Sends a fetch request to get workshop by id and then adds the received details to the DOM
 */
async function getWorkshop() {
  // Send a fetch GET request to the workshop endpoint
  const response = await sendFetchRequest(
    "GET",
    `http://localhost:3000/workshops/${workshopID}`
  );

  // Check if the request was successful
  if (response.status !== "success") {
    console.log("Error loading workshop");
    return;
  }

  // Extract workshop details from the response
  const workshopObject = response.data;
  addWorkshopDetails(workshopObject);

  // Fetch and display bookmarks for the workshop
  const bookmarksResponse = await sendFetchRequest(
    "GET",
    `http://localhost:3000/workshops/${workshopID}`
  );
  if (bookmarksResponse.status !== "success") {
    console.log("Error loading bookmarks");
    return;
  }
  const bookmarksArray = bookmarksResponse.data;
  bookmarksArray.forEach((bookmark) => {
    addWorkshopBookmarks(bookmark);
  });

  // Fetch and display comments for the workshop
  const commentsResponse = await sendFetchRequest(
    "GET",
    `http://localhost:3000/workshops/${workshopID}`
  );
  if (commentsResponse.status !== "success") {
    console.log("Error loading comments");
    return;
  }
  const commentsArray = commentsResponse.data;
  commentsArray.forEach((comment) => {
    addWorkshopComments(comment);
  });
}

// Function to add workshop details to the DOM
function addWorkshopDetails(workshopObject) {
  const header = document.createElement("h2");
  header.textContent = workshopObject.name;
  descriptionWrapper.appendChild(header);
}

// Function to add workshop bookmarks to the DOM
function addWorkshopBookmarks(bookmark) {
  const linkElement = document.createElement("a");
  linkElement.classList.add("link");
  linkElement.textContent = bookmark.description;
  linkElement.setAttribute("href", bookmark.url);

  // Check if the bookmark is marked as helpful_links
  if (bookmark.helpful_links === false) {
    descriptionWrapper.appendChild(linkElement);
  } else {
    bookmarksWrapper.appendChild(linkElement);
  }
}

// Function to add workshop comments to the DOM
function addWorkshopComments(comment, loadTop = false) {
  const commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");
  commentsWrapper.appendChild(commentBox);

  const paragraphElement = document.createElement("pre");
  paragraphElement.textContent = comment.comment;
  commentBox.appendChild(paragraphElement);

  // Determine where to insert the new comment in the commentsWrapper
  if (!loadTop) {
    commentsWrapper.appendChild(commentBox);
  } else {
    const insertBeforeElement = commentsWrapper.querySelector(".commentBox");
    const newElementParent = document.querySelector(".comments");
    newElementParent.insertBefore(commentBox, insertBeforeElement);
  }
}

// Function to post a new comment
async function postNewComment() {
  const comment = document.querySelector(".commentInput").value;
  const bodyObject = {
    comment: comment,
  };

  // Send a fetch POST request to add a new comment
  const commentsResponse = await sendFetchRequest(
    "POST",
    `http://localhost:3000/workshops/${workshopID}`,
    bodyObject
  );

  // Check if the request was successful
  if (commentsResponse.status !== "success") {
    console.log("Error posting comments");
    return;
  }

  // Extract the new comment details and add them to the DOM
  const commentsObject = commentsResponse.data;
  addWorkshopComments(commentsObject);
  document.querySelector(".commentInput").value = "";
}

// Call the function to fetch and display workshop details on page load
getWorkshop();

// Add an event listener to the comment post button to handle new comments
document.querySelector(".commentPost").addEventListener("click", (button) => {
  postNewComment();
});

// const params = new URLSearchParams(document.location.search);
// const workshopID = params.get("id");

// const descriptionWrapper = document.querySelector(".description");
// const bookmarksWrapper = document.querySelector(".links");
// const commentsWrapper = document.querySelector(".comments");

// /**
//  * @description sends a fetch request to get workshop by id and then adds the received details to the DOM
//  */
// async function getWorkshop() {
//   // send fetch get request the workshop endpoint
//   const response = await sendFetchRequest("GET", `http://localhost:3000/workshops/${workshopID}`);
//   // if the request wasn't successful
//   if (response.status !== "success") {
//     console.log("error loading workshop");
//     return;
//   }
//   const workshopObject = response.data;
//   addWorkshopDetails(workshopObject);
//   const bookmarksResponse = await sendFetchRequest(
//     "GET",
//     `http://localhost:3000/workshops/${workshopID}`
//   );
//   if (response.status !== "success") {
//     console.log("error loading bookmarks");
//     return;
//   }
//   const bookmarksArray = bookmarksResponse.data;
//   bookmarksArray.forEach((bookmark) => {
//     addWorkshopBookmarks(bookmark);
//   });
//   const commentsResponse = await sendFetchRequest(
//     "GET",
//     `http://localhost:3000/workshops/${workshopID}`);
//   if (response.status !== "success") {
//     console.log("error loading comments");
//     return;
//   }
//   const commentsArray = commentsResponse.data;
//   commentsArray.forEach((comment) => {
//     addWorkshopComments(comment);
//   });
// }

// function addWorkshopDetails(workshopObject) {
//   // add the h2 element for the top of the container
//   const header = document.createElement("h2");
//   header.textContent = workshopObject.name;
//   // append the header to the container
//   descriptionWrapper.appendChild(header);
// }

// function addWorkshopBookmarks(bookmark) {
//   const linkElement = document.createElement("a");
//   linkElement.classList.add("link");
//   linkElement.textContent = bookmark.description;
//   linkElement.setAttribute("href", bookmark.url);
//   if (bookmark.helpful_links === false) {
//     descriptionWrapper.appendChild(linkElement);
//   } else {
//     bookmarksWrapper.appendChild(linkElement);
//   }
// }

// function addWorkshopComments(comment, loadTop=false) {
//   const commentBox = document.createElement("div");
//   commentBox.classList.add("commentBox");
//   commentsWrapper.appendChild(commentBox);
//   const paragraphElement = document.createElement("pre");
//   paragraphElement.textContent = comment.comment;
//   commentBox.appendChild(paragraphElement);

//   if (!loadTop) {
//     commentsWrapper.appendChild(commentBox);
//   } else {
//     const insertBeforeElement = commentsWrapper.querySelector('.commentBox')
//     const newElementParent = document.querySelector('.comments')
//     newElementParent.insertBefore(commentBox, insertBeforeElement)
//   }
// }

// async function postNewComment() {
//   const comment = document.querySelector(".commentInput").value;
//   const bodyObject = {
//     comment: comment,
//   };
//   const commentsResponse = await sendFetchRequest(
//     "POST",
//     `http://localhost:3000/workshops/${workshopID}`,
//     bodyObject
//   );
//   if (commentsResponse.status !== "success") {
//     console.log("error posting comments");
//     return;
//   }
//   const commentsObject = commentsResponse.data;
//   addWorkshopComments(commentsObject);
//   document.querySelector(".commentInput").value = "";
// }

// getWorkshop();
// document.querySelector(".commentPost").addEventListener("click", (button) => {
//   postNewComment();
// });

// // getWorkshop();
