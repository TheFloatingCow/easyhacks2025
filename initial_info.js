function getTripInfo() {
  const tripType = document.getElementById('tripType').value;
  const tripLength = document.getElementById('tripLength').value;
  const startingLocation = document.getElementById('startingLocation').value;
  const destination = document.getElementById('destination').value;
  const days = document.getElementById('days').value;
  const dayTripHours = document.getElementById('dayTripHours').value;
  const dayTripStops = document.getElementById('dayTripStops').value;
  const roadTripHours = document.getElementById('roadTripHours').value;
  const roadTripStops = document.getElementById('roadTripStops').value;

//  const questions = document.getElementById('questions');
//  questions.innerHTML = ''; // Clear previous questions

  const dayTripDiv = document.getElementById('dayTrip');
  const roadTripDiv = document.getElementById('roadTrip');
  if (tripLength === 'dayTrip') {
    dayTripDiv.style.display = 'block';
    roadTripDiv.style.display = 'none';
  } else if (tripLength === 'roadTrip') {
    dayTripDiv.style.display = 'none';
    roadTripDiv.style.display = 'block';
  } else {
    dayTripDiv.style.display = 'none';
    roadTripDiv.style.display = 'none';
  }
    console.log(tripType, tripLength, startingLocation, destination, days, dayTripHours, dayTripStops, roadTripHours, roadTripStops);
}
  /*if (tripLength === 'dayTrip') {
    //askDayTripInfo();
    //console.log(hours, stops);
  }
  else {
    //askRoadTripInfo();
    //console.log(days, hours, stops);
  }
  
}*/
/*
function askDayTripInfo() {
  const questions = document.getElementById('questions');
  questions.innerHTML = ''; // Clear previous questions
  questions.innerHTML = '<h2>Day Trip</h2>';
  // # of hours to drive
  questions.innerHTML += '<label for="hours">How many hours would you like to drive?</label>';
  questions.innerHTML += '<input type="number" id="hours" name="dayTripHours" min="1" max="24" required>';
  questions.innerHTML += '<br>';
  // # of stops
  questions.innerHTML += '<label for="stops">How many stops would you like to make?</label>';
  questions.innerHTML += '<input type="number" id="stops" name="dayTripStops" min="1" max="10" required>';
  questions.innerHTML += '<br>';
  // submit button
  questions.innerHTML += '<button type="button" onclick="getDayTripInfo()">submit!</button>';

}

function getDayTripInfo() {
  const hours = document.getElementById('hours').value;
  const stops = document.getElementById('stops').value;
}

function askRoadTripInfo() {
  const questions = document.getElementById('questions');
  questions.innerHTML = ''; // Clear previous questions
  questions.innerHTML = '<h2>Road Trip</h2>';
  // # of days
  questions.innerHTML += '<label for="days">How many days would you like to travel?</label>';
  questions.innerHTML += '<input type="number" id="days" name="days" min="1" max="30" required>';
  questions.innerHTML += '<br>';
  // # of hours to drive
  questions.innerHTML += '<label for="hours">How many hours would you like to drive per day?</label>';
  questions.innerHTML += '<input type="number" id="hours" name="dayTripHours" min="1" max="24" required>';
  questions.innerHTML += '<br>';
  // # of stops
  questions.innerHTML += '<label for="stops">How many stops would you like to make in total?</label>';
  questions.innerHTML += '<input type="number" id="stops" name="dayTripStops" min="1" max="10" required>';
  questions.innerHTML += '<br>';
  // accomodation verification
  //questions.innerHTML += '<label for="accomodation">Do you have accomodation booked for your trip?</label>';
  //questions.innerHTML += '<select id="accomodation" name="accomodation" required><option value="">--Choose an Option--</option><option value="yes">Yes</option><option value="no">No</option></select>';
  //questions.innerHTML += '<br>';
  // driving split
  //questions.innerHTML += '<label for="drivingSplit">Would you like to drive the same amount everyday?</label>';
  //questions.innerHTML += '<select id="drivingSplit" name="drivingSplit" required><option value="">--Choose an Option--</option><option value="yes">Yes</option><option value="no">No</option></select>';
  //questions.innerHTML += '<br>';
  // # of stops
  //questions.innerHTML += '<label for="stopType">How would you like to plan your stops during the road trip?</label>';
  //questions.innerHTML += '<select id="stopType" name="stopType" required> <option value="">--Choose an Option--</option> <option value="variable">A different number of stops each day.</option><option value="fixed"> The same number of stops every day</option><option value="total">A total number of stops in the whole trip</option></select>';
  //questions.innerHTML += '<br>';
  // submit button
  questions.innerHTML += '<button type="button" onclick="getRoadTripInfo()">submit!</button>';

}

function getRoadTripInfo() {
  const days = document.getElementById('days').value;
  const hours = document.getElementById('hours').value;
  const stops = document.getElementById('stops').value;
  //const accomodation = document.getElementById('accomodation').value;
  //const drivingSplit = document.getElementById('drivingSplit').value;
  //const stopType = document.getElementById('stopType').value;
  //askDetails();
}

function askDetails() {
  const questions = document.getElementById('questions');

  if (drivingSplit === 'yes') {
    questions.innerHTML += '<label for="fixedHours">How many hours would you like to drive each day?</label>';
    questions.innerHTML += '<input type="number" id="fixedHours" name="fixedHours" min="1" max="24" required>';
    questions.innerHTML += '<br>';
  } else {
    for (let i = 1; i <= days; i++) {
      questions.innerHTML += '<label for="dailyHours">How many hours would you like to drive on day ' + i + '?</label>';
      questions.innerHTML += '<input type="number" id="dailyHours" name="dailyHours" min="1" max="24" required>';
      questions.innerHTML += '<br>';
    }
  }
  if (stopType === 'variable') {
    for (let i = 1; i <= days; i++) {
      questions.innerHTML += '<label for="dailyStops">How many stops would you like to make on day ' + i + '?</label>';
      questions.innerHTML += '<input type="number" id="dailyStops" name="dailyStops" min="1" max="10" required>';
      questions.innerHTML += '<br>';
    }
  } else if (stopType === 'fixed') {
    questions.innerHTML += '<label for="fixedStops">How many stops would you like to make each day?</label>';
    questions.innerHTML += '<input type="number" id="fixedStops" name="fixedStops" min="1" max="10" required>';
    questions.innerHTML += '<br>';
  } else {
    questions.innerHTML += '<label for="totalStops">How many stops would you like to make in total?</label>';
    questions.innerHTML += '<input type="number" id="totalStops" name="totalStops" min="1" max="100" required>';
    questions.innerHTML += '<br>';
  }
  if (accomodation === 'yes') {
    for (let i = 1; i <= days - 1; i++) {
      questions.innerHTML += '<label for="bookedAccomodation">Where are you staying on day ' + i + '?</label>';
      questions.innerHTML += '<input type="text" id="bookedAccomodation" name="bookedAccomodation" required>';
      questions.innerHTML += '<br>';
    }
  }
  // submit button
  questions.innerHTML += '<button type="button" onclick="getDetails()">Submit!</button>';
}
function getDetails() {
  const hours = document.getElementById('hours').value;
  const stops = document.getElementById('stops').value;
  const bookedAccomodation = document.getElementById('bookedAccomodation').value;
}
*/
