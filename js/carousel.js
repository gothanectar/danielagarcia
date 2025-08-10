// CARROSSEL SIMPLES E FUNCIONAL
console.log('🎠 Carregando carrossel...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM carregado, iniciando carrossel...');
    
    // Elementos
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    // Verificar elementos
    if (!track || !cards.length || !prevBtn || !nextBtn) {
        console.error('❌ Elementos do carrossel não encontrados');
        return;
    }
    
    console.log(`✅ Carrossel encontrado com ${cards.length} cards`);
    
    // Estado
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Função para atualizar posição
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalCards - 1;
        
        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        console.log(`📍 Slide ${currentIndex + 1}/${totalCards}`);
    }
    
    // Próximo slide
    function nextSlide() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Slide anterior
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Ir para slide específico
    function goToSlide(index) {
        if (index >= 0 && index < totalCards) {
            currentIndex = index;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('➡️ Próximo');
        nextSlide();
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬅️ Anterior');
        prevSlide();
    });
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🎯 Indo para slide ${index + 1}`);
            goToSlide(index);
        });
    });
    
    // Touch/Swipe support
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Auto-play (opcional - descomentado se quiser)
    // setInterval(() => {
    //     if (currentIndex < totalCards - 1) {
    //         nextSlide();
    //     } else {
    //         currentIndex = 0;
    //         updateCarousel();
    //     }
    // }, 5000);
    
    // Inicializar
    updateCarousel();
    console.log('✅ Carrossel inicializado com sucesso!');
    
    // Debug global
    window.carousel = {
        next: nextSlide,
        prev: prevSlide,
        goto: goToSlide,
        current: () => currentIndex + 1,
        total: totalCards
    };
    
    console.log('🎮 Use window.carousel para controlar manualmente');
});