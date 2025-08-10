// CARROSSEL ULTRA SIMPLES - GARANTIDO QUE FUNCIONA
console.log('🎠 Carregando carrossel simples...');

function createSimpleCarousel() {
    console.log('🔍 Procurando elementos...');
    
    // Buscar elementos
    const track = document.querySelector('.services-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    // Verificar se existem
    console.log('📊 Elementos encontrados:', {
        track: !!track,
        cards: cards.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });
    
    if (!track || cards.length === 0 || !prevBtn || !nextBtn) {
        console.log('❌ Elementos não encontrados!');
        return;
    }
    
    // Variáveis do carrossel
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    console.log(`🎯 Carrossel com ${totalSlides} slides`);
    
    // Função para mover o carrossel
    function moveCarousel() {
        const moveX = -currentSlide * 100;
        track.style.transform = `translateX(${moveX}%)`;
        
        console.log(`📍 Movendo para slide ${currentSlide + 1}/${totalSlides}`);
        
        // Atualizar aparência dos botões
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
    }
    
    // Ir para próximo
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            moveCarousel();
            console.log('➡️ Próximo slide');
        } else {
            console.log('⚠️ Já no último slide');
        }
    }
    
    // Ir para anterior
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            moveCarousel();
            console.log('⬅️ Slide anterior');
        } else {
            console.log('⚠️ Já no primeiro slide');
        }
    }
    
    // Adicionar eventos aos botões
    nextBtn.onclick = function(event) {
        event.preventDefault();
        console.log('🖱️ Clique NEXT');
        nextSlide();
    };
    
    prevBtn.onclick = function(event) {
        event.preventDefault();
        console.log('🖱️ Clique PREV');
        prevSlide();
    };
    
    // Inicializar carrossel
    moveCarousel();
    
    // Funções globais para teste
    window.carouselTest = {
        next: nextSlide,
        prev: prevSlide,
        goto: function(n) {
            if (n >= 0 && n < totalSlides) {
                currentSlide = n;
                moveCarousel();
            }
        },
        current: () => currentSlide,
        total: totalSlides
    };
    
    console.log('✅ Carrossel inicializado! Use window.carouselTest para testar');
}

// Executar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSimpleCarousel);
} else {
    createSimpleCarousel();
}