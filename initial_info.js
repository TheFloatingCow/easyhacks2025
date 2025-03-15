function getTripInfo (){
    const tripType = document.getElementById('tripType').value;
    const tripLength = document.getElementById('tripLength').value;
    const startingLocation = document.getElementById('startingLocation').value;
    const destination = document.getElementById('destination').value;

    const questions = document.getElementById('questions');
    questions.innerHTML = ''; // Clear previous questions
    if (tripType === 'dayTrip') {
if (hoursDriven <= 5) {
const question1 = document.createElement('div');
question1.className = 'question';
question1.textContent = 'What activities would you like to do during your day trip?';
questionsContainer.appendChild(question1);
} else {
const question2 = document.createElement('div');
question2.className = 'question';
question2.textContent = 'Would you prefer a scenic route or a direct route for your day trip?';
questionsContainer.appendChild(question2);
}
  }
