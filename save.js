let prevnum = []
// console.log(analytics)

// State
let currentSection = 'main';
let sidebarOpen = false;
let selectedClass = '12А';
let selectedClubType = 'Бүгд';
let carouselIndex = 0;

// Data
const classes = ['6-1','6-2','6-3','7-1','7-2','8-1','9-1','10-1','10-2','11-1','11-2','11-3','12-1'];

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
const scheduleData = {
    '12А': {
        Monday : {
            1: 'Math',
            2: 'Math',
            3: 'M/hel',
            4: 'M/hel',
            5: 'A/hel',
            6: 'A/hel',
            7: 'Songon',
            8: 'Songon',
            9: 'Class work',
            10: '',
        },
        Tuesday : {
            1: '2-Math',
            2: 'Math',
            3: 'M/hel',
            4: 'M/hel',
            5: 'A/hel',
            6: 'A/hel',
            7: 'Songon',
            8: 'Songon',
            9: 'Class work',
            10: '',
        },
        Wednesday : {
            
            1: '3-Math',
            2: 'Math',
            3: 'M/hel',
            4: 'M/hel',
            5: 'A/hel',
            6: 'A/hel',
            7: 'Songon',
            8: 'Songon',
            9: 'Class work',
            10: '',
        },
        Thursday : {
            
            1: '4-Math',
            2: 'Math',
            3: 'M/hel',
            4: 'M/hel',
            5: 'A/hel',
            6: 'A/hel',
            7: 'Songon',
            8: 'Songon',
            9: 'Class work',
            10: '',
        },
        Friday : {
            1: '5-Math',
            2: 'Math',
            3: 'M/hel',
            4: 'M/hel',
            5: 'A/hel',
            6: 'A/hel',
            7: 'Songon',
            8: 'Songon',
            9: 'Class work',
            10: '',
        }
    }
};

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
const closeSidebar = document.getElementById('closeSidebar');
const homeBtn = document.getElementById('homeBtn');
const navItems = document.querySelectorAll('.nav-item');








const headerline = document.getElementById("header-line")

let time = 0;
let loopvalue = 0;
let maxseconds = 20;
let timer = null; // store interval ID




let isRunning = false; // track state



let isPaused = false;
let isPausedatStart = 0;

// Get elements
const button = document.getElementById('playPauseBtn');
const icon = document.getElementById('buttonIcon');


function pauseToggle (){
    if(isPausedatStart === 0){
        toggleTimer(false)
        isPaused = true
        updateButton()
    }
    isPausedatStart = 1

}

function updateButton() {
  if (!isPaused) {
    // Show Play icon
    icon.innerHTML = '<div class="play-icon"></div>';
  } else {
    // Show Pause icon
    icon.innerHTML = `
      <div class="pause-icon">
        <div class="pause-bar"></div>
        <div class="pause-bar"></div>
      </div>
    `;
  }
}



function toggleTimer(num){
    console.log(isPaused)
    if(num){
        clearInterval(timer)
    }else {
    if ( isPaused === false ) {
        timer = setInterval(() => {
            let percentage = (time / maxseconds) * 100;
            let percentages = percentage + "%";
            headerline.style.width = percentages;
            time += 0.01; // add 0.01 second
    
            if (time >= 20.00) {
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
    
                document.getElementById(activeMap[loopvalue]).classList.add('active');
            }
    }, 10); // 10ms = 0.01s
    }else {
        clearInterval(timer)
    }
    }
}












// Toggle function
function togglePlayPause() {
  isPaused = !isPaused;
  updateButton();
}

// Add event listener
button.addEventListener('click', togglePlayPause);

// Initialize
updateButton();
























