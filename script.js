// State
let currentSection = 'main';
let sidebarOpen = false;
let selectedClass = '10А';
let selectedClubType = 'Бүгд';
let carouselIndex = 0;

// Data
const classes = ['8А', '8Б', '9А', '9Б', '10А', '10Б', '11А', '11Б', '12А', '12Б'];

const scheduleData = {
    '10А': [
        { time: '08:00 - 08:45', subject: 'Математик', teacher: 'Б.Болормаа', room: '201' },
        { time: '09:00 - 09:45', subject: 'Физик', teacher: 'Ж.Жавхлан', room: '305' },
        { time: '10:00 - 10:45', subject: 'Программчлал', teacher: 'Д.Дорж', room: 'Lab-1' },
        { time: '11:00 - 11:45', subject: 'Англи хэл', teacher: 'С.Сарнай', room: '102' },
        { time: '13:00 - 13:45', subject: 'Хими', teacher: 'Н.Нарантуяа', room: '308' },
        { time: '14:00 - 14:45', subject: 'Биологи', teacher: 'О.Оюунцэцэг', room: '210' },
    ],
    '11А': [
        { time: '08:00 - 08:45', subject: 'Кибер аюулгүй байдал', teacher: 'Д.Дорж', room: 'Lab-2' },
        { time: '09:00 - 09:45', subject: 'Математик', teacher: 'Б.Болормаа', room: '201' },
        { time: '10:00 - 10:45', subject: 'AI & Machine Learning', teacher: 'Г.Ганбаатар', room: 'Lab-1' },
        { time: '11:00 - 11:45', subject: 'Англи хэл', teacher: 'С.Сарнай', room: '102' },
        { time: '13:00 - 13:45', subject: 'Вэб дизайн', teacher: 'Ц.Цэцэг', room: 'Lab-3' },
        { time: '14:00 - 14:45', subject: 'Физик', teacher: 'Ж.Жавхлан', room: '305' },
    ]
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

const availableSlots = [
    { day: 'Даваа', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
    { day: 'Мягмар', slots: ['09:00', '10:00', '13:00', '14:00', '15:00'] },
    { day: 'Лхагва', slots: ['09:00', '11:00', '13:00', '15:00'] },
    { day: 'Пүрэв', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { day: 'Баасан', slots: ['09:00', '10:00', '13:00', '14:00'] },
];

const bookedSlots = ['Даваа 10:00', 'Мягмар 09:00', 'Пүрэв 14:00'];

const weekMenu = [
    { day: 'Даваа', breakfast: 'Талх, цай, өндөгтэй хуушуур', lunch: 'Будаатай гурилтай шөл, нүүдэл махтай будаа', dinner: 'Хачир, цай', calories: '1850 kcal' },
    { day: 'Мягмар', breakfast: 'Будаатай цай, зайрмаг', lunch: 'Цуйван, ногоотой салат', dinner: 'Пицца, жүүс', calories: '1920 kcal' },
    { day: 'Лхагва', breakfast: 'Талх, шүүс, бууз', lunch: 'Банштай шөл, тахиатай будаа', dinner: 'Гамбургер, ногоотой салат', calories: '1880 kcal' },
    { day: 'Пүрэв', breakfast: 'Тараг, жимс, талх', lunch: 'Гурилтай шөл, махтай хуушуур', dinner: 'Хотдог, жимс', calories: '1900 kcal' },
    { day: 'Баасан', breakfast: 'Өндөгтэй талх, какао', lunch: 'Спагетти болоньезе, салат', dinner: 'Сэндвич, сүү', calories: '1850 kcal' }
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

// Initialize
function init() {
    renderClassSchedule();
    renderClubs();
    renderPsychologistSlots();
    renderFoodMenu();
    renderRules();
    renderEvents();
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
    if (open === undefined) {
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
    currentSection = section;
    
    // Hide all sections
    document.querySelectorAll('.section-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected section
    const sectionMap = {
        'schedule': 'scheduleView',
        'clubs': 'clubsView',
        'psychologist': 'psychologistView',
        'food': 'foodView',
        'rules': 'rulesView',
        'events': 'eventsView'
    };
    
    const viewId = sectionMap[section];
    if (viewId) {
        document.getElementById(viewId).classList.add('active');
    }
    
    // Update nav items
    navItems.forEach(item => {
        if (item.getAttribute('data-section') === section) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    toggleSidebar(false);
}

function goHome() {
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
    }, 5000);
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

function updateSchedule() {
    const scheduleList = document.getElementById('scheduleList');
    const schedule = scheduleData[selectedClass] || scheduleData['10А'];
    
    scheduleList.innerHTML = schedule.map(item => `
        <div class="schedule-item">
            <div class="schedule-content">
                <div class="schedule-time">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>${item.time}</span>
                </div>
                <div class="schedule-subject">
                    <h3>${item.subject}</h3>
                </div>
                <div class="schedule-teacher">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>${item.teacher}</span>
                </div>
                <div class="schedule-room">
                    <span>Өрөө: ${item.room}</span>
                </div>
            </div>
        </div>
    `).join('');
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
                <div class="meal-item breakfast">
                    <div class="meal-header">
                        <span>🌅</span>
                        <h4>Өглөө</h4>
                    </div>
                    <p class="meal-description">${menu.breakfast}</p>
                </div>
                <div class="meal-item lunch">
                    <div class="meal-header">
                        <span>☀️</span>
                        <h4>Өдөр</h4>
                    </div>
                    <p class="meal-description">${menu.lunch}</p>
                </div>
                <div class="meal-item dinner">
                    <div class="meal-header">
                        <span>🌙</span>
                        <h4>Үдэш</h4>
                    </div>
                    <p class="meal-description">${menu.dinner}</p>
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
