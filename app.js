const moods = document.querySelectorAll('.mood');
const selectedMood = document.createElement('div');
selectedMood.className = 'selected-mood';
document.querySelector('.mood-picker').appendChild(selectedMood);


const calendarContainer = document.createElement('div');
calendarContainer.className = 'calendar-container';
document.getElementById('container').appendChild(calendarContainer);


const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const savedMoods = JSON.parse(localStorage.getItem('moodHistory')) || {};


const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const updateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    let calendarHTML = `
        <div class="calendar-header">
            <h3>${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}</h3>
        </div>
        <div class="calendar-grid">
            <div class="weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div class="days">
    `;

    for (let i = 0; i < firstDay; i++) {
        calendarHTML += '<div class="day empty"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
        const mood = savedMoods[dateStr];
        const isToday = day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();


        calendarHTML += `
            <div class="day ${isToday ? 'today' : ''}">
                <span class="date">${day}</span>
                ${mood ? `<span class="day-mood">${mood}</span>` : ''}
            </div>
        `;
    }

    calendarHTML += `
            </div>
        </div>
    `;

    calendarContainer.innerHTML = calendarHTML;
}


updateCalendar();

moods.forEach(mood => {
    mood.addEventListener('click', () => {

       
        moods.forEach(m => m.classList.remove('active'));

       
        mood.classList.add('active');

     
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        savedMoods[dateStr] = mood.dataset.mood;
        localStorage.setItem('moodHistory', JSON.stringify(savedMoods));

        selectedMood.textContent = ` You are feeling ${mood.dataset.mood} `;
        selectedMood.style.fontSize = '2rem';
        selectedMood.style.opacity = '1';

    
        mood.style.transform = 'scale(1.2)';
        setTimeout(() => {
            mood.style.transform = 'scale(1)';
        }, 200);

        updateCalendar();
    });
});
