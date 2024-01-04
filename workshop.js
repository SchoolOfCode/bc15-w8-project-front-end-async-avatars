const params = new URLSearchParams(document.location.search);
const workshopID = params.get("id");

const descriptionWrapper = document.querySelector(".description");
const bookmarksWrapper = document.querySelector(".links");
const commentsWrapper = document.querySelector(".comments");

/**
 * @description sends a fetch request to get workshop by id and then adds the received details to the DOM
 */
async function getWorkshop() {
  // send fetch get request the workshop endpoint
  const response = await sendFetchRequest("GET", `https://project-back-end-soc-app.onrender.com/workshops/${workshopID}`);
  // if the request wasn't successful
  if (response.status !== "success") {
    console.log("error loading workshop");
    return;
  }
  const workshopObject = response.data;
  addWorkshopDetails(workshopObject);
  const bookmarksResponse = await sendFetchRequest("GET", `https://project-back-end-soc-app.onrender.com/workshops/${workshopID}/bookmarks`);
  if (response.status !== "success") {
    console.log("error loading bookmarks");
    return;
  }
  const bookmarksArray = bookmarksResponse.data;
  bookmarksArray.forEach((bookmark) => {
    addWorkshopBookmarks(bookmark);
  });
  const commentsResponse = await sendFetchRequest("GET", `https://project-back-end-soc-app.onrender.com/workshops/${workshopID}/comments`);
  if (response.status !== "success") {
    console.log("error loading comments");
    return;
  }
  const commentsArray = commentsResponse.data;
  commentsArray.forEach((comment) => {
    addWorkshopComments(comment);
  });
}

function addWorkshopDetails(workshopObject) {
  // add the h2 element for the top of the container
  const header = document.createElement("h2");
  header.textContent = workshopObject.name;
  // append the header to the container
  descriptionWrapper.appendChild(header);
}

function addWorkshopBookmarks(bookmark) {
  const linkElement = document.createElement("a");
  linkElement.classList.add("link");
  linkElement.textContent = bookmark.description;
  linkElement.setAttribute("href", bookmark.url);
  if (bookmark.helpful_links === false) {
    descriptionWrapper.appendChild(linkElement);
  } else {
    bookmarksWrapper.appendChild(linkElement);
  }
}

function addWorkshopComments(comment, loadTop = false) {
  const commentBox = document.createElement("div");
  commentBox.classList.add("commentBox");
  commentsWrapper.appendChild(commentBox);
  const paragraphElement = document.createElement("pre");
  paragraphElement.textContent = comment.comment;
  commentBox.appendChild(paragraphElement);

  if (!loadTop) {
    commentsWrapper.appendChild(commentBox);
  } else {
    const insertBeforeElement = commentsWrapper.querySelector(".commentBox");
    const newElementParent = document.querySelector(".comments");
    newElementParent.insertBefore(commentBox, insertBeforeElement);
  }
}

async function postNewComment() {
  const comment = document.querySelector(".commentInput").value;
  const bodyObject = {
    comment: comment,
  };
  const commentsResponse = await sendFetchRequest("POST", `https://project-back-end-soc-app.onrender.com/workshops/${workshopID}/comments`, bodyObject);
  if (commentsResponse.status !== "success") {
    console.log("error posting comments");
    return;
  }
  const commentsObject = commentsResponse.data;
  addWorkshopComments(commentsObject);
  document.querySelector(".commentInput").value = "";
}

getWorkshop();
document.querySelector(".commentPost").addEventListener("click", (button) => {
  postNewComment();
});

// getWorkshop();
