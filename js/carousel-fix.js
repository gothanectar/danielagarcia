// CARROSSEL QUE VAI FUNCIONAR - SEM ENROLAÇÃO
console.log('🚀 INICIANDO CARROSSEL DEFINITIVO');

// Aguardar DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM carregado, iniciando carrossel...');
    
    // Elementos
    const track = document.querySelector('.services-track');
    const cards = document.querySelectorAll('.service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    console.log('🔍 Elementos encontrados:');
    console.log('- Track:', !!track);
    console.log('- Cards:', cards.length);
    console.log('- Prev Button:', !!prevBtn);
    console.log('- Next Button:', !!nextBtn);
    
    if (!track || !cards.length || !prevBtn || !nextBtn) {
        console.error('❌ ERRO: Elementos não encontrados!');
        return;
    }
    
    // Estado do carrossel
    let currentIndex = 0;
    const totalCards = cards.length;
    
    console.log(`🎯 Carrossel configurado: ${totalCards} cards`);
    
    // Função para atualizar posição
    function updatePosition() {
        const translateValue = -(currentIndex * 100);
        track.style.transform = `translateX(${translateValue}%)`;
        
        console.log(`📍 Posição: Card ${currentIndex + 1}/${totalCards} (${translateValue}%)`);
        
        // Atualizar botões
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalCards - 1 ? '0.5' : '1';
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalCards - 1;
    }
    
    // Próximo card
    function goNext() {
        if (currentIndex < totalCards - 1) {
            currentIndex++;
            updatePosition();
            console.log('➡️ Próximo card');
        } else {
            console.log('⚠️ Já no último card');
        }
    }
    
    // Card anterior
    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updatePosition();
            console.log('⬅️ Card anterior');
        } else {
            console.log('⚠️ Já no primeiro card');
        }
    }
    
    // Eventos dos botões
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ CLIQUE NEXT');
        goNext();
    });
    
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ CLIQUE PREV');
        goPrev();
    });
    
    // Inicializar
    updatePosition();
    console.log('✅ CARROSSEL INICIALIZADO COM SUCESSO!');
    
    // Objeto global para debug
    window.CAROUSEL = {
        next: goNext,
        prev: goPrev,
        goto: function(index) {
            if (index >= 0 && index < totalCards) {
                currentIndex = index;
                updatePosition();
                console.log(`🎯 Indo para card ${index + 1}`);
            }
        },
        current: () => currentIndex + 1,
        total: totalCards,
        info: () => {
            console.log(`📊 Status: Card ${currentIndex + 1}/${totalCards}`);
            return {current: currentIndex + 1, total: totalCards};
        }
    };
    
    console.log('🎮 Use window.CAROUSEL para controlar:');
    console.log('- window.CAROUSEL.next() - próximo');
    console.log('- window.CAROUSEL.prev() - anterior');
    console.log('- window.CAROUSEL.goto(2) - ir para card 3');
    console.log('- window.CAROUSEL.info() - status atual');
});