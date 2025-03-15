function getTripInfo() {
  const tripType = document.getElementById('tripType').value;
  const tripLength = document.getElementById('tripLength').value;
  const startingLocation = document.getElementById('startingLocation').value;
  const destination = document.getElementById('destination').value;

  const questions = document.getElementById('questions');
  questions.innerHTML = ''; // Clear previous questions
  if (tripType === 'dayTrip') {
    questions.innerHTML = '<h3>Day Trip</h3>';
    questions.innerHTML += '<label for="hours">How many hours would you like to drive?</label>';
    questions.innerHTML += '<input type="number" id="hours" name="dayTripHours" min="1" max="24" required>';
    questions.innerHTML += '<label for="stops">How many stops would you like to make?</label>';
    questions.innerHTML += '<input type="number" id="stops" name="dayTripStops" min="1" max="10" required>';
  }
  else {
    questions.innerHTML = '<h3>Road Trip</h3>';
    questions.innerHTML += '<label for="days">How many days would you like to travel?</label>';
    questions.innerHTML += '<input type="number" id="days" name="multiDayDays" min="1" max="30" required>';

  }
}
