const slideData = [
    {
        title: "Apply for an IEG license<br>(new submissions).",
        button: "Register Your Game",
        image: "img1.png"
    },
    {
        title: "Scan or enter a game's<br>QR License Serial Number.",
        button: "Validate License QR",
        image: "img2.png" 
    },
    {
        title: "Get the official IEG<br>Guidelines / Instruction Manual.",
        button: "Download Manual",
        image: "img3.png"
    }
];

let currentIndex = 0;

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= slideData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slideData.length - 1;

    const data = slideData[currentIndex];
    const titleElement = document.getElementById('slide-title');
    const btnElement = document.getElementById('slide-btn');
    const slideElement = document.getElementById('main-slide');
    
    if(titleElement) titleElement.innerHTML = data.title;
    if(btnElement) btnElement.innerText = data.button;
    if(slideElement) {
        slideElement.style.backgroundImage = `linear-gradient(to right, #147CC3 0%, #147CC3 10%, rgba(20, 124, 195, 0) 75%), url('${data.image}')`;}
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

const newsData = [
    {
        category: "Trust & Verification",
        title: "Verify Any IEG-Licensed Game Using QR Code",
        desc: "Players and institutions can instantly verify licensed games by scanning the official IEG QR Code.",
        img: "img4.png", 
        btn: "Verify License",
    },
    {
        category: "Portal Launch",
        title: "IEG Portal Officially Launches Global Licensing Platform",
        desc: "The International eDigital Gaming (IEG) Portal is now live, providing a centralized global system.",
        img: "img5.png", 
        btn: "Explore the IEG Portal",
    },
    {
        category: "Developer Update",
        title: "Game Registration & QR License Verification Now Open",
        desc: "Developers can now submit game titles for official IEG licensing. Approved games receive a unique Serial Number.",
        img: "img6.png", 
        btn: "Register Your Game",
    }
];

function renderNews() {
    const container = document.getElementById('news-carousel');
    if(!container) return;
    container.innerHTML = '';

    newsData.forEach((item, index) => {
        const isActive = index === 1 ? 'active-card' : '';
        const bgClass = item.isBlue ? 'blue-bg' : '';
        const imgClass = item.isBlue ? 'featured-logo' : '';

        container.innerHTML += `
            <div class="news-card ${isActive}">
                <div class="card-image-box ${bgClass}">
                    <img src="${item.img}" alt="${item.category}" class="${imgClass}">
                    <span class="tag">Latest</span>
                </div>
                <div class="card-body">
                    <h3>${item.category}</h3>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <div class="card-actions">
                        <button class="action-red">${item.btn}</button>
                        <button class="action-white">View</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function rotateNews(direction) {
    if (direction === 1) {
        newsData.unshift(newsData.pop());
    } else {
        newsData.push(newsData.shift());
    }
    renderNews();
}

renderNews();

const track = document.querySelector('.testimonial-track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentPos = 0;

nextBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.testimonial-item').offsetWidth + 30; // Card width + Gap
    const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
    
    if (currentPos < maxScroll) {
        currentPos += cardWidth;
        track.style.transform = `translateX(-${currentPos}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    const cardWidth = document.querySelector('.testimonial-item').offsetWidth + 30;
    
    if (currentPos > 0) {
        currentPos -= cardWidth;
        track.style.transform = `translateX(-${currentPos}px)`;
    }
});