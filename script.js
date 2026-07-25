document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    window.activeAudios = [];
    window.stopAllAudio = function() {
        window.activeAudios.forEach(a => {
            if (a) {
                a.pause();
                a.currentTime = 0;
            }
        });
        window.activeAudios = [];
    };

    function updateSlides() {
        window.stopAllAudio();
        
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Counter
        const currentStr = String(currentSlide + 1).padStart(2, '0');
        const totalStr = String(totalSlides).padStart(2, '0');
        slideCounter.textContent = `${currentStr} / ${totalStr}`;

        // Update Buttons
        prevBtn.disabled = currentSlide === 0;
        
        if (currentSlide === totalSlides - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Button Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Audio Cycler for Slide 4
    const playEsquivaBtn = document.getElementById('playEsquivaBtn');
    const audioLabel = document.getElementById('audioLabel');
    if (playEsquivaBtn && audioLabel) {
        const audios = [
            { name: "Esquiva Rápida", file: "AUDIOS/esquiva rápida.mp3" },
            { name: "Esquiva Longa", file: "AUDIOS/esquiva longa.mp3" },
            { name: "Esquiva Grama", file: "AUDIOS/esquiva grama.mp3" }
        ];
        let currentAudioIndex = 0;

        playEsquivaBtn.addEventListener('click', () => {
            // Toca o áudio atual
            let a = new Audio(audios[currentAudioIndex].file);
            window.activeAudios.push(a);
            a.play();
            
            // Avança para o próximo
            currentAudioIndex = (currentAudioIndex + 1) % audios.length;
            
            // Atualiza o texto em cima do botão
            audioLabel.textContent = audios[currentAudioIndex].name;
        });
    }

    // Audio Manager for Slide 5
    let currentSlide5Audio = null;
    window.playSlide5Audio = function(file) {
        if (currentSlide5Audio) {
            currentSlide5Audio.pause();
            currentSlide5Audio.currentTime = 0;
        }
        currentSlide5Audio = new Audio(file);
        window.activeAudios.push(currentSlide5Audio);
        currentSlide5Audio.play();
    };

    // Generic Audio Manager (used for Slide 6)
    window.playThemeAudio = function(file) {
        window.stopAllAudio();
        let a = new Audio(file);
        window.activeAudios.push(a);
        a.play();
    };

    // Audio Cycler for Slide 7 - Sucesso
    const btnSucesso = document.getElementById('btnSucesso');
    const labelSucesso = document.getElementById('labelSucesso');
    if (btnSucesso && labelSucesso) {
        const audiosSucesso = [
            { name: "Exemplo 1", file: "AUDIOS/sucesso/1.mp3" },
            { name: "Exemplo 2", file: "AUDIOS/sucesso/2.mp3" },
            { name: "Exemplo 3", file: "AUDIOS/sucesso/3.mp3" }
        ];
        let indexSucesso = 0;
        btnSucesso.addEventListener('click', () => {
            window.stopAllAudio();
            let a = new Audio(audiosSucesso[indexSucesso].file);
            window.activeAudios.push(a);
            a.play();
            indexSucesso = (indexSucesso + 1) % audiosSucesso.length;
            labelSucesso.textContent = audiosSucesso[indexSucesso].name;
        });
    }

    // Audio Cycler for Slide 7 - Erro
    const btnErro = document.getElementById('btnErro');
    const labelErro = document.getElementById('labelErro');
    if (btnErro && labelErro) {
        const audiosErro = [
            { name: "Exemplo 1", file: "AUDIOS/Errado/1.mp3" },
            { name: "Exemplo 2", file: "AUDIOS/Errado/2.mp3" },
            { name: "Exemplo 3", file: "AUDIOS/Errado/3.mp3" }
        ];
        let indexErro = 0;
        btnErro.addEventListener('click', () => {
            window.stopAllAudio();
            let a = new Audio(audiosErro[indexErro].file);
            window.activeAudios.push(a);
            a.play();
            indexErro = (indexErro + 1) % audiosErro.length;
            labelErro.textContent = audiosErro[indexErro].name;
        });
    }

    // Timer for Slide 11
    let timerInterval11;
    let timeRemaining11 = 15 * 60; // 15 minutes in seconds
    const timerDisplay11 = document.getElementById('timerDisplay11');
    const startTimerBtn11 = document.getElementById('startTimerBtn11');
    const pauseTimerBtn11 = document.getElementById('pauseTimerBtn11');
    const resetTimerBtn11 = document.getElementById('resetTimerBtn11');

    function updateTimerDisplay11() {
        const minutes = Math.floor(timeRemaining11 / 60);
        const seconds = timeRemaining11 % 60;
        if(timerDisplay11) {
            timerDisplay11.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    if (startTimerBtn11 && pauseTimerBtn11 && resetTimerBtn11 && timerDisplay11) {
        startTimerBtn11.addEventListener('click', () => {
            startTimerBtn11.style.display = 'none';
            pauseTimerBtn11.style.display = 'block';
            timerInterval11 = setInterval(() => {
                if (timeRemaining11 > 0) {
                    timeRemaining11--;
                    updateTimerDisplay11();
                } else {
                    clearInterval(timerInterval11);
                    pauseTimerBtn11.style.display = 'none';
                    startTimerBtn11.style.display = 'block';
                }
            }, 1000);
        });

        pauseTimerBtn11.addEventListener('click', () => {
            clearInterval(timerInterval11);
            pauseTimerBtn11.style.display = 'none';
            startTimerBtn11.style.display = 'block';
        });

        resetTimerBtn11.addEventListener('click', () => {
            clearInterval(timerInterval11);
            timeRemaining11 = 15 * 60;
            updateTimerDisplay11();
            pauseTimerBtn11.style.display = 'none';
            startTimerBtn11.style.display = 'block';
        });
        
        updateTimerDisplay11();
    }

    // Initialize
    updateSlides();
});
