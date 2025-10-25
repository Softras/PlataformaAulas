// Variáveis de credenciais SIMPLES (NÃO USE ISSO EM PRODUÇÃO!)
const USUARIO_CORRETO = "admin";
const SENHA_CORRETA = "12345"; // Exemplo de senha.

// Nome do arquivo da sua página principal (a que você já tem criada)
const PAGINA_SECRETA = "secreta.html"; 

document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault(); 

    // 2. Captura os valores digitados pelo usuário
    const usuarioDigitado = document.getElementById('usuario').value;
    const senhaDigitada = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('mensagemErro');

    // 3. Validação SIMPLES
    if (usuarioDigitado == USUARIO_CORRETO && senhaDigitada == SENHA_CORRETA) {       
        // Credenciais corretas: Redireciona para a página secreta
        window.location.href = PAGINA_SECRETA;
    } else {
        // Credenciais incorretas: Exibe uma mensagem de erro
        // mensagemErro.textContent = "Usuário ou senha inválidos. Tente novamente. ";
        mensagemErro.textContent = `${usuarioDigitado}${USUARIO_CORRETO}${senhaDigitada}${SENHA_CORRETA}`;
    }
});