// Initialize
function init() {
    pauseToggle();
    renderClassSchedule();
    renderClubs();
    renderPsychologistSlots();
    renderFoodMenu();
    renderRules();
    renderEvents();
    renderTeachers();
    startCarousel();
    updateEventTime();


    // Event listeners
    sidebarToggle.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', () => toggleSidebar(false));
    homeBtn.addEventListener('click', goHome);
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.getAttribute('data-section');
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
    if ( section === 'schedule'){
        loopvalue = 1
}else if ( section === 'clubs' ){
        loopvalue = 2
    }else if ( section === 'psychologist' ){
        loopvalue = 3
    }else if ( section === 'food' ){
        loopvalue = 4
        
    }else if ( section === 'rules' ){
        loopvalue = 5
        
    }else if ( section === 'events' ){
        loopvalue = 6
    }else if ( section === '')
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



























// Class Schedule
function renderClassSchedule() {
    const classFilter = document.getElementById('classFilter');
    const scheduleList = document.getElementById('scheduleList');
    
    // Render class filter buttons
    classFilter.innerHTML = classes.map(cls => `
        <button class="class-btn ${cls === selectedClass ? 'active' : ''}" onclick="selectClass('${cls}')">
            ${cls}
        </button>
    `).join('');
    
    // Render schedule
    updateSchedule();
}

function selectClass(cls) {
    selectedClass = cls;
    renderClassSchedule();
}


function renderTeachers() {
    
    // typeFilter.innerHTML = join('');
    
    updateTeacher();
}   







// Clubs
function renderClubs() {
    const typeFilter = document.getElementById('typeFilter');
    const clubsList = document.getElementById('clubsList');
    
    // Render type filter
    typeFilter.innerHTML = clubTypes.map(type => `
        <button class="type-btn ${type === selectedClubType ? 'active' : ''}" onclick="selectClubType('${type}')">
            ${type}
        </button>
    `).join('');
    
    updateClubs();
}








function selectClubType(type) {
    selectedClubType = type;
    renderClubs();
}












function updateClubs() {
    const clubsList = document.getElementById('clubsList');
    const filteredClubs = selectedClubType === 'Бүгд' 
        ? clubs 
        : clubs.filter(club => club.type === selectedClubType);
    
    clubsList.innerHTML = filteredClubs.map(club => `
        <div class="club-card">
            <div class="club-header">
                <h3 class="club-name">${club.name}</h3>
                <span class="club-type-badge">${club.type}</span>
            </div>
            <div class="club-details">
                <div class="club-detail">
                    <span>🕐</span>
                    <span>${club.day}</span>
                </div>
                <div class="club-detail">
                    <span>⏰</span>
                    <span>${club.time}</span>
                </div>
                <div class="club-detail">
                    <span>👨‍🏫</span>
                    <span>${club.teacher}</span>
                </div>
                <div class="club-detail">
                    <span>📍</span>
                    <span>${club.room}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function updateTeacher() {
    
    // join('');
}













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
    
    menuContainer.innerHTML = weekMenu.map(menu => `
        <div class="menu-day">
            <div class="menu-day-header">
                <h3 class="day-name">${menu.day} гараг</h3>
                <div class="calories-badge">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                    </svg>
                    <span>${menu.calories}</span>
                </div>
            </div>
            <div class="meals-grid">
                <div class="meal-item lunch">
                    <div class="meal-header">
                        <span>☀️</span>
                        <h4>Өдөр</h4>
                    </div>
                    <p class="meal-description">${menu.lunch}</p>
                </div>
            </div>
        </div>
    `).join('');
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
    const eventsContainer = document.getElementById('upcomingEvents');
    const newsContainer = document.getElementById('latestNews');
    
    eventsContainer.innerHTML = events.map(event => `
        <div class="event-card" style="background: ${event.color}">
            <div class="event-header">
                <div class="event-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                </div>
                <span class="event-type">${event.type}</span>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-details">
                <p>📅 ${event.date}</p>
                <p>🕐 ${event.time}</p>
                <p>📍 ${event.location}</p>
                <p style="padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.2)">${event.description}</p>
            </div>
        </div>
    `).join('');
    
    newsContainer.innerHTML = news.map(item => `
        <div class="news-item">
            <div class="news-content">
                <div class="news-image"></div>
                <div class="news-text">
                    <div class="news-date">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>${item.date}</span>
                    </div>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-description">${item.content}</p>
                </div>
            </div>
        </div>
    `).join('');
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
isPaused = false
   toggleTimer(true)
   updateButton(true)
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


function updateSchedule(day, num) {
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
    document.getElementById('adminpanel').classList.add('none')
    document.getElementById('mainContent').classList.remove('none')
    document.getElementById('mainDashboard').classList.add('active')
    console.log(document.getElementById('adminpanel').classList)
    console.log(document.getElementById('mainContent').classList)
})
