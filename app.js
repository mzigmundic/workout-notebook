// Exercise Class
class Exercise {
    constructor(name, nsets, nreps, weight) {
        this.name = name;
        this.nsets = nsets;
        this.nreps = nreps;
        this.weight = weight;
    }
}


// UI Class
class UI {

    // Add Exercise To List
    addExerciseToList(exercise) {

        // Get tbody of table
        const list = document.getElementById('exercise-list');

        // Create tr element
        const row = document.createElement('tr');

        // Insert cols
        row.innerHTML = `
        <td>${exercise.name}</td>
        <td>${exercise.nsets}</td>
        <td>${exercise.nreps}</td>
        <td>${exercise.weight}</td>
        <td><i class="fas fa-minus-square"></i></td>
    `;

        // Add row to a table
        list.appendChild(row);
    }

    // Show Alert
    showAlert(message, className) {

        // Create div
        const div = document.createElement('div');

        // Add classes
        div.className = `alert ${className}`;

        // Add text
        div.appendChild(document.createTextNode(message));

        // Get parent
        const container = document.querySelector('.container');

        // Get form
        const form = document.querySelector('#exercise-form');

        // Insert alert
        container.insertBefore(div, form);

        // Timeout after 3 secs
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    // Delete exercise
    deleteExercise(target) {
        if (target.classList.contains('fa-minus-square')) {
            target.parentElement.parentElement.remove();
        }
    }

    // Clear Fields
    clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('nsets').value = '';
        document.getElementById('nreps').value = '';
        document.getElementById('weight').value = '';
    }
}


// Local Storage Class
class Store {

    // Get Exercises
    static getExercises() {
        let exercises;
        if (localStorage.getItem('exercises') === null) {
            exercises = [];
        } else {
            exercises = JSON.parse(localStorage.getItem('exercises'));
        }
        return exercises;
    }

    // Display Exercises
    static displayExercises() {
        const exercises = Store.getExercises();

        exercises.forEach(function(exercise) {
            const ui = new UI();

            // Add book to UI
            ui.addExerciseToList(exercise);
        });
    }

    // Add Exercise
    static addExercise(exercise) {
        const exercises = Store.getExercises();

        exercises.push(exercise);

        localStorage.setItem('exercises', JSON.stringify(exercises));
    }

    // Remove Exercise
    static removeExercise(name, nsets, nreps, weight) {
        const exercises = Store.getExercises();

        exercises.forEach(function(exercise, index) {
            if (exercise.name === name && exercise.nsets === nsets && exercise.nreps === nreps && exercise.weight === weight) {
                exercises.splice(index, 1);
            }
        });

        localStorage.setItem('exercises', JSON.stringify(exercises));
    }
}




// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayExercises);


// Event Listener for add exercise
document.getElementById('exercise-form').addEventListener('submit', function (e) {

    // Get Form Values
    const name = document.getElementById('name').value;
    const nsets = document.getElementById('nsets').value;
    const nreps = document.getElementById('nreps').value;
    const weight = document.getElementById('weight').value;

    // Instantiating Exercise
    const exercise = new Exercise(name, nsets, nreps, weight);

    // Instantiating UI
    const ui = new UI();

    // Validate
    if (name === '' || nsets === '' || nreps === '' || weight === '') {

        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {

        // Add exercise to list
        ui.addExerciseToList(exercise);

        // Add to local storage
        Store.addExercise(exercise);

        // Success alert
        ui.showAlert('Exercise Added!', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
});


// Event Listener for delete
document.getElementById('exercise-list').addEventListener('click', function (e) {

    // Instantiating UI
    const ui = new UI();

    // Delete exercise
    ui.deleteExercise(e.target);

    // Remove from local storage
    Store.removeExercise(
        e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
        e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
        e.target.parentElement.previousElementSibling.previousElementSibling.textContent,
        e.target.parentElement.previousElementSibling.textContent,
        );

    // Show Message
    ui.showAlert('Exercise removed', 'success');
});