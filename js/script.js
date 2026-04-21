// =======================
// 🎯 ELEMENTOS
// =======================
const overlay = document.getElementById('entry-overlay');
const bgMusic = document.getElementById('bgMusic');

let currentVideoIndex = 0;
let heartsInterval = null;


// =======================
// 👁️ OBSERVER
// =======================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);

            // 💖 quando chegar no footer → inicia corações
            if (entry.target.tagName === "FOOTER") {
                startHearts();
            }
        }
    });
}, { threshold: 0.1 });


// =======================
// 📸 TIMELINE
// =======================
const timelineData = Array.from({ length: 16 }, (_, i) => ({
    img: `./img/${i + 1}.jpeg`,
    titulo: `Momento ${i + 1}`,
    texto: "Uma lembrança especial desse dia..."
}));

function renderTimeline() {
    const container = document.getElementById("timeline");
    if (!container) return;

    container.innerHTML = "";

    timelineData.forEach((item, index) => {

        const reverse = index % 2 !== 0;
        const rotation = ["rotate-3","-rotate-2","rotate-1","-rotate-3"][index % 4];

        container.innerHTML += `
        <div class="reveal relative flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-start md:items-center mb-20 md:mb-32">

            <div class="absolute left-4 md:left-1/2 w-3 h-3 bg-rose-400 rounded-full md:-translate-x-1/2 top-2"></div>

            <div class="w-full md:w-1/2 pl-12 md:pl-0 
                ${reverse ? 'md:pl-20 md:text-left' : 'md:pr-20 md:text-right'} 
                text-left md:text-${reverse ? 'left' : 'right'} mb-6 md:mb-0">

                <h3 class="text-xl sm:text-2xl md:text-3xl font-serif italic mb-2">
                    ${item.titulo}
                </h3>

                <p class="text-slate-500 text-sm sm:text-base">
                    ${item.texto}
                </p>
            </div>

            <div class="w-full md:w-1/2 flex ${reverse ? 'md:justify-end' : 'md:justify-start'} pl-12 md:pl-0">
                <div class="w-52 sm:w-64 md:w-72 h-72 sm:h-80 md:h-96 bg-white p-3 shadow-xl ${rotation}">
                    <img src="${item.img}" class="w-full h-full object-cover rounded">
                </div>
            </div>

        </div>`;
    });

    activateReveal();
}


// =======================
// 🎥 VIDEOS
// =======================
const videos = [
    { src: "./videos/1.mp4", nome: "Mãe ❤️" },
    { src: "./videos/2.mp4", nome: "Laysa" },
    { src: "./videos/3.mp4", nome: "Esposo e filha ❤️" },
    { src: "./videos/4.mp4", nome: "Gabira" },
    { src: "./videos/11.mp4", nome: "Emily" },
    { src: "./videos/10.mp4", nome: "Momentos 1" },
    { src: "./videos/6.mp4", nome: "Momentos 2" },
    { src: "./videos/7.mp4", nome: "Momentors 3" },
    { src: "./videos/8.mp4", nome: "Momentos 4" },
    { src: "./videos/9.mp4", nome: "Momentos 5" },
    { src: "./videos/5.mp4", nome: "Momentos 6" }
];

function renderVideos() {
    const container = document.getElementById("videos");
    if (!container) return;

    container.innerHTML = "";

    videos.forEach((video, index) => {

        container.innerHTML += `
        <div class="reveal cursor-pointer" onclick="openVideoModal(${index})">

            <div class="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg transition hover:scale-[1.02]">

                <div class="relative">
                    <video class="w-full rounded-xl sm:rounded-2xl pointer-events-none"></video>

                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="bg-white/80 rounded-full p-3 text-lg sm:text-xl">▶</div>
                    </div>
                </div>

                <p class="mt-3 sm:mt-4 font-hand text-lg sm:text-xl md:text-2xl text-center">
                    ${video.nome}
                </p>

            </div>
        </div>`;
    });

    activateReveal();
}


// =======================
// 🎬 MODAL
// =======================
function openVideoModal(index) {
    currentVideoIndex = index;

    const modal = document.createElement("div");
    modal.id = "videoModal";

    modal.innerHTML = `
    <div class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">

        <div class="relative w-full max-w-3xl">

            <video id="videoPlayer" controls autoplay class="w-full rounded-2xl max-h-[70vh] object-contain">
                <source src="${videos[index].src}">
            </video>

            <p class="text-white text-center mt-4 text-lg sm:text-xl">
                ${videos[index].nome}
            </p>

            <button onclick="closeVideoModal()" class="absolute top-2 right-2 text-white text-3xl">✕</button>

            <button onclick="prevVideo()" class="absolute left-2 md:left-[-60px] top-1/2 -translate-y-1/2 text-white text-3xl">⟨</button>

            <button onclick="nextVideo()" class="absolute right-2 md:right-[-60px] top-1/2 -translate-y-1/2 text-white text-3xl">⟩</button>

        </div>
    </div>`;

    document.body.appendChild(modal);
}

function closeVideoModal() {
    document.getElementById("videoModal")?.remove();
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    updateVideo();
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    updateVideo();
}

function updateVideo() {
    const player = document.getElementById("videoPlayer");
    player.src = videos[currentVideoIndex].src;
    player.play();
}


// =======================
// 🎵 MÚSICA
// =======================
function toggleMusic() {
    const icon = document.getElementById("musicIcon");

    if (!bgMusic) return;

    if (bgMusic.paused) {
        bgMusic.play();
        icon.setAttribute("data-lucide", "pause");
    } else {
        bgMusic.pause();
        icon.setAttribute("data-lucide", "play");
    }

    lucide.createIcons();
}


// =======================
// 💖 CORAÇÕES
// =======================
function createHeart() {
    const container = document.getElementById("heartsContainer");
    if (!container) return;

    const heart = document.createElement("div");
    heart.className = "heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (16 + Math.random() * 20) + "px";

    heart.innerHTML = "💖";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}

function startHearts() {
    if (heartsInterval) return;
    heartsInterval = setInterval(createHeart, 300);
}


// =======================
// ✨ ANIMAÇÕES
// =======================
function activateReveal() {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}


// =======================
// 🎁 ABRIR PRESENTE
// =======================
function openGift() {
    if (!overlay) return;

    overlay.style.opacity = '0';
    overlay.style.transform = 'scale(1.5)';

    setTimeout(() => {
        overlay.style.display = 'none';

        renderTimeline();
        renderVideos();

        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(() => {});
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, 1000);
}
