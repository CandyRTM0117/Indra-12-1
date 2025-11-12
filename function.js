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
  
      // Access first teacher
      console.log('teacher')
      console.log(data.Teacher[0]);
  
      // Access first teacher's name
      console.log('teacher name')
      console.log(data.Teacher[0].Name);
  
      // Access events
      console.log('events')
      console.log(data.events);
    }
  });  