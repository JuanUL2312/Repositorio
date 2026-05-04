// Datos de categorías y juegos
const categories = [
    {
        id: 'accion',
        title: '⚔️ Acción/Aventura',
        description: 'Juegos llenos de adrenalina, combates épicos y exploración',
        icon: '⚔️',
        games: [
            { title: 'God of War', desc: 'La venganza de Kratos en los reinos nórdicos' },
            { title: "Assassin's Creed Valhalla", desc: 'Conquista Inglaterra como vikingo' },
            { title: 'Shadow of the Tomb Raider', desc: 'La última tumba de Lara Croft' },
            { title: 'Devil May Cry 5', desc: 'Dante regresa con estilo demoníaco' }
        ]
    },
    {
        id: 'rpg',
        title: '🎭 RPG',
        description: 'Crea tu personaje y vive aventuras épicas',
        icon: '🎭',
        games: [
            { title: 'The Witcher 3', desc: 'La saga completa de Geralt de Rivia' },
            { title: 'Elden Ring', desc: 'El mundo abierto más desafiante' },
            { title: 'Final Fantasy VII Remake', desc: 'Cloud y sus amigos contra Shinra' },
            { title: 'Cyberpunk 2077', desc: 'Night City te espera' }
        ]
    },
    {
        id: 'shooter',
        title: '🔫 Shooter',
        description: 'Precisión, reflejos y multijugador intenso',
        icon: '🔫',
        games: [
            { title: 'Call of Duty: Warzone', desc: 'Battle Royale gratuito y masivo' },
            { title: 'DOOM Eternal', desc: 'El matademonios definitivo' },
            { title: 'Valorant', desc: 'Táctico 5v5 con habilidades únicas' },
            { title: 'Counter-Strike 2', desc: 'El rey del shooter táctico' }
        ]
    },
    {
        id: 'deportes',
        title: '⚽ Deportes',
        description: 'Vive la emoción del deporte desde tu sofá',
        icon: '⚽',
        games: [
            { title: 'FIFA 24', desc: 'La liga más realista del fútbol' },
            { title: 'NBA 2K24', desc: 'Domina la cancha como una estrella' },
            { title: 'Madden NFL 24', desc: 'El fútbol americano más auténtico' },
            { title: 'WWE 2K24', desc: 'Lucha libre con tu roster favorito' }
        ]
    }
];

// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const categoriesContainer = document.getElementById('categories');
const gamesGrid = document.getElementById('gamesGrid');

// Renderizar categorías
function renderCategories(categoriesToRender = categories) {
    categoriesContainer.innerHTML = categoriesToRender.map(category => `
        <div class="category-card" onclick="showGames('${category.id}')">
            <span class="category-icon">${category.icon}</span>
            <h3>${category.title}</h3>
            <p>${category.description}</p>
        </div>
    `).join('');
}

// Mostrar juegos de una categoría
function showGames(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
        gamesGrid.innerHTML = `
            <h2>${category.title}</h2>
            ${category.games.map(game => `
                <div class="game-card" onclick="selectGame('${game.title}')">
                    <div class="game-image">${getGameEmoji(game.title)}</div>
                    <div class="game-info">
                        <h4 class="game-title">${game.title}</h4>
                        <p class="game-desc">${game.desc}</p>
                    </div>
                </div>
            `).join('')}
        `;
        gamesGrid.classList.remove('hidden');
        categoriesContainer.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Seleccionar juego (puedes personalizar esta función)
function selectGame(gameTitle) {
    // Aquí puedes agregar tu lógica personalizada
    // Por ejemplo: abrir modal, redirigir a página, etc.
    alert(`¡Juego seleccionado: ${gameTitle}! 🎮\n\n¡A jugar!`);
}

// Emoji aleatorio para juegos
function getGameEmoji(title) {
    const emojis = ['🎮', '🕹️', '⭐', '💎', '🔥', '⚡', '🌟', '🏆'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Búsqueda en tiempo real
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length === 0) {
        categoriesContainer.style.display = 'grid';
        gamesGrid.classList.add('hidden');
        renderCategories();
        return;
    }

    // Filtrar categorías
    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query)
    );

    if (filteredCategories.length > 0) {
        renderCategories(filteredCategories);
        gamesGrid.classList.add('hidden');
    } else {
        categoriesContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; opacity: 0.7; padding: 2rem;">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">😔</span>
                <p>No se encontraron resultados para "<strong>${e.target.value}</strong>"</p>
            </div>
        `;
    }
});

// Volver atrás con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        categoriesContainer.style.display = 'grid';
        gamesGrid.classList.add('hidden');
        searchInput.value = '';
        renderCategories();
    }
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
});