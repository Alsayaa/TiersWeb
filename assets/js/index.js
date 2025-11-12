

// Récupérer le bouton
const btnTop = document.getElementById('btn-up');

// Afficher/masquer le bouton au scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
        btnTop.style.opacity = 1;
    } else {
        btnTop.style.opacity = 0;
    }
});

// Remonter en haut au clic
btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Toggle de la musique + stockage avec le localstorage de js pour se souvenir si l'utilisateur
// a activé la musique ou non

// ⚠️ CE CODE EST POUR VOTRE PROJET PERSONNEL
// Il ne fonctionnera PAS dans Claude.ai mais fonctionnera sur votre site

const audio = document.getElementById('background-music');
const audioBtn = document.getElementById('audio-btn');
const icon = audioBtn.querySelector('i');

// Récupération de l'état sauvegardé
let isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';

// Fonction pour mettre à jour l'icône
function updateIcon() {
    if (isMusicPlaying) {
        icon.className = 'fa-solid fa-volume-high';
        icon.style.color = 'var(--pink)';
    } else {
        icon.className = 'fa-solid fa-volume-xmark';
    }
}

// Fonction pour démarrer la musique
function playMusic() {
    audio.play()
        .then(() => {
            isMusicPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
            updateIcon();
        })
        .catch(error => {
            console.error('Erreur lors de la lecture:', error);
        });
}

// Fonction pour arrêter la musique
function pauseMusic() {
    audio.pause();
    isMusicPlaying = false;
    localStorage.setItem('musicPlaying', 'false');
    updateIcon();
}

// Gestion du clic sur le bouton
audioBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});

// Restauration de l'état au chargement
if (isMusicPlaying) {
    playMusic();
} else {
    updateIcon();
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const bar = document.getElementById('scroll-progress-bar');

if (bar) {
    function updateScrollBar() {
        const scrollY = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

        bar.style.width = scrollPercent + "%";
    }

    // Mettre à jour au scroll
    window.addEventListener('scroll', updateScrollBar);

    // Mettre à jour au chargement de la page
    window.addEventListener('load', updateScrollBar);

    // Mettre à jour au redimensionnement
    window.addEventListener('resize', updateScrollBar);

    // Initialisation immédiate
    updateScrollBar();
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {

        if (i < text.length) {

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(type, speed);
        }
    }

    type();
}


window.addEventListener('load', function() {

    setTimeout(() => {

        const subtitle = document.querySelector('.title-hero');

        if (subtitle) {
            const originalText = subtitle.textContent;


            typeWriter(subtitle, originalText, 200);
        }
    }, 1000);
});


// Fonction pour le téléchargement de fichier

// document.querySelector('.download-btn').addEventListener('click', function() {
//
//     const filePath = './files/mon-fichier.pdf'; // Modifie selon ton dossier
//
//     const link = document.createElement('a');
//     link.href = filePath;
//     link.download = 'mon-fichier.pdf'; // Nom du fichier téléchargé
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// });

// fonctionner par id, et juste dupliquer le code

