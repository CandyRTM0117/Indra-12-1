// --- Stunning Glassy Slider Functionality ---
document.addEventListener('DOMContentLoaded', function () {
    // Slider logic for welcomeNews
    const slider = document.getElementById('welcomeNewsSlider');
    if (slider) {
        const items = slider.querySelectorAll('.slider-item');
        let current = 0;
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        function showSlide(idx) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === idx);
            });
        }
        function nextSlide() {
            current = (current + 1) % items.length;
            showSlide(current);
        }
        function prevSlide() {
            current = (current - 1 + items.length) % items.length;
            showSlide(current);
        }
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
        }
        // Auto-slide every 6 seconds
        setInterval(nextSlide, 6000);
        showSlide(current);
    }

    // Add animated gradient background if not present
    if (!document.querySelector('.animated-gradient-bg')) {
        const bg = document.createElement('div');
        bg.className = 'animated-gradient-bg';
        document.body.prepend(bg);
    }
});
// Get a reference to the database
// script.js
import { db } from './firebase.js';
import { getDatabase, ref, set, get, child, update, remove, push } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

let i
const dbRef = ref(db);
let database = null


async function loadDatabaseAndRun() {
    // SHOW LOADING
    document.getElementById("loadingScreen").style.display = "flex";
  
    try {
        const snapshot = await get(dbRef);
  
        if (!snapshot.exists()) {
            console.log("No data available");
            return;
        }
  
        const data = snapshot.val();
        database = data;
  
        // RUN USER CODE
        runRestOfCode(data);
  
    } catch (error) {
        console.error("Error reading data:", error);
  
    } finally {
        // HIDE LOADING
        document.getElementById("loadingScreen").style.display = "none";
    }
  }



