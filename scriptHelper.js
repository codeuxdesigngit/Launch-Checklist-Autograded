// Write your helper functions here!

require("cross-fetch/polyfill");

// This function will add destination info to mission target div
function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.

  document.getElementById("missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

// Check input
function validateInput(testInput) {
  // Check if the input is empty
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(testInput)) {
    // Check if it's a number
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

// Update form submission, show launch status
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  // Getting elements to update
  let launchStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let isReadyForLaunch = true;

  // Check if any fields are empty
  if (pilot === "" || copilot === "" || fuelLevel === "" || cargoLevel === "") {
    alert("All fields are required!");
    return;
  }

  // Check if fuelLevel and cargoLevel are numbers
  if (
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoLevel) === "Not a Number"
  ) {
    alert("Fuel level and cargo mass must be numbers");
    return;
  }

  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  // Check fuel level
  if (fuelLevel < 10000) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
    isReadyForLaunch = false;
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  // Check cargo mass
  if (cargoLevel >= 10000) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    isReadyForLaunch = false;
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  // Update launch status
  if (isReadyForLaunch) {
    launchStatus.innerHTML = "Shuttle is Ready for Launch";
    launchStatus.style.color = "green";
    list.style.visibility = "hidden";
  } else {
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
  }
}

// Fetch planet data from API
async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json(); // Convert response to JSON
  });

  return planetsReturned;
}

// Pick random planet
function pickPlanet(planets) {
  let randomPlanet = Math.floor(Math.random() * planets.length);
  return planets[randomPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
