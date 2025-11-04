

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



// Toggle de la musique + stockage avec le localstorage de js pour se souvenir si l'utilisateur
// a activé la musique ou non


const musicToggler = document.getElementById('audio-btn');

musicToggler.addEventListener('click', () => {


});


//  Barre de recherche page médiation

// Récupération des éléments
const searchBar = document.getElementById('searchBar');
const cards = document.querySelectorAll('.card');

// Fonction de recherche
function searchCards() {
    const searchTerm = searchBar.value.toLowerCase().trim();

    cards.forEach(card => {
        // Récupérer le titre et le texte de la carte
        const title = card.querySelector('.media-card-title')?.textContent.toLowerCase() || '';
        const text = card.querySelector('.media-text')?.textContent.toLowerCase() || '';

        // Vérifier si le terme de recherche est présent
        const matchFound = title.includes(searchTerm) || text.includes(searchTerm);

        // Afficher ou masquer la carte parente (col-lg-4)
        const cardContainer = card.closest('.col-lg-4');
        if (matchFound) {
            cardContainer.style.display = '';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10);
        } else {
            cardContainer.style.display = 'none';
        }
    });

    // Vérifier s'il n'y a aucun résultat
    const visibleCards = Array.from(cards).filter(card =>
        card.closest('.col-lg-4').style.display !== 'none'
    );

    // Afficher un message si aucun résultat
    let noResultMsg = document.getElementById('noResultMessage');
    if (visibleCards.length === 0 && searchTerm !== '') {
        if (!noResultMsg) {
            noResultMsg = document.createElement('div');
            noResultMsg.id = 'noResultMessage';
            noResultMsg.className = 'col-12 text-center my-4';
            noResultMsg.innerHTML = '<p class="text-result">Aucune fiche ne correspond à votre recherche.</p>';
            document.querySelector('.row:has(.card)').appendChild(noResultMsg);
        }
    } else if (noResultMsg) {
        noResultMsg.remove();
    }
}

// Écouteur d'événement sur la barre de recherche
searchBar.addEventListener('input', searchCards);

// Optionnel : Réinitialiser la recherche au chargement
document.addEventListener('DOMContentLoaded', () => {
    cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease';
    });
});