function runRestOfCode(data){

    const classes = Object.keys(data.Schedule)
    const scheduleData = data.Schedule;







let prevnum = []
// console.log(analytics)

// State
let currentSection = 'main';
let sidebarOpen = false;
let selectedClass = '';
let selectedClubType = 'Бүгд';
let carouselIndex = 0;

const userData = [
        {
            mail : 'luvsandamba@gmail.com',
            username : 'luvsandamba1',
            password:  'candy2323'
        },
        {
            mail : 'luvsandamba2@gmail.com',
            username : 'luvsandamba2',
            password:  'candy2323'
        },
        {
            mail : 'luvsandamba3@gmail.com',
            username : 'luvsandamba3',
            password:  'candy2323'
        }
]
const teacherData = [
        {   
            mail : '',
            username : 'admin123',
            password : 'adminpass'
        },
]

const clubTypes = ['Бүгд', 'Спорт', 'Урлаг', 'Технологи', 'Шинжлэх ухаан'];

const clubs = [
    { name: 'Роботын клуб', type: 'Технологи', day: 'Даваа, Лхагва', time: '15:00-17:00', teacher: 'Г.Ганбаатар', room: 'Lab-1' },
    { name: 'Програмчлалын клуб', type: 'Технологи', day: 'Мягмар, Пүрэв', time: '15:00-17:00', teacher: 'Д.Дорж', room: 'Lab-2' },
    { name: 'Хөгжим', type: 'Урлаг', day: 'Даваа, Баасан', time: '14:00-16:00', teacher: 'Т.Тэмүүлэн', room: 'Хөгжмийн өрөө' },
    { name: 'Зураг', type: 'Урлаг', day: 'Мягмар', time: '15:00-17:00', teacher: 'Э.Энхтуяа', room: '105' },
    { name: 'Сагсан бөмбөг', type: 'Спорт', day: 'Лхагва, Баасан', time: '16:00-18:00', teacher: 'Б.Батбаяр', room: 'Спортын заал' },
    { name: 'Хөл бөмбөг', type: 'Спорт', day: 'Мягмар, Пүрэв', time: '16:00-18:00', teacher: 'Д.Дашдорж', room: 'Спортын талбай' },
    { name: 'Шахматын клуб', type: 'Шинжлэх ухаан', day: 'Даваа, Лхагва', time: '14:00-16:00', teacher: 'С.Сүхбат', room: '303' },
    { name: 'AI & Датанаас', type: 'Технологи', day: 'Пүрэв', time: '15:00-17:00', teacher: 'Ц.Цэцэг', room: 'Lab-3' },
    { name: 'Физикийн туршилт', type: 'Шинжлэх ухаан', day: 'Мягмар', time: '15:00-17:00', teacher: 'Ж.Жавхлан', room: '305' },
    { name: 'Бүжиг', type: 'Урлаг', day: 'Баасан', time: '15:00-17:00', teacher: 'М.Мөнхбат', room: 'Бүжгийн танхим' },
];

const availableSlots = [
    { day: 'Даваа', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    { day: 'Мягмар', slots: ['09:00', '10:00', '13:00', '14:00', '15:00'] },
    { day: 'Лхагва', slots: ['09:00', '11:00', '13:00', '15:00'] },
    { day: 'Пүрэв', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { day: 'Баасан', slots: ['09:00', '10:00', '13:00', '14:00'] },
];

const bookedSlots = ['Даваа 10:00', 'Мягмар 09:00', 'Пүрэв 14:00'];

const rules = [
    {
        category: 'Ерөнхий дүрэм',
        items: [
            'Өглөө 7:50 хүртэл сургуульд ирнэ',
            'Дүрэмт хувцас өмсөнө',
            'Багш, ажилтнуудыг хүндэтгэнэ',
            'Сургуулийн эд хөрөнгийг бүү эвдэнэ'
        ]
    },
    {
        category: 'Хичээлийн дүрэм',
        items: [
            'Хичээлд цагтаа ирнэ',
            'Даалгавраа хугацаандаа хийж өгнө',
            'Хичээлд анхаарал тавьж сууна',
            'Утас, тоглоом ашиглахгүй'
        ]
    },
    {
        category: 'Харилцааны дүрэм',
        items: [
            'Найрсаг, хүндэтгэлтэй байна',
            'Бусдыг доромжлохгүй',
            'Буулимах, хүчирхийлэл үл хийнэ',
            'Хамт олноо дэмжинэ'
        ]
    },
    {
        category: 'Аюулгүй байдал',
        items: [
            'Сургуулийн талбайг зөвшөөрөлгүй орхихгүй',
            'Яаралтай тохиолдолд багш эсвэл ажилтанд мэдэгдэнэ',
            'Аюултай зүйл олбол шууд мэдэгдэнэ',
            'Гал түймрийн дадлага хийхэд оролцоно'
        ]
    }
];

const prohibited = [
    'Тамхи татах',
    'Архи согтууруулах ундаа',
    'Зэмт зүйл',
    'Хутга, сэлэм гэх мэт аюултай зүйл',
    'Хүчирхийлэл, буулимах'
];

const events = [
    {
        title: 'Роботын уралдаан 2025',
        date: '2025-11-09',
        time: '10:00',
        location: 'Спортын заал',
        description: 'Дотоод роботын уралдаан. 12 баг оролцоно.',
        type: 'Уралдаан',
        color: 'linear-gradient(135deg, #ea580c, #f59e0b)'
    },
    {
        title: 'Эцэг эхийн хурал',
        date: '2025-11-15',
        time: '18:00',
        location: 'Их танхим',
        description: 'Сарын эцэг эхийн хурал. Сурагчдын ахиц, төлөвлөгөөг хэлэлцэнэ.',
        type: 'Хурал',
        color: 'linear-gradient(135deg, #3b82f6, #06b6d4)'
    },
    {
        title: 'Улирлын шалгалт',
        date: '2025-11-20',
        time: '08:00',
        location: 'Бүх анги',
        description: 'Намрын улирлын эцсийн шалгалт эхэлнэ.',
        type: 'Шалгалт',
        color: 'linear-gradient(135deg, #dc2626, #ec4899)'
    },
    {
        title: 'Программчлалын хакатон',
        date: '2025-11-23',
        time: '09:00',
        location: 'Lab 1-3',
        description: '48 цагийн хакатон. Багаар оролцох боломжтой.',
        type: 'Арга хэмжээ',
        color: 'linear-gradient(135deg, #9333ea, #4f46e5)'
    }
];

const news = [
    {
        title: 'Олон улсын олимпиадаас амжилттай оролцлоо',
        date: '2025-11-05',
        content: 'Манай сургуулийн сурагч Б.Бат програмчлалын олон улсын олимпиадаас мөнгөн медаль хүртлээ. Тэрээр Python хэл ашиглан 5 бодлогыг шийдэж, дэлхийн 200 гаруй оролцогчдын дунд 15-р байр эзэллээ.'
    },
    {
        title: 'Шинэ технологи танхим нээгдлээ',
        date: '2025-11-03',
        content: 'AI болон Machine Learning сургах шинэ лаборатори нээгдлээ. Танхимд орчин үеийн компьютер, VR багаж, 3D принтер зэрэг хамгийн сүүлийн үеийн технологи бүхий тоног төхөөрөмж суурилуулагдсан.'
    },
    {
        title: 'Сурагчдын төсөл амжилттай хэрэгжлээ',
        date: '2025-11-01',
        content: '11-р ангийн сурагчид сургуулийн цахим сан бүтээж, 5000 гаруй номыг системд оруулав. Энэхүү систем нь QR код ашигладаг бөгөөд ном хайх, захиалах боломжтой.'
    }
];

// DOM Elements
const mainContent = document.getElementById('mainContent');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const homeBtn = document.getElementById('homeBtn');
const navItems = document.querySelectorAll('.nav-item');




const headerline = document.getElementById("header-line")

let time = 0;
let loopvalue = 0;
let maxseconds = 15;
let timer = null; // store interval ID




let isRunning = false; // track state



let isPaused = false;
let isPausedatStart = 0;

// Get elements
const button = document.getElementById('playPauseBtn');
const icon = document.getElementById('buttonIcon');


function pauseToggle (){
    if(isPausedatStart === 0){
        toggleTimer(isPaused)
        updateSliderPlayPauseUI(false)
    }
    isPausedatStart = 1
}


function toggleTimer(num){
    console.log(num + ' - inside toggletimer')
    if(num === true){
        clearInterval(timer)
    }else {
    if ( isPaused === false ) {
        timer = setInterval(() => {
            let percentage = (time / maxseconds) * 100;
            let percentages = percentage;
            headerline.style.background = `conic-gradient(from 0deg, white 0% ${percentages}%, transparent ${percentages}% 100%)`;
            time += 0.01; // add 0.01 second
    
            if (time >= 15.00) {
                time = 0;
                loopvalue += 1;
    
                if (loopvalue >= 8) {
                    loopvalue = 1;
                }
    
                // remove 'active' from all
                const sections = [
                    'mainDashboard', 'scheduleView', 'clubsView',
                    'psychologistView', 'foodView', 'rulesView', 'eventsView', 'teacherView'
                ];
                sections.forEach(id => document.getElementById(id).classList.remove('active'));
    
                // add 'active' to the right one
                const activeMap = {
                    1: 'scheduleView',
                    2: 'clubsView',
                    3: 'psychologistView',
                    4: 'foodView',
                    5: 'rulesView',
                    6: 'eventsView',
                    7: 'mainDashboard',
                    8: 'teacherView'
                };
                console.log(loopvalue)
                document.getElementById(activeMap[loopvalue]).classList.add('active');
            }
    }, 10); // 10ms = 0.01s
    }else {
        clearInterval(timer)
    }
    }
}


// Slider auto-play control and timer - sync with main timer
const sliderPlayPauseBtn = document.getElementById('sliderPlayPauseBtn');

function updateSliderPlayPauseUI(boolean){
    if(boolean === false){
        sliderPlayPauseBtn.textContent = '⏸';
        sliderPlayPauseBtn.title = 'Pause auto-slide';
    }else {
    if (sliderPlayPauseBtn) {
        console.log(isPaused + ' - inside slider')
        sliderPlayPauseBtn.textContent = isPaused ? '⏸' : '▶';
        sliderPlayPauseBtn.title = isPaused ? 'Pause auto-slide' : 'Play auto-slide';
    }
}
}

sliderPlayPauseBtn && sliderPlayPauseBtn.addEventListener('click', () => {
    updateSliderPlayPauseUI();
    isPaused = !isPaused;
    toggleTimer(isPaused); // Pass true to stop, false to start
});





// Toggle function
function togglePlayPause() {
    isPaused = !isPaused;
    toggleTimer(isPaused);     // stop or start timer
    updateSliderPlayPauseUI(); // update icon
  }
  

// Add event listener
button.addEventListener('click', togglePlayPause);
























// Initialize
function init() {
    pauseToggle();
    renderClassSchedule();
    renderClubs();
    renderPsychologistSlots();
    renderFoodMenu();
    renderRules();
    renderEvents();
    // populate welcome news widgets
    renderLatestNews();
    renderTeachers();
    startCarousel();
    updateEventTime();


    // Event listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    homeBtn.addEventListener('click', goHome);
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.getAttribute('data-section');
            console.log(section)
            switchSection(section);
        });
    });
}
















