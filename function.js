// Get a reference to the database
// script.js
import { db } from './firebase.js';
import { getDatabase, ref, set, get, child, update, remove, push } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const dbRef = ref(db);

get(dbRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data); // prints entire database
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data:", error);
  });

  get(dbRef).then(snapshot => {
    if(snapshot.exists()){
      const data = snapshot.val();
  
      // Access Class
      console.log('class')
      console.log(data.Class);
  
      // Access all Teachers
      console.log('teacher')
      console.log(data.Teacher);

  
      // Access events
      console.log('events')
      console.log(data.events);
    }
  });



document.getElementById('addScheduleButton').addEventListener('click', ()=> {
    try {
        const ClassName = document.getElementById('smallInput')?.value || '';
        const scheduleInputs = [];
    
        for (let i = 1; i <= 10; i++) {
            const inputElement = document.getElementById(`scheduleinput${i}`);
            if (inputElement) {
                const value = inputElement.value;
                scheduleInputs.push(value); // Collect values in an array to ensure they are used
            } else {
                console.warn(`Element with ID scheduleinput${i} not found.`);
            }
        }
    
        const daySelect = document.getElementById('daySelect')?.value || '';
    
        // Example usage of the collected data
        console.log('Class Name:', ClassName);
        console.log('Schedule Inputs:', scheduleInputs);
        console.log('Day Selected:', daySelect);
        addSchedule(ClassName,scheduleInputs, daySelect)
    } catch (error) {
        console.error('An error occurred:', error);
    }
})



function addSchedule(name, array, day) {
    const scheduleRef = ref(db, 'Schedule/');

    get(scheduleRef)
        .then((snapshot) => {
            const currentSchedule = snapshot.exists() ? snapshot.val() : {};
            const classSchedule = currentSchedule[name] || {};

            // Check if day already exists
            if (classSchedule[day]) {
                console.warn(`Day "${day}" already exists in ${name}'s schedule.`);
                return; // stop execution
            }

            // Check if the number of days exceeds 5
            if (Object.keys(classSchedule).length >= 5) {
                console.warn('Cannot add more than 5 days to the schedule.');
                return;
            }

            // Construct the new day's schedule
            const newDaySchedule = array.reduce((acc, value, index) => {
                acc[index + 1] = value;
                return acc;
            }, {});

            // Path to update only the specific class/day
            const dayRef = ref(db, `Schedule/${name}/${day}`);

            // Write only the new day's data
            update(dayRef, newDaySchedule)
                .then(() => {
                    console.log(`Day "${day}" added successfully to ${name}'s schedule!`);
                })
                .catch((error) => {
                    console.error('Error writing data:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching current schedule:', error);
        });
}
window.addSchedule = addSchedule;