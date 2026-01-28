document.addEventListener('DOMContentLoaded', () => {

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.project-card, .section-title, .video-wrapper');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Handle dynamic class addition for transition
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Custom Video Player Logic
    const video = document.getElementById('customVideo');
    const wrapper = document.querySelector('.video-wrapper');
    const playBtn = document.getElementById('playBtn');
    const miniPlayBtn = document.getElementById('miniPlayBtn');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');

    function togglePlay() {
        if (video.paused) {
            video.play();
            wrapper.classList.add('playing');
            wrapper.classList.remove('paused');
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            miniPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            video.pause();
            wrapper.classList.remove('playing');
            wrapper.classList.add('paused');
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            miniPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    if (video) {
        // Toggle play on click (overlay or mini btn)
        playBtn.addEventListener('click', togglePlay);
        miniPlayBtn.addEventListener('click', togglePlay);
        
        // Also toggle if clicking the video itself
        video.addEventListener('click', togglePlay);

        // Update progress bar
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;
        });

        // Seek on progress bar click
        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Reset when video ends
        video.addEventListener('ended', () => {
            wrapper.classList.remove('playing');
            wrapper.classList.add('paused');
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            miniPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            progressBar.style.width = '0%';
        });
    }
});