// Sidebar functions
function toggleSidebar(open) {
    if (open) {
        sidebarOpen = !sidebarOpen;
    } else {
        sidebarOpen = open;
    }
    
    if (sidebarOpen) {
        sidebar.classList.add('open');
        mainContent.classList.add('sidebar-open');
        sidebarToggle.classList.add('sidebar-open');
    } else {
        sidebar.classList.remove('open');
        mainContent.classList.remove('sidebar-open');
        sidebarToggle.classList.remove('sidebar-open');
    }
}

function switchSection(section) {
    if ( section === 'dashboard' || section === '' ){
        loopvalue = 1; // mainDashboard is at index 1 now
    }else if ( section === 'schedule'){
        loopvalue = 2;
    }else if ( section === 'clubs' ){
        loopvalue = 3;
    }else if ( section === 'psychologist' ){
        loopvalue = 4;
    }else if ( section === 'food' ){
        loopvalue = 5;
    }else if ( section === 'rules' ){
        loopvalue = 6;
    }else if ( section === 'events' ){
        loopvalue = 7;
    }else if ( section === 'teachers'){
        loopvalue = 8;
    }
    console.log(loopvalue)
    currentSection = section;
    
    
    // Hide all sections
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected section
    const sectionMap = {
        'main': 'mainDashboard',
        'schedule': 'scheduleView',
        'clubs': 'clubsView',
        'psychologist': 'psychologistView',
        'food': 'foodView',
        'rules': 'rulesView',
        'events': 'eventsView',
        'teachers': 'teacherView'
    };
    
    const viewId = sectionMap[section];
    // console.log(section)
    // console.log(viewId)
    if (viewId) {   
        document.getElementById(viewId).classList.add('active');
    }
    toggleSidebar(false);
}


















