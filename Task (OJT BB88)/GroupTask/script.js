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
        title: "Get the official IEG<br>Guidelines/Instruction Manual.",
        button: "Download Manual",
        image: "img3.png"
    }
];

let currentIndex = 0;

function changeSlide(direction) {
    currentIndex += direction;

    // Loop logic: if we go past the end, go to start. If before start, go to end.
    if (currentIndex >= slideData.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = slideData.length - 1;

    const data = slideData[currentIndex];
    
    // Update Title and Button Text
    const titleElement = document.getElementById('slide-title');
    const btnElement = document.getElementById('slide-btn');
    
    if(titleElement) titleElement.innerHTML = data.title;
    if(btnElement) btnElement.innerText = data.button;
    
    // Update Background Image
    const slideElement = document.getElementById('main-slide');
    if(slideElement) {
        slideElement.style.backgroundImage = `linear-gradient(to right, #147CC3 0%, #147CC3 30%, rgba(20, 124, 195, 0) 75%), url('${data.image}')`;
    }

    // Update Dots appearance
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}