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
  
      // Access Schedule
      console.log(data.Schedule);
  
      // Access all Teachers
      console.log(data.Teachers);

  
      // Access events
      console.log(data.Events);

      // Access Clubs
      console.log(data.Club);

      // Access cook
      console.log(data.Cook);
    }
  }
  );



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

            // Check if the number of days exceeds 5 (optional rule)
            if (!classSchedule[day] && Object.keys(classSchedule).length >= 5) {
                console.warn('Cannot add more than 5 days to the schedule.');
                return;
            }

            // Construct schedule structure — always override the day's content
            const updatedDaySchedule = array.reduce((acc, value, index) => {
                acc[`schedule${index + 1}`] = value || '';
                return acc;
            }, {});

            const newScheduleData = {
                ...classSchedule,
                [day]: updatedDaySchedule
            };

            // Update only the target class in the database
            const classRef = ref(db, `Schedule/${name}`);

            update(classRef, newScheduleData)
                .then(() => {
                    console.log(`Day "${day}" for ${name} updated successfully!`);
                })
                .catch((error) => {
                    console.error('Error writing data:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching current schedule:', error);
        });
}


const scheduleInput = document.getElementById('scheduleInput');

document.getElementById('removeScheduleButton').addEventListener('click', () => {
    const className = scheduleInput?.value?.trim();
    const daySelect = document.getElementById('daySelect')?.value?.trim();

    if (!className || !daySelect) {
        console.warn('Please provide both Class Name and Day to remove.');
        return;
    }

    removeSchedule(className, daySelect);
});

function removeSchedule(className, day) {
    const dayRef = ref(db, `Schedule/${className}/${day}`);

    // First check if the schedule day exists before removing
    get(dayRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.warn(`No schedule found for ${className} on "${day}".`);
                return;
            }

            // Remove the day
            remove(dayRef)
                .then(() => {
                    console.log(`Successfully removed "${day}" from ${className}'s schedule.`);
                })
                .catch((error) => {
                    console.error('Error removing schedule:', error);
                });
        })
        .catch((error) => {
            console.error('Error fetching schedule data:', error);
        });
}




document.getElementById('addClubButton').addEventListener('click', () => {
    const clubName = document.getElementById('clubExtraInput')?.value || '';
    const clubWhen = document.getElementById('clubWhen')?.value || '';
    const clubTeacher = document.getElementById('clubTeacher')?.value || '';
    const clubLab = document.getElementById('clubLab')?.value || '';
    const clubDuration = document.getElementById('clubDuration')?.value || '';
    const clubPurpose = document.getElementById('clubPurpose')?.value || '';
    const clubTarget = document.getElementById('clubTarget')?.value || '';
    addClub(clubName, clubWhen, clubTeacher, clubLab, clubDuration, clubPurpose, clubTarget);
},);

function addClub(name, when, teacher, lab, duration, purpose, target) {
    if (!name) {
        console.warn("Club name is required.");
        return;
    }

    const clubRef = ref(db, 'Club/');

    get(clubRef)
        .then((snapshot) => {
            const currentClubs = snapshot.exists() ? snapshot.val() : {};

            // Check if club already exists
            if (currentClubs[name]) {
                console.warn(`Club "${name}" already exists.`);
                return;
            }

            // Construct the new club entry exactly as your example
            const newClubData = {
                [name]: {
                    Name: name,
                    When: when,
                    Teacher: teacher,
                    Lab: lab,
                    Duration: duration,
                    Purpose: purpose,
                    Target: target
                }
            };

            // Write only this club’s data to the "Club" node
            update(clubRef, newClubData)
                .then(() => {
                    console.log(`Club "${name}" added successfully!`);
                })
                .catch((error) => {
                    console.error("Error adding club:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching club data:", error);
        });
}

const removeClubInput = document.getElementById('removeClubInput');

const removeClubButton = document.getElementById('removeClubButton').addEventListener('click', () => {
    removeClub(removeClubInput.value)
})

function removeClub(name) {
    if (!name) {
        console.warn("Please enter a club name to remove.");
        return;
    }

    const clubRef = ref(db, `Club/${name}`);

    // Check if the club exists before attempting to remove it
    get(clubRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.warn(`Club "${name}" does not exist.`);
                return;
            }

            // Remove the club
            remove(clubRef)
                .then(() => {
                    console.log(`Club "${name}" removed successfully.`);
                })
                .catch((error) => {
                    console.error("Error removing club:", error);
                });
        })
        .catch((error) => {
            console.error("Error checking club existence:", error);
        });
}

document.getElementById('addTeacherButton').addEventListener('click', () => {
    const teacherName = document.getElementById('teacherName')?.value || '';
    const teacherSubject = document.getElementById('teacherSubject')?.value || '';
    const teacherImageUrl = document.getElementById('teacherImageUrl')?.value || '';
    const teacherAdditionalInput = document.getElementById('teacherAdditionalInput')?.value || '';
     addTeacher(teacherName, teacherSubject, teacherImageUrl, teacherAdditionalInput);
})