function goHome() {
    loopvalue = 7
    currentSection = 'main';
    
    // Hide all sections
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show main dashboard
    document.getElementById('mainDashboard').classList.add('active');
    
    // Clear nav items
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    toggleSidebar(false);
}

// Carousel
function startCarousel() {
    setInterval(() => {
        carouselIndex = (carouselIndex + 1) % 3;
        updateCarousel();
    }, 10000);
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        if (index === carouselIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    indicators.forEach((indicator, index) => {
        if (index === carouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}
























let classSelected = false



// Class Schedule
function renderClassSchedule() {
    const classFilter = document.getElementById('classFilter');
    const scheduleList = document.getElementById('scheduleList');
    // Render class filter buttons
    classFilter.innerHTML = classes.map(cls => `
        <button id="classchange" class="class-btn ${cls === selectedClass ? 'active' : ''}" onclick="selectClass('${cls}')">
            ${cls}
        </button>
    `).join('');
    
    // Render schedule
    updateSchedule();
}

function updateSchedule( day, num) {
    if(classSelected === true){
        prevnum.push(num)
    if(prevnum.length == 3){
        prevnum.shift()
    }
    let activeadd = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
    }
    let prevday = activeadd[prevnum[0]]
    let curday = activeadd[prevnum[1]]
    if(!prevday && curday){
        document.getElementById('Monday').classList.remove('active')
        document.getElementById(curday).classList.add('active')
    }else if(prevday && curday){
        document.getElementById(prevday).classList.remove('active')
        document.getElementById(curday).classList.add('active')

    }
    let days = day || 'Monday'
    const scheduleLists = document.getElementById('scheduleLists');
    const schedule = scheduleData[selectedClass];
    const scheduleday = schedule[days]

    scheduleLists.innerHTML = ''

    const times = {
        1: '08:00-08:40',
        2: '08:45-09:25',
        3: '09:40-10:20',
        4: '10:25-11:05',
        5: '11:10-11:50',
        6: '11:50-12:30',
        7: '13:20-14:00',
        8: '14:05-14:45',
        9: '14:50-15:30',
        10: '15:35-16:15'
      };
    for( let i = 1; i <= 10; i++){
        if (!scheduleday[i]) continue;

        // Create an HTML block for each time slot
        scheduleLists.innerHTML += `
            <div class="schedule-item">
            <div class="time-badge">${times[i]}</div>
            <div class="subject-info">
                <h3 id="subject-text">${scheduleday[i]}</h3>
            </div>
            <div class="period-badge">${i}-р цаг</div>
        </div>
        `
    }
    }
}

function selectClass(cls) {
    selectedClass = cls;
    classSelected = true
    updateSchedule('Monday','0')
    console.log(selectedClass)
    document.getElementById('scheduleLists').classList.remove('none')
    document.getElementById('weekDays').classList.remove('none')
    document.getElementById('schedulewarning').classList.add('none')
    toggleTimer(true)
    updateSliderPlayPauseUI(true)
    renderClassSchedule();
}


function renderTeachers() {
    const teacherList = document.getElementById('teacherListsdata');
    const filteredTeachers = data.Teachers;
    const length = Object.keys(filteredTeachers).length;
    teacherList.innerHTML = ''; // clear container before adding

    for (let i = 0; i < length; i++) {
        let dataeach = filteredTeachers[Object.keys(filteredTeachers)[i]];
        teacherList.innerHTML += `
        <div class="teacher-card">
            <img src="${dataeach.Url}" alt="${dataeach.Name}">
            <h3>${dataeach.Name}</h3>
            <p>${dataeach.Subject}</p>
        </div>
        `;
    }

    updateTeacher();
    enableTeacherZoom();
}

function enableTeacherZoom() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.teacher-card img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
}

// Call this after DOM is ready
document.addEventListener('DOMContentLoaded', renderTeachers);


function updateTeacher() {
}






// Clubs
function renderClubs() {
    const clubsList = document.getElementById('clubsList');
    
    
    updateClubs();
}








function selectClubType(type) {
    selectedClubType = type;
    renderClubs();
}












function updateClubs() {
    const clubsList = document.getElementById('clubsList');
    const filteredClubs = data.Club;
    clubsList.innerHTML = ''; // clear previous content

    Object.keys(filteredClubs).forEach((key, i) => {
        const club = filteredClubs[key];
        clubsList.innerHTML += `
            <div class="club-card">
                <img src="${club.url}" alt="${club.Name}" data-index="${i}">
                <div class="club-header">
                    <h3 class="club-name">${club.Name} <br>  ${club.Grade}-р анги</h3>
                </div>
            </div>
        `;
    });

    enableClubLightbox();
}

function enableClubLightbox() {
    const lightbox = document.getElementById('clubLightbox');
    const lightboxImg = document.getElementById('clubLightboxImg');

    document.querySelectorAll('.club-card img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src; // show clicked image
            lightbox.classList.add('active');
        });
    });

    // Close when clicking anywhere
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
}

