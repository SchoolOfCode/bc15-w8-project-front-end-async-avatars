// Select the DOM elements for the weeks wrapper and the dropdown container
const weeksWrapper = document.querySelector(".wrapper");
const dropdownContainer = document.querySelector(".dropdown-content");

// Get the host and pathname from the current URL
let host = window.location.host;
let pathname = window.location.pathname;

// If the pathname doesn't include 'index.html', append it to ensure consistency
if (!pathname.includes("index.html")) {
  pathname += "index.html";
}

// Construct the workshop detail URL based on the host and pathname
let workshopDetailUrl = `http://${host}${pathname.replace(
  "index.html",
  "workshops.html"
)}`;
console.log("host", window.location.host);
console.log("hostname", window.location.hostname);
console.log("pathname", window.location.pathname);

// Async function to fetch all workshops and update the DOM
async function getAllWorkshops() {
  // Send a fetch GET request to the workshops endpoint
  const response = await sendFetchRequest(
    "GET",
    `http://localhost:3000/workshops/${workshopID}`
  );

  // Check if the request was successful
  if ((response.status = "success")) {
    // Extract the data from the response object
    const contentsArray = response.data;
    console.log(contentsArray);

    // Initialize variables to track week names and container for each week
    let holdWeekname = "";
    let weekContainerUl = null;

    // Iterate through each workshop in the array
    contentsArray.forEach((workshop) => {
      // Check if the week name has changed
      if (holdWeekname !== workshop.week_name) {
        // Create a new week container and update shortcuts
        weekContainerUl = createWeeknameContainer(workshop.week_name);
        addWeekToShortcuts(workshop.week_name);
        holdWeekname = workshop.week_name;
      }

      // Add the workshop to the corresponding week container
      addWorkshopToWeek(weekContainerUl, workshop);
    });
  }
}

// Function to create a new week container in the DOM
function createWeeknameContainer(weekname) {
  const container = document.createElement("div");
  container.classList.add("week");
  container.setAttribute("id", weeknameToId(weekname));
  const header = document.createElement("h2");
  header.textContent = weekname;
  container.appendChild(header);
  const listContainer = document.createElement("ul");
  container.appendChild(listContainer);
  weeksWrapper.appendChild(container);
  return listContainer;
}

// Function to add a workshop to a week container in the DOM
function addWorkshopToWeek(container, workshop) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.textContent = workshop.workshop_name;
  link.setAttribute("href", `${workshopDetailUrl}?id=${workshop.id}`);
  listItem.append(link);
  container.append(listItem);
  container.append(document.createElement("br"));
}

// Function to add a week name to the shortcuts dropdown
function addWeekToShortcuts(weekname) {
  const shortcut = document.createElement("a");
  shortcut.textContent = weekname;
  shortcut.setAttribute("href", `#${weeknameToId(weekname)}`);
  dropdownContainer.appendChild(shortcut);
}

// Function to convert a week name to a corresponding HTML element ID
function weeknameToId(weekname) {
  const parts = weekname.split(" - ");
  return parts[0].toLowerCase().replace(" ", "_");
}

// Call the function to fetch and display workshops on page load
getAllWorkshops();

// const weeksWrapper = document.querySelector(".wrapper");
// const dropdownContainer = document.querySelector(".dropdown-content");
// // const workshopDetailUrl = "http://127.0.0.1:5500/workshops.html";
// // let workshopDetailUrl = window.location.href;
// // const position = workshopDetailUrl.search("index.html");
// // if (position !== -1) {
// //   workshopDetailUrl = workshopDetailUrl.slice(0, position) + "workshops.html";
// // } else {
// //   workshopDetailUrl = workshopDetailUrl.slice(0, position) + "workshops.html";
// // }
// let host = window.location.host;
// let pathname = window.location.pathname;
// if (!pathname.includes('index.html')) {
//   pathname += 'index.html'
// }

// let workshopDetailUrl = `http://${host}${pathname.replace('index.html', 'workshops.html')}`
// console.log("host", window.location.host);
// console.log("hostname", window.location.hostname)
// console.log("pathname", window.location.pathname);

// // const workshopDetailUrl = window.location.href.replace('index.html', 'workshops.html');

// // 127.0.0.1:5500/Frontend/bc15-w8-project-front-end-async-avatars/workshops.html";

// /**
//  * @description sends a fetch request to get all workshops and then adds the received details to the DOM
//  */
// async function getAllWorkshops() {
//   // send fetch get request to all workshops endpoint
//   const response = await sendFetchRequest("GET", `http://localhost:3000/workshops/${workshopID}`);
//   // if the request was successful
//   if ((response.status = "success")) {
//     // extract the data from the returned response object
//     const contentsArray = response.data;
//     console.log(contentsArray);
//     // for each element in the array, add the object details to the DOM

//     let holdWeekname = "";
//     let weekContainerUl = null;
//     contentsArray.forEach((workshop) => {
//       if (holdWeekname !== workshop.week_name) {
//         weekContainerUl = createWeeknameContainer(workshop.week_name);
//         addWeekToShortcuts(workshop.week_name);

//         holdWeekname = workshop.week_name;
//       }
//       addWorkshopToWeek(weekContainerUl, workshop);
//     });
//   }
// }

// /**
//  * @description Adds a new weeks container to the weeksWrapper HTML node
//  * @param {string} weekname text header to add to top of weeks container
//  * @returns the UL list container inside the newly created week container
//  */
// function createWeeknameContainer(weekname) {
//     // create a new div HTML element as the new week container
//     const container = document.createElement('div');
//     // add class to aid CSS styling
//     container.classList.add("week");
//     // set the id for use by the shortcuts dropdown
//     container.setAttribute("id", weeknameToId(weekname));
//     // add the h2 element for the top of the container
//     const header = document.createElement("h2");
//     header.textContent = weekname;
//     // append the header to the container
//     container.appendChild(header);
//     // create a <ul> HTML element as a placeholder for the workshops
//     const listContainer = document.createElement("ul");
//     // append the ul element to the week container
//     container.appendChild(listContainer);
//     // append the week container to the weeks wrapper
//     weeksWrapper.appendChild(container);
//     // return the newly created week holder
//     return listContainer;
// }

// /**
//  * @description create a new workshop link element inside the passed container element
//  * @param {HTMLElement} container the parent container element into which to create the new workshop node
//  * @param {object} workshop a JSON object containing the workshop properties
//  */
// function addWorkshopToWeek(container, workshop) {
//     // create a new <li> element
//     const listItem = document.createElement("li");
//     // create a new <a> element and set the text and href
//     const link = document.createElement("a");
//     link.textContent = workshop.workshop_name;
//     link.setAttribute("href", `${workshopDetailUrl}?id=${workshop.id}`);
//     // append the <a> element to the list item
//     listItem.append(link);
//     // append the list item to the container
//     container.append(listItem);
//     // append a <br> element to the container
//     container.append(document.createElement("br"));
// }

// /**
//  * @description adds weekname to shortcuts dropdown
//  * @param {string} weekname name to be added to dropdown
//  */
// function addWeekToShortcuts(weekname) {
//     // create a <a> element
//     const shortcut = document.createElement('a');
//     // set the text and href for the <a> element
//     shortcut.textContent = weekname;
//     shortcut.setAttribute('href', `#${weeknameToId(weekname)}`);
//     // append the <a> element to the dropdown container
//     dropdownContainer.appendChild(shortcut);
// }

// function weeknameToId(weekname) {
//   const parts = weekname.split(" - ");
//   return parts[0].toLowerCase().replace(" ", "_");
// }

// getAllWorkshops();