function addTeacher(name, subject, imageUrl, additionalInput) {
    if (!additionalInput) {
        console.warn("Additional input (key) is required to add a teacher.");
        return;
    }

    const teachersRef = ref(db, 'Teachers/');

    get(teachersRef)
        .then((snapshot) => {
            const currentTeachers = snapshot.exists() ? snapshot.val() : {};

            // Check if a teacher with the same key already exists
            if (currentTeachers[additionalInput]) {
                console.warn(`Teacher with key "${additionalInput}" already exists.`);
                return;
            }

            // Construct the teacher data
            const newTeacherData = {
                [additionalInput]: {
                    Name: name,
                    Subject: subject,
                    Url: imageUrl
                }
            };

            // Write to database under Teachers/
            update(teachersRef, newTeacherData)
                .then(() => {
                    console.log(`Teacher "${name}" added successfully under key "${additionalInput}"!`);
                })
                .catch((error) => {
                    console.error("Error adding teacher:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching teachers data:", error);
        });
}

const removeTeacherInput = document.getElementById('removeTeacherInput');
document.getElementById('removeTeacherButton').addEventListener('click', ()=>{ 
    removeTeacher(removeTeacherInput.value)
})

function removeTeacher(key) {
    if (!key) {
        console.warn("Please enter a teacher key (Additional Input) to remove.");
        return;
    }

    const teacherRef = ref(db, `Teachers/${key}`);

    // Check if the teacher exists before removing
    get(teacherRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.warn(`Teacher with key "${key}" does not exist.`);
                return;
            }

            // Remove the teacher
            remove(teacherRef)
                .then(() => {
                    console.log(`Teacher with key "${key}" removed successfully.`);
                })
                .catch((error) => {
                    console.error("Error removing teacher:", error);
                });
        })
        .catch((error) => {
            console.error("Error checking teacher existence:", error);
        });
}

document.getElementById('addEventButton').addEventListener('click', () => {
    const eventTitle = document.getElementById('eventTitle')?.value || '';
    const eventDate = document.getElementById('eventDate')?.value || '';
    const eventSubtitle = document.getElementById('eventSubtitle')?.value || '';
    const eventImageUrl = document.getElementById('eventImage')?.value || '';
    addEvent(eventTitle, eventDate, eventSubtitle, eventImageUrl);
})

function addEvent(title, date, sub, image) {
    if (!title) {
        console.warn("Event title is required.");
        return;
    }

    const eventRef = ref(db, 'Event/');

    get(eventRef)
        .then((snapshot) => {
            const currentEvents = snapshot.exists() ? snapshot.val() : {};

            // Check if the event already exists
            if (currentEvents[title]) {
                console.warn(`Event "${title}" already exists.`);
                return;
            }

            // Build the new event structure
            const newEventData = {
                [title]: {
                    Title: title,
                    Sub: sub,
                    Date: date,
                    imageUrl: image
                }
            };

            // Write the new event data
            update(eventRef, newEventData)
                .then(() => {
                    console.log(`Event "${title}" added successfully!`);
                })
                .catch((error) => {
                    console.error("Error adding event:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching events:", error);
        });
}

const removeEventInput = document.getElementById('removeTargetInput');
document.getElementById('removeEventButton').addEventListener('click', () => {
    removeEvent(removeEventInput.value)
},)

function removeEvent(title) {
    if (!title) {
        console.warn("Please enter an event title to remove.");
        return;
    }

    const eventRef = ref(db, `Event/${title}`);

    // Check if the event exists before removing it
    get(eventRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.warn(`Event "${title}" does not exist.`);
                return;
            }

            // Remove the event
            remove(eventRef)
                .then(() => {
                    console.log(`Event "${title}" removed successfully.`);
                })
                .catch((error) => {
                    console.error("Error removing event:", error);
                });
        })
        .catch((error) => {
            console.error("Error checking event existence:", error);
        });
}

document.getElementById('addFoodButton').addEventListener('click', ()=>{

    const FoodDay = document.getElementById('foodDay')?.value || '';
    const FoodMenu = document.getElementById('foodMenu')?.value || '';
    addFood(FoodDay, FoodMenu);
})
function addFood(day, menu) {
    if (!day) {
        console.warn("Please enter a day.");
        return;
    }

    // Allowed days
    const allowedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    if (!allowedDays.includes(day)) {
        console.warn(`"${day}" is not allowed. Only Monday to Friday can be added.`);
        return;
    }

    const foodRef = ref(db, 'Food/');

    get(foodRef)
        .then((snapshot) => {
            const currentFood = snapshot.exists() ? snapshot.val() : {};

            // Check if total number of days exceeds 5 (only count unique new days)
            const isNewDay = !currentFood[day];
            if (isNewDay && Object.keys(currentFood).length >= 5) {
                console.warn("Cannot add more than 5 days. Only Monday to Friday allowed.");
                return;
            }

            // Construct the new day's menu (overwrites if exists)
            const newFoodData = {
                [day]: {
                    Day: day,
                    Menu: menu
                }
            };

            // Write/update this day's food
            update(foodRef, newFoodData)
                .then(() => {
                    if (isNewDay) {
                        console.log(`Food for "${day}" added successfully!`);
                    } else {
                        console.log(`Food for "${day}" updated successfully!`);
                    }
                    // Clear input fields
                    document.getElementById('foodDay').value = '';
                    document.getElementById('foodMenu').value = '';
                })
                .catch((error) => {
                    console.error("Error adding/updating food:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching current food data:", error);
        });
}

const removeinput = document.getElementById('removeFoodInput');
const removeFoodButton = document.getElementById('removeFoodButton').addEventListener('click', ()=>{
    removeFood(removeinput.value)
})
function removeFood(day) {
    if (!day) {
        console.warn("Please enter a day to remove.");
        return;
    }

    const dayRef = ref(db, `Food/${day}`);

    get(dayRef)
        .then((snapshot) => {
            if (!snapshot.exists()) {
                console.warn(`No food entry found for "${day}".`);
                return;
            }

            // Remove the day's food
            remove(dayRef)
                .then(() => {
                    console.log(`Food for "${day}" removed successfully.`);
                    // Optionally, clear input
                    document.getElementById('removeFoodInput').value = '';
                })
                .catch((error) => {
                    console.error("Error removing food:", error);
                });
        })
        .catch((error) => {
            console.error("Error checking food data:", error);
        });
}