// Initialize
document.addEventListener('DOMContentLoaded', updateClubs);







// Psychologist
function renderPsychologistSlots() {
    const slotsContainer = document.getElementById('availableSlots');
    
    slotsContainer.innerHTML = `
        <h3>Нээлттэй цагууд</h3>
        ${availableSlots.map(schedule => `
            <div class="day-schedule">
                <h4 class="day-title">${schedule.day} гараг</h4>
                <div class="slots-grid">
                    ${schedule.slots.map(slot => {
                        const isBooked = bookedSlots.includes(`${schedule.day} ${slot}`);
                        return `
                            <div class="slot ${isBooked ? 'booked' : 'available'}">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div class="slot-time">${slot}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('')}
    `;
}
















// Food Menu
function renderFoodMenu() {
    const menuContainer = document.getElementById('weeklyMenu');
    const foodMenu = data.Food;

    const days = {
        'Monday': 'Даваа',
        'Tuesday': 'Мягмар',
        'Wednesday': 'Лхагва',
        'Thursday': 'Пүрэв',
        'Friday': 'Баасан'
    };

    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    menuContainer.innerHTML = ''; // clear previous content

    dayOrder.forEach(day => {
        const menuEach = foodMenu[day]; // get the menu for this day
        if (!menuEach) return; // skip if no data

        menuContainer.innerHTML += `
        <div class="menu-day">
            <div class="menu-day-header">
                <h3 class="day-name">${days[menuEach.Day]} гараг</h3>
                <div class="calories-badge">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    </svg>
                    <span>1500 Kcal</span>
                </div>
            </div>
            <div class="meals-grid">
                <div class="meal-item lunch">
                    <p class="meal-description">${menuEach.Menu}</p>
                </div>
            </div>
        </div>`;
    });
}















// Student Rules
function renderRules() {
    const rulesGrid = document.getElementById('rulesGrid');
    const prohibitedList = document.getElementById('prohibitedList');
    
    rulesGrid.innerHTML = rules.map(section => `
        <div class="rule-category">
            <h3>${section.category}</h3>
            <ul class="rule-list">
                ${section.items.map(item => `
                    <li class="rule-item">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>${item}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
    
    prohibitedList.innerHTML = prohibited.map(item => `
        <div class="prohibited-item">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <span>${item}</span>
        </div>
    `).join('');
}














// Events & News
function renderEvents() {
    const newsContainer = document.getElementById('latestNews');
    const eventsContainer = document.getElementById('upcomingEvents');
    eventsContainer.innerHTML = ''; // clear container before rendering

    const events = data.Event;

    // Convert object to array
    const eventsArray = Object.values(events);

    // Separate events without dates and with dates
    const noDate = eventsArray.filter(event => !event.Date);
    const withDate = eventsArray.filter(event => event.Date);

    // Sort events with dates in reverse chronological order (latest first)
    withDate.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // Combine no-date events first, then dated events
    const finalEvents = [...noDate, ...withDate];

    // Render events
    finalEvents.forEach(eventsupd => {
        // Generate dark RGB color
        const r = Math.floor(Math.random() * 70) + 180; // 130–200
        const g = Math.floor(Math.random() * 70) + 180;
        const b = Math.floor(Math.random() * 70) + 180;
        
        const rgb = `rgb(${r}, ${g}, ${b})`;

        const imgsrc = eventsupd.imageUrl;

        eventsContainer.innerHTML += `
            <div class="event-card">
                <div class="event-header">
                    <div class="event-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                    </div>
                </div>
                <h3 class="event-title">${eventsupd.Title}</h3>
                <div class="event-details">
                    <p>📅 ${eventsupd.Date || 'TBD'}</p>
                    <div>
                        <img src="${imgsrc}" alt="" class="eventimg">
                    </div>
                    <p style="padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.2)">
                        ${eventsupd.Sub}
                    </p>
                </div>
            </div>
        `;
    });
}

// Render latest news into the compact welcome widget
function renderLatestNews() {
    const container = document.getElementById('welcomeNewsList');
    if (!container) return;

    try {
        // Ensure `news` array exists in this script
        if (!Array.isArray(news) || news.length === 0) {
            container.innerHTML = '<div class="news-empty">Мэдээ олдсонгүй</div>';
            return;
        }

        // Sort by date descending (newest first)
        const sorted = news.slice().sort((a,b) => new Date(b.date) - new Date(a.date));
        const maxItems = 3;
        const items = sorted.slice(0, maxItems);

        container.innerHTML = items.map(item => {
            const excerpt = item.content.length > 110 ? item.content.slice(0,110).trim() + '…' : item.content;
            return `
                <div class="news-item-compact" data-title="${escapeHtml(item.title)}">
                    <div class="news-body">
                        <div class="news-title">${escapeHtml(item.title)}</div>
                        <div class="news-meta">${item.date}</div>
                        <div class="news-excerpt">${escapeHtml(excerpt)}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach click handlers to open news/events page
        container.querySelectorAll('.news-item-compact').forEach(el => {
            el.addEventListener('click', () => {
                // Navigate to events/news section
                switchSection('events');
            });
        });
    } catch (e) {
        console.error('renderLatestNews error', e);
    }
}

// small helper: escape HTML to avoid injection when inserting titles/content
function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}















function updateEventTime() {
    const updateTimeEl = document.getElementById('updateTime');
    const nextUpdateEl = document.getElementById('nextUpdate');
    
    function update() {
        const now = new Date();
        const next = new Date(now.getTime() + 60000);
        
        if (updateTimeEl) {
            updateTimeEl.textContent = `Шинэчлэгдсэн: ${now.toLocaleString('mn-MN')}`;
        }
        
        if (nextUpdateEl) {
            nextUpdateEl.textContent = next.toLocaleTimeString('mn-MN');
        }
    }
    
    update();
    setInterval(update, 60000);
}

// Start the application
init();


const login = document.getElementById("loginuser")
const userView = document.getElementById('userView')


login.addEventListener('click', ()=> { 
   toggleTimer(true)
   updateSliderPlayPauseUI(true)
   const Map = {
    1: 'scheduleView',
    2: 'clubsView',
    3: 'psychologistView',
    4: 'foodView',
    5: 'rulesView',
    6: 'eventsView',
    7: 'mainDashboard',
    8: 'teacherView'
    };
    
    for( let i = 1; i <= 8 ; i++){
        let a = document.getElementById(Map[i]).classList
        if(a.length == 2){
            a.remove('active')
            userView.classList.add('active')
        }
    }
    toggleSidebar(false)
})


const parent = document.getElementById('parent')
let parentactive = true
let teacheractive = false
const teacher = document.getElementById('teacher')
const loginbar = document.getElementById('loginbar')
parent.addEventListener('click', ()=>{
    parentactive = true
    teacheractive = false
    chooseactive()
    
})
teacher.addEventListener('click', ()=>{
    parentactive = false
    teacheractive = true
    chooseactive()
})

if(parentactive == true){
    chooseactive()
}
document.getElementById('loginuser').addEventListener('click', ()=> {
    if(document.getElementById('loginuser').innerText == 'Хэрэглэгчээс гарах'){
        displaygrade(false)
        parentactive = true
        teacheractive = false
        inputbar.value = ''
        passbar.value = ''
        document.getElementById('loginuser').innerText = 'Нэвтрэх / Бүртгүүлэх'
        }
    }
)

function chooseactive () {
    if(parentactive){
        parent.style.color = '#06b6d4'
        parent.style.fontSize = '21px' 
    }else{
        parent.style.color = '#fff'
        parent.style.fontSize = '20px' 
    }
    if(teacheractive){
        teacher.style.color = '#06b6d4'
        teacher.style.fontSize = '21px' 
    }else{
        teacher.style.color = '#fff'
        teacher.style.fontSize = '20px' 
    }
}

// --- Profile menu, dark-mode toggle, and teacher-admin helper ---
const profileBtn = document.getElementById('profileBtn');
const profileMenu = document.getElementById('profileMenu');
const adminLink = document.getElementById('adminLink');
const logoutBtn = document.getElementById('logoutBtn');
const profileView = document.getElementById('profileView');

function isTeacher() {
    return localStorage.getItem('userRole') === 'teacher';
}

function updateProfileMenu() {
    if (!profileMenu) return;
    // show admin link only for teacher
    if (isTeacher()) {
        adminLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
    }
}

profileBtn && profileBtn.addEventListener('click', (e)=>{
    if(!profileMenu) return;
    const isHidden = profileMenu.classList.contains('none');
    document.querySelectorAll('.profile-menu').forEach(el=>el.classList.add('none'));
    if(isHidden) profileMenu.classList.remove('none');
    else profileMenu.classList.add('none');
});

// Click handlers
adminLink && adminLink.addEventListener('click', ()=>{
    // If teacher, open admin panel, else prompt
    if(isTeacher()){
        document.getElementById('adminpanel').classList.remove('none');
        document.getElementById('adminpanel').scrollIntoView({behavior:'smooth'});
    } else {
        alert('Танд админ эрх байхгүй байна. Нэвтэрч орно уу.');
    }
    profileMenu.classList.add('none');
});

logoutBtn && logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('userRole');
    document.getElementById('loginuser').innerText = 'Нэвтрэх / Бүртгүүлэх';
    updateProfileMenu();
    profileMenu.classList.add('none');
});

profileView && profileView.addEventListener('click', ()=>{
    alert('Профайл үзэх (таны функц энд байршина)');
    profileMenu.classList.add('none');
});

// Dark mode is permanent - no light mode option
function setDarkMode(){
    const root = document.documentElement;
    root.classList.add('dark');
}

// Initialize dark mode on startup
try{
    setDarkMode();
}catch(e){console.warn(e)}

// (Removed quick teacher login helper — use real login page)

// update on load
updateProfileMenu();

let inputtypeusername =  true

const usernamechoosed = document.getElementById('username')
const emailchoosed = document.getElementById('email')
const inputbar = document.getElementById('loginbar')
const passbar = document.getElementById('passwordbar')
const usernameselect = document.getElementById('username')
const teacherselect = document.getElementById('email')
const wrongtext = document.getElementById('wrongunpw')
let loginsuccess = false
// passbar.style.opacity = '0'

function updateinput(input){
    if(input === `username`){
        inputtypeusername = true
        inputbar.placeholder = 'Нэвтрэх нэр'
        inputbar.type = 'text'
        inputbar.value = ''
        usernameselect.style.color = '#06b6d4'
        usernameselect.style.fontSize = '21px'
        teacherselect.style.color = '#fff'
        teacherselect.style.fontSize = '20px'
    }else if(input === `email`){
        inputtypeusername = false
        inputbar.placeholder = 'example@outlook.com'
        inputbar.type = 'email'
        inputbar.value = ''
        teacherselect.style.color = '#06b6d4'
        teacherselect.style.fontSize = '21px'
        usernameselect.style.color = '#fff'
        usernameselect.style.fontSize = '20px'
    }
}
// console.log(userData)
// console.log(teacherData)

const submit = document.getElementById('submit')
let ispass = false
passbar.addEventListener('keydown', ()=>{
    if ( passbar.value !== ''){

        ispass = true
    }else {
        ispass = false
}
})

submit.addEventListener('click', ()=>{ 
    console.log(teacheractive + ' teacher ')
    console.log(parentactive + ' parent ') 
    let matchedvalueun = 0
    let matchedvaluepw = 0
    let matchedun
    let matchedpw
    if(parentactive == true){
        if( inputtypeusername ){
            for ( let i = 0 ; i < userData.length ; i++ ){
                if(loginbar.value == userData[i].username && matchedvalueun == 0){
                    matchedun = userData[i].username;
                    matchedvalueun = 1
                }else if( matchedvalueun == 0){
                    matchedun = null
                }
            }
        }
        if( !inputtypeusername ){
            for ( let i = 0 ; i < userData.length ; i++ ){
                if(loginbar.value == userData[i].mail && matchedvalueun == 0){
                    matchedun = userData[i].mail;
                    matchedvalueun = 1
                }else if( matchedvalueun == 0){
                    matchedun = null
                }
            }
        }
        if( ispass ){
            for ( let i = 0 ; i < userData.length ; i++ ){
                if(passbar.value == userData[i].password && matchedvaluepw == 0){
                    matchedpw = userData[i].password;
                    matchedvaluepw = 1
                }else if( matchedvalueun == 0){
                    matchedpw = null
                }
            }
        }
    }else if( teacheractive == true){
        if( inputtypeusername ){
            for ( let i = 0 ; i < teacherData.length ; i++ ){
                if(loginbar.value == teacherData[i].username && matchedvalueun == 0){
                    matchedun = teacherData[i].username;
                    matchedvalueun = 1
                }else if( matchedvalueun == 0){
                    matchedun = null
                }
            }
        }
        if( !inputtypeusername ){
            for ( let i = 0 ; i < teacherData.length ; i++ ){
                if(loginbar.value == teacherData[i].mail && matchedvalueun == 0){
                    matchedun = teacherData[i].mail;
                    matchedvalueun = 1
                }else if( matchedvalueun == 0){
                    matchedun = null
                }
            }
        }
        if( ispass ){
            for ( let i = 0 ; i < teacherData.length ; i++ ){
                if(passbar.value == teacherData[i].password && matchedvaluepw == 0){
                    matchedpw = teacherData[i].password;
                    matchedvaluepw = 1
                }else if( matchedvalueun == 0){
                    matchedpw = null
                }
            }
        }
    }


    if(matchedun == null && matchedpw == null){
        wrongtext.style.opacity = '1'
    }
    if(parentactive){
        if(matchedpw && matchedun){
            userView.classList.remove('active')``
            document.getElementById('mainDashboard').classList.add('active')
            loginsuccess = true
            displaygrade(true)
            document.getElementById('loginuser').innerText = 'Хэрэглэгчээс гарах'
        }else{
            displaygrade(false)
            loginsuccess = false
        }
    }else if(teacheractive){
        if(matchedpw && matchedun){
            userView.classList.remove('active')
            document.getElementById('mainContent').classList.add('none')
            document.getElementById('adminpanel').classList.remove('none')
            loginsuccess = true
            // displaygrade(true)
        }else{
            displaygrade(false)
            loginsuccess = false
        }
    }
})


const signup = document.getElementById('signup')


function displaygrade(boolean){
    let a = document.getElementById('grade')
    if(boolean == true){
        a.classList.remove('none')
    }else if(boolean == false){
        a.classList.add('none')
    }
}

const gobackto = document.getElementById('gobacktologin')
const gridone = document.getElementById('logingridone')
const gridtwo = document.getElementById('logingridtwo')
let grids = false

gobackto.addEventListener('click', ()=> {
    if ( grids == false){
        grids = true
        gridone.classList.remove('none')
        gridtwo.classList.add('none')
    }else{
        gridone.classList.add('none')
        gridtwo.classList.remove('none')
        grids = false
    }
})
function gobacktolog (){
    if ( grids == false){
        grids = true
        gridone.classList.remove('none')
        gridtwo.classList.add('none')
    }else{
        gridone.classList.add('none')
        gridtwo.classList.remove('none')
        grids = false
}
}

signup.addEventListener('click', ()=> {
    grids = true
    gobacktolog()
    console.log('burtguuleh')
})

document.getElementById('qrcodes').addEventListener('click',()=> {
    window.open('https://indracyberbooking.netlify.app/', '_blank');
})

document.getElementById('schedule').addEventListener('click',()=>{
    changeactiveadmin('schedule','scheduleadmin')
})

document.getElementById('clubs').addEventListener('click',()=>{
    changeactiveadmin('clubs','clubadmin')
})

document.getElementById('event').addEventListener('click',()=>{
    changeactiveadmin('event','eventadmin')
})
document.getElementById('teach').addEventListener( 'click', ()=>{
    changeactiveadmin('teach','teachadmin')
})

document.getElementById('food').addEventListener('click',()=>{
    changeactiveadmin('food','foodadmin')
})

function changeactiveadmin(key, seckey){
    const adminsections = ['schedule', 'clubs', 'teach', 'event', 'food']
    const adminsectionchanges = ['scheduleadmin', 'clubadmin', 'teachadmin', 'eventadmin', 'foodadmin']
    for( let i = 0; i < adminsections.length ; i++){
        if(document.getElementById(adminsectionchanges[i]).classList.length == 2){
            document.getElementById(adminsectionchanges[i]).classList.remove('adminactive')
        }
        document.getElementById(adminsections[i]).classList.remove('active')
    }
    document.getElementById(seckey).classList.add('adminactive')
    document.getElementById(key).classList.add('active')

}

document.getElementById('gobacktomain').addEventListener('click', ()=>{
    console.log('gobackwoking')
    document.getElementById('adminpanel').classList.add('none')
    document.getElementById('mainContent').classList.remove('none')
    document.getElementById('mainDashboard').classList.add('active')
    console.log(document.getElementById('adminpanel').classList)
    console.log(document.getElementById('mainContent').classList)
}) 


window.enableClubLightbox = enableClubLightbox;
window.enableTeacherZoom = enableTeacherZoom
window.pauseToggle = pauseToggle;
window.changeactiveadmin = changeactiveadmin
window.gobacktolog = gobacktolog;
window.toggleTimer = toggleTimer;
window.togglePlayPause = togglePlayPause;
window.selectClass = selectClass;
window.selectClubType = selectClubType;
window.updateSchedule = updateSchedule;
window.updateTeacher = updateTeacher;
window.switchSection = switchSection;
window.goHome = goHome;
window.renderClassSchedule = renderClassSchedule;
window.renderClubs = renderClubs;
window.renderPsychologistSlots = renderPsychologistSlots;
window.renderFoodMenu = renderFoodMenu;
window.renderRules = renderRules;
window.renderEvents = renderEvents;
window.updateEventTime = updateEventTime;
window.displaygrade = displaygrade;
window.updateinput = updateinput;









}
  
  // Start the async flow
  loadDatabaseAndRun();  


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDf98s55S3a3TOYGYHxBf6E_JAKg99qU_E",
    authDomain: "huviar-5b906.firebaseapp.com",
    databaseURL: "https://huviar-5b906-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "huviar-5b906",
    storageBucket: "huviar-5b906.firebasestorage.app",
    messagingSenderId: "771542679477",
    appId: "1:771542679477:web:be5456e5417b1cc93b63fc",
    measurementId: "G-N1892M58VE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);





window.runRestOfCode = runRestOfCode;

