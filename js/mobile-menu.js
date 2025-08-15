// MENU MOBILE FUNCIONAL
console.log('📱 Carregando menu mobile...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM carregado, iniciando menu mobile...');
    
    // Elementos
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    
    // Verificar elementos
    if (!menuBtn || !mobileMenu) {
        console.error('❌ Elementos do menu mobile não encontrados');
        return;
    }
    
    console.log('✅ Menu mobile encontrado');
    
    // Estado do menu
    let isMenuOpen = false;
    
    // Função para abrir/fechar menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuBtn.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll
            console.log('📱 Menu aberto');
        } else {
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll
            console.log('📱 Menu fechado');
        }
    }
    
    // Função para fechar menu
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
            console.log('📱 Menu fechado automaticamente');
        }
    }
    
    // Event listener do botão
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Botão menu clicado');
        toggleMenu();
    });
    
    // Fechar menu ao clicar nos links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('🔗 Link clicado, fechando menu');
            closeMenu();
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            console.log('👆 Clique fora do menu, fechando');
            closeMenu();
        }
    });
    
    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('⌨️ ESC pressionado, fechando menu');
            closeMenu();
        }
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024 && isMenuOpen) {
            console.log('🖥️ Redimensionado para desktop, fechando menu');
            closeMenu();
        }
    });
    
    console.log('✅ Menu mobile inicializado com sucesso!');
    
    // Debug global
    window.mobileMenu = {
        toggle: toggleMenu,
        close: closeMenu,
        isOpen: () => isMenuOpen
    };
    
    console.log('🎮 Use window.mobileMenu para controlar manualmente');
});