/* ========================================
   SISTEMA DE REPRODUÇÃO AUTOMATIZADA DE VÍDEO
   ========================================
   
   Para Programadores Python:
   - Este arquivo contém toda a lógica em JavaScript simplificada
   - JavaScript é uma linguagem de programação similar ao Python
   - As funções em JS são como métodos em Python
   - Objetos em JS são como dicionários em Python
   - Eventos em JS são como Callbacks em Python
   
   Funcionalidades principais:
   1. Reprodução automática de vídeo em tela cheia
   2. Pausa automática em tempo específico (segundos)
   3. Exibição de elementos sobrepostos (uma única vez)
   4. Interação do usuário para retomar
   5. Configurações fixas em pixels (não porcentagem)
   6. Um único botão para iniciar tudo
   ======================================== */

/* ========================================
   CONFIGURAÇÕES FIXAS (EM PIXELS)
   ======================================== */

const configuracoes = {
    // Configurações do GIF Professor (em pixels)
    professor: {
        width: 200,      // Largura em pixels
        height: 200,     // Altura em pixels
        x: 1790,          // Posição X em pixels (da esquerda)
        y: 860           // Posição Y em pixels (do topo)
    },
    
    // Tempo de pausa em segundos (3 minutos = 180 segundos)
    pauseTime: 145,
    
    // Configurações do GIF Seta (em pixels)
    seta: {
        width: 40,       // Largura em pixels
        height: 40,      // Altura em pixels
        x: 635,         // Posição X em pixels (da esquerda)
        y: 15            // Posição Y em pixels (do topo)
    },
    
    // Configurações do retângulo (em pixels)
    retangulo: {
        width: 75,      // Largura em pixels
        height: 40,     // Altura em pixels
        x: 610,          // Posição X em pixels (do centro)
        y: 70           // Posição Y em pixels (do centro)
    }
};

/* ========================================
   VARIÁVEIS GLOBAIS
   ======================================== */

let pauseTriggered = false;     // Controle para evitar múltiplas pausas
let elementosExibidos = false;  // Controle para não mostrar elementos novamente

/* ========================================
   FUNÇÃO PRINCIPAL - INICIAR TUDO
   ======================================== */

/**
 * FUNÇÃO: iniciarSistema()
 * PROPÓSITO: Função principal que inicia todo o sistema
 * PASSOS:
 *   1. Ocultar botão de início
 *   2. Tentar colocar em tela cheia
 *   3. Aplicar configurações
 *   4. Configurar eventos
 *   5. Iniciar reprodução
 */
function iniciarSistema() {
    try {
        console.log("🚀 Iniciando sistema de reprodução...");
        
        // PASSO 1: Ocultar botão de início
        const startButton = document.getElementById('startButton');
        startButton.classList.add('hidden');
        
        // PASSO 2: Tentar colocar em tela cheia
        solicitarTelaCheia();
        
        // PASSO 3: Aplicar as configurações fixas aos elementos
        aplicarConfiguracoes();
        
        // PASSO 4: Configurar eventos dos elementos
        configurarEventosVideo();
        configurarEventosRetangulo();
        
        // PASSO 5: Iniciar reprodução
        iniciarReproducao();
        
        console.log("✅ Sistema iniciado com sucesso!");
        console.log(`📊 Configurações ativas:`, configuracoes);
        
    } catch (error) {
        console.error("❌ Erro ao iniciar o sistema:", error);
    }
}

/* ========================================
   SOLICITAR TELA CHEIA
   ======================================== */

/**
 * FUNÇÃO: solicitarTelaCheia()
 * PROPÓSITO: Solicita ao usuário para entrar em modo tela cheia
 * FUNCIONAMENTO: Usa a Fullscreen API do navegador
 */
function solicitarTelaCheia() {
    const element = document.documentElement; // Tentar toda a página
    
    if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
            console.log("🖥️ Tela cheia ativada com sucesso!");
        }).catch(error => {
            console.log("⚠️ Não foi possível ativar tela cheia:", error);
            console.log("💡 Pressione F11 manualmente para tela cheia");
        });
    } else if (element.webkitRequestFullscreen) { // Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE
        element.msRequestFullscreen();
    } else {
        console.log("⚠️ Fullscreen API não suportada neste navegador");
        console.log("💡 Pressione F11 para entrar em tela cheia");
    }
}

/* ========================================
   APLICAR CONFIGURAÇÕES (EM PIXELS)
   ======================================== */

/**
 * FUNÇÃO: aplicarConfiguracoes()
 * PROPÓSITO: Atualiza os estilos dos elementos com base nas configurações fixas
 * FUNCIONAMENTO: Modifica propriedades CSS via JavaScript
 */
function aplicarConfiguracoes() {
    const professorGif = document.getElementById('professorGif');
    const setaGif = document.getElementById('setaGif');
    const redOverlay = document.getElementById('redOverlay');
    
    // Configurar GIF do Professor (posição em pixels)
    professorGif.style.width = configuracoes.professor.width + 'px';
    professorGif.style.height = configuracoes.professor.height + 'px';
    professorGif.style.left = configuracoes.professor.x + 'px';
    professorGif.style.top = configuracoes.professor.y + 'px';
    professorGif.style.transform = 'translate(-50%, -50%)';
    
    // Configurar GIF da Seta (posição em pixels)
    setaGif.style.width = configuracoes.seta.width + 'px';
    setaGif.style.height = configuracoes.seta.height + 'px';
    setaGif.style.left = configuracoes.seta.x + 'px';
    setaGif.style.top = configuracoes.seta.y + 'px';
    
    // Configurar Retângulo (posição em pixels)
    redOverlay.style.width = configuracoes.retangulo.width + 'px';
    redOverlay.style.height = configuracoes.retangulo.height + 'px';
    redOverlay.style.left = configuracoes.retangulo.x + 'px';
    redOverlay.style.top = configuracoes.retangulo.y + 'px';
    redOverlay.style.transform = 'translate(-50%, -50%)';
    
    console.log("⚙️ Configurações aplicadas aos elementos (em pixels)");
}

/* ========================================
   INICIAR REPRODUÇÃO
   ======================================== */

/**
 * FUNÇÃO: iniciarReproducao()
 * PROPÓSITO: Inicia reprodução do vídeo
 */
function iniciarReproducao() {
    const video = document.getElementById('mainVideo');
    
    // Mostrar o vídeo
    video.classList.add('playing');
    
    // Configurar para repetir (loop)
    video.loop = true;
    
    // Tentar reproduzir
    video.play()
        .then(() => {
            console.log("▶️ Reprodução do vídeo iniciada com sucesso!");
            console.log(`⏱️ Vídeo começando do tempo: ${formatarTempo(video.currentTime)}`);
        })
        .catch(error => {
            console.error("❌ Erro ao iniciar reprodução do vídeo:", error);
            alert("❌ Erro ao reproduzir vídeo. Verifique se o arquivo existe.");
        });
}

/* ========================================
   CONFIGURAR EVENTOS DO VÍDEO
   ======================================== */

/**
 * FUNÇÃO: configurarEventosVideo()
 * PROPÓSITO: Configura todos os eventos relacionados ao vídeo
 * EVENTOS: timeupdate, ended, canplay, etc.
 */
function configurarEventosVideo() {
    const video = document.getElementById('mainVideo');
    
    // EVENTO: timeupdate (executa durante a reprodução)
    video.addEventListener('timeupdate', function() {
        // Verificar se atingimos o tempo de pausa configurado (em segundos)
        if (!pauseTriggered && !elementosExibidos && this.currentTime >= configuracoes.pauseTime) {
            pausarVideo();
        }
    });
    
    // EVENTO: ended (quando o vídeo termina)
    video.addEventListener('ended', function() {
        console.log("🎬 Vídeo terminado - reiniciando loop");
        // Reiniciar para manter o loop
        this.currentTime = 0;
    });
    
    // EVENTO: canplay (quando o vídeo pode ser reproduzido)
    video.addEventListener('canplay', function() {
        console.log("▶️ Vídeo pronto para reproduzir");
    });
    
    // EVENTO: loadstart (quando começa a carregar)
    video.addEventListener('loadstart', function() {
        console.log("📥 Iniciando carregamento do vídeo");
    });
}

/* ========================================
   PAUSAR VÍDEO E MOSTRAR ELEMENTOS
   ======================================== */

/**
 * FUNÇÃO: pausarVideo()
 * PROPÓSITO: Pausa o vídeo e mostra elementos sobrepostos
 * EXECUTADA: Quando o tempo do vídeo atinge o valor configurado (apenas uma vez)
 */
function pausarVideo() {
    pauseTriggered = true;       // Marcar que a pausa já foi disparada
    elementosExibidos = true;    // Marcar que os elementos foram exibidos
    const video = document.getElementById('mainVideo');
    
    // Pausar vídeo
    video.pause();
    
    console.log("⏸️ Reprodução pausada no tempo:", formatarTempo(video.currentTime));
    console.log("📍 Tempo de pausa configurado:", formatarTempo(configuracoes.pauseTime));
    
    // Mostrar elementos sobrepostos (uma única vez)
    mostrarElementosSobrepostos();
}

/* ========================================
   MOSTRAR ELEMENTOS SOBREPOSTOS
   ======================================== */

/**
 * FUNÇÃO: mostrarElementosSobrepostos()
 * PROPÓSITO: Torna visíveis todos os elementos que aparecem sobre o vídeo
 * ELEMENTOS: Professor.gif, Seta.gif, Retângulo vermelho
 * NOTA: Esta função é executada apenas uma vez
 */
function mostrarElementosSobrepostos() {
    const professorGif = document.getElementById('professorGif');
    const redOverlay = document.getElementById('redOverlay');
    const setaGif = document.getElementById('setaGif');
    
    // Mostrar com animação suave
    professorGif.style.display = 'block';
    professorGif.classList.add('fade-in');
    
    redOverlay.style.display = 'block';
    redOverlay.classList.add('slide-in');
    
    setaGif.style.display = 'block';
    setaGif.classList.add('fade-in');
    
    console.log("👨‍🏫 Elementos sobrepostos exibidos (uma única vez)");
    console.log("💡 Clique no retângulo vermelho para continuar");
}

/* ========================================
   CONFIGURAR EVENTOS DO RETÂNGULO
   ======================================== */

/**
 * FUNÇÃO: configurarEventosRetangulo()
 * PROPÓSITO: Configura interações com o retângulo vermelho clicável
 */
function configurarEventosRetangulo() {
    const redOverlay = document.getElementById('redOverlay');
    
    // EVENTO: clique no retângulo
    redOverlay.addEventListener('click', function() {
        console.log("🖱️ Clique detectado no retângulo");
        retomarVideo();
        
        // Feedback visual
        this.classList.add('bounce');
        setTimeout(() => {
            this.classList.remove('bounce');
        }, 600);
    });
    
    // Efeitos visuais quando mouse passa sobre o retângulo
    redOverlay.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 0, 0, 0.7)';
    });
    
    redOverlay.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 0, 0, 0.5)';
    });
}

/* ========================================
   RETOMAR REPRODUÇÃO
   ======================================== */

/**
 * FUNÇÃO: retomarVideo()
 * PROPÓSITO: Remove elementos sobrepostos permanentemente e retoma reprodução
 * EXECUTADA: Quando usuário clica no retângulo (uma única vez)
 */
function retomarVideo() {
    const video = document.getElementById('mainVideo');
    
    // Ocultar elementos sobrepostos permanentemente
    ocultarElementosSobrepostos();
    
    // Retomar reprodução
    video.play()
        .then(() => {
            console.log("▶️ Reprodução retomada! Elementos removidos permanentemente.");
            console.log("✅ Sistema prosseguirá normalmente até o final do vídeo");
            
            // IMPORTANTE: Não resetar as variáveis de controle para evitar nova exibição
            // pauseTriggered e elementosExibidos permanecem true
            
        })
        .catch(error => {
            console.error("❌ Erro ao retomar reprodução:", error);
        });
}

/* ========================================
   OCULTAR ELEMENTOS SOBREPOSTOS
   ======================================== */

/**
 * FUNÇÃO: ocultarElementosSobrepostos()
 * PROPÓSITO: Remove todos os elementos sobrepostos permanentemente da tela
 */
function ocultarElementosSobrepostos() {
    const professorGif = document.getElementById('professorGif');
    const redOverlay = document.getElementById('redOverlay');
    const setaGif = document.getElementById('setaGif');
    
    professorGif.style.display = 'none';
    redOverlay.style.display = 'none';
    setaGif.style.display = 'none';
    
    console.log("🙈 Elementos sobrepostos removidos permanentemente");
}

/* ========================================
   FUNÇÕES DE UTILIDADE
   ======================================== */

/**
 * FUNÇÃO: formatarTempo()
 * PROPÓSITO: Converte segundos em formato MM:SS
 * EXEMPLO: 186 segundos -> "3:06"
 */
function formatarTempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/* ========================================
   FUNÇÕES DE DEBUG E TESTE
   ======================================== */

/**
 * FUNÇÃO: testConfig()
 * USO: Digite no console: testConfig()
 * PROPÓSITO: Mostra estado atual do sistema para debug
 */
function testConfig() {
    console.log("🔧 === DIAGNÓSTICO DO SISTEMA ===");
    console.log("📋 Configurações fixas (em pixels):", configuracoes);
    
    const video = document.getElementById('mainVideo');
    
    console.log("🎬 Estado do vídeo:", {
        currentTime: formatarTempo(video.currentTime),
        duration: formatarTempo(video.duration || 0),
        paused: video.paused,
        ended: video.ended,
        readyState: video.readyState
    });
    
    console.log("🎯 Variáveis de controle:", {
        pauseTriggered: pauseTriggered,
        elementosExibidos: elementosExibidos
    });
    
    console.log("👁️ Estado dos elementos visuais:", {
        professorGif: document.getElementById('professorGif').style.display,
        redOverlay: document.getElementById('redOverlay').style.display,
        setaGif: document.getElementById('setaGif').style.display
    });
    
    console.log("================================");
}

/**
 * FUNÇÃO: modificarConfiguracao()
 * USO: Digite no console: modificarConfiguracao('professor', 'width', 250)
 * PROPÓSITO: Modifica uma configuração específica em tempo real
 * PARÂMETROS: (elemento, propriedade, novoValor)
 */
function modificarConfiguracao(elemento, propriedade, novoValor) {
    if (configuracoes[elemento] && configuracoes[elemento].hasOwnProperty(propriedade)) {
        configuracoes[elemento][propriedade] = novoValor;
        console.log(`✅ Configuração modificada: ${elemento}.${propriedade} = ${novoValor}`);
        
        // Reaplicar configurações
        aplicarConfiguracoes();
        
        return true;
    } else {
        console.log(`❌ Configuração inválida: ${elemento}.${propriedade}`);
        return false;
    }
}

/* ========================================
   INICIALIZAÇÃO AUTOMÁTICA
   ======================================== */

// Esta função é executada automaticamente quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 === SISTEMA DE REPRODUÇÃO AUTOMATIZADO CARREGADO ===");
    console.log("📝 Para programadores Python:");
    console.log("   - Um único botão para iniciar tudo");
    console.log("   - Configurações em pixels (não porcentagem)");
    console.log("   - Tempo de pausa em segundos");
    console.log("   - Tela cheia automática");
    console.log("   - Elementos aparecem apenas uma vez");
    console.log("   - O retângulo não contém texto");
    console.log("");
    console.log("🎯 COMO USAR:");
    console.log("   1. Clique no botão 'Iniciar Vídeo e Áudio'");
    console.log("   2. Sistema entra em tela cheia automaticamente");
    console.log("   3. No tempo configurado (3 min), elementos aparecem");
    console.log("   4. Clique no retângulo para continuar");
    console.log("   5. Elementos desaparecem permanentemente");
    console.log("");
    console.log("🔧 COMANDOS PARA DEBUG (Console do navegador):");
    console.log("   - testConfig()  → Ver estado do sistema");
    console.log("   - modificarConfiguracao('professor', 'x', 600) → Modificar posição X");
    console.log("   - modificarConfiguracao('professor', 'width', 250) → Modificar largura");
    console.log("==================================================");
    
    // Configurar evento do botão de início
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', iniciarSistema);
});

// Exportar funções para uso global
window.iniciarSistema = iniciarSistema;
window.testConfig = testConfig;
window.modificarConfiguracao = modificarConfiguracao;