

// Bouton de retour vers le haut

const btnBackToHome = document.getElementById('btn-up');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnBackToHome.style.opacity = '1';
        btnBackToHome.style.visibility = 'visible';
    } else {
        btnBackToHome.style.opacity = '0';
        btnBackToHome.style.visibility = 'hidden';
    }
});

btnBackToHome.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

