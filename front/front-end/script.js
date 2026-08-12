// Espera todo o HTML carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Configurando os links do menu de navegação (Nav)
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Evita que o link apenas adicione um "#" na URL
            
            const textoLink = this.innerText.trim();
            
            if (textoLink === "Início") {
                window.location.href = "index.html"; // Vai para a página inicial
            } else if (textoLink === "Cursos") {
                window.location.href = "cursos.html"; // Vai para a página de cursos
            } else if (textoLink === "Sobre") {
                window.location.href = "sobre.html"; // Vai para a página sobre
            } else if (textoLink === "Contato") {
                window.location.href = "contato.html"; // Vai para a página de contato
            }
        });
    });

    // 2. Configurando o botão "Conhecer Cursos" (Hero Section)
    const btnConhecerCursos = document.querySelector(".hero-content .btn-solid-large");
    if (btnConhecerCursos) {
        btnConhecerCursos.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "cursos.html";
        });
    }

    // 3. Configurando o botão "Começar Agora" (Final CTA Section)
    const btnComecarAgora = document.querySelector(".final-cta .btn-solid-large");
    if (btnComecarAgora) {
        btnComecarAgora.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "cadastro.html";
        });
    }

    // Bônus: Configurando também o botão "Cadastrar-se" do cabeçalho
    const btnCadastrarHeader = document.querySelector("header .btn-solid");
    if (btnCadastrarHeader) {
        btnCadastrarHeader.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "cadastro.html";
        });
    }
    // 4. Configurando o botão "Entrar" do cabeçalho
    const btnEntrarHeader = document.querySelector("header .btn-outline");
    if (btnEntrarHeader) {
        btnEntrarHeader.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "login.html"; // Redireciona para a página de login
        });
    }
});
document.addEventListener("DOMContentLoaded", function() {

    // 1. Configurando os links do menu (Início, Sobre, Contato)
    // O seletor abaixo funciona tanto para o seu 1º quanto para o 2º HTML que você enviou
    const navLinks = document.querySelectorAll("nav a"); 
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            const textoLink = this.innerText.trim();
            
            if (textoLink === "Início") {
                window.location.href = "index.html"; // ou inicio.html, dependendo de como você salvou
            } else if (textoLink === "Sobre") {
                window.location.href = "sobre.html";
            } else if (textoLink === "Contato") {
                window.location.href = "contato.html";
            }
        });
    });

    // 2. Configurando a opção de Retornar à página anterior
    // Ele vai procurar qualquer botão ou link que tenha a classe "btn-voltar"
    const botoesVoltar = document.querySelectorAll(".btn-voltar");
    
    botoesVoltar.forEach(botao => {
        botao.addEventListener("click", function(event) {
            event.preventDefault();
            window.history.back(); // Esta é a mágica do JS que faz voltar para a página anterior!
        });
    });

    // 3. Mantendo os outros botões que você já tinha (Explorar, Entrar, etc.)
    const btnExplorar = document.querySelector(".btn-green-large");
    if (btnExplorar) {
        btnExplorar.addEventListener("click", function() {
            window.location.href = "cursos.html";
        });
    }

    const btnEntrar = document.querySelector(".btn-blue, .btn-outline");
    if (btnEntrar) {
        btnEntrar.addEventListener("click", function() {
            window.location.href = "entrar.html"; 
        });
    }

    const btnCadastrar = document.querySelector(".btn-green");
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", function() {
            window.location.href = "cadastro.html";
        });
    }

    const btnComecarAgora = document.querySelector(".btn-green-glow, .btn-solid-large");
    if (btnComecarAgora) {
        btnComecarAgora.addEventListener("click", function() {
            window.location.href = "cadastro.html";
        });
    }
    // Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", function() {

    // 1. Botões "Entrar" (Pega tanto o do cabeçalho quanto o link de texto no formulário)
    const botoesEntrar = document.querySelectorAll(".btn-outline, .login-link a");
    botoesEntrar.forEach(botao => {
        botao.addEventListener("click", function(event) {
            event.preventDefault(); // Evita recarregar a tela
            window.location.href = "login.html"; // Redireciona para o Login
        });
    });

    // 2. Botão "Cadastrar-se" no cabeçalho (Ficar na mesma página)
    const btnCadastrarHeader = document.querySelector(".header-buttons .btn-solid");
    if (btnCadastrarHeader) {
        btnCadastrarHeader.addEventListener("click", function(event) {
            event.preventDefault(); 
            // Ao não colocar nenhum window.location aqui, o usuário 
            // simplesmente permanece na tela sem recarregar e perder os dados.
        });
    }

    // 3. Botão "Finalizar Cadastro e Efetivar Matrícula"
    const btnFinalizar = document.querySelector(".summary-section .btn-primary-block");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function(event) {
            event.preventDefault();
            
            // Aqui ele direciona para a página inicial. 
            // Se o seu arquivo inicial se chamar "inicio.html", basta trocar abaixo!
            window.location.href = "index.html"; 
        });
    }
});
});
// Aguarda o HTML carregar completamente
document.addEventListener("DOMContentLoaded", function() {

    // 1. Botões "Entrar" (Pega tanto o do cabeçalho quanto o link de texto no formulário)
    const botoesEntrar = document.querySelectorAll(".btn-outline, .login-link a");
    botoesEntrar.forEach(botao => {
        botao.addEventListener("click", function(event) {
            event.preventDefault(); // Evita recarregar a tela
            window.location.href = "login.html"; // Redireciona para o Login
        });
    });

    // 2. Botão "Cadastrar-se" no cabeçalho (Ficar na mesma página)
    const btnCadastrarHeader = document.querySelector(".header-buttons .btn-solid");
    if (btnCadastrarHeader) {
        btnCadastrarHeader.addEventListener("click", function(event) {
            event.preventDefault(); 
            // Ao não colocar nenhum window.location aqui, o usuário 
            // simplesmente permanece na tela sem recarregar e perder os dados.
        });
    }

    // 3. Botão "Finalizar Cadastro e Efetivar Matrícula"
    const btnFinalizar = document.querySelector(".summary-section .btn-primary-block");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function(event) {
            event.preventDefault();
            
            // Aqui ele direciona para a página inicial. 
            // Se o seu arquivo inicial se chamar "inicio.html", basta trocar abaixo!
            window.location.href = "index.html"; 
        });
    }

});
// Garante que o código só vai rodar depois que a página HTML carregar totalmente
document.addEventListener("DOMContentLoaded", function() {

    // Função auxiliar para não repetir código
    function configurarLink(idDoElemento, paginaDestino) {
        let elemento = document.getElementById(idDoElemento);
        if (elemento) {
            elemento.addEventListener("click", function(event) {
                event.preventDefault(); // Impede o navegador de pular para o topo da página com o "#"
                window.location.href = paginaDestino; // Redireciona para o arquivo correto
            });
        }
    }

    // 1. Links do Menu de Navegação
    configurarLink("nav-inicio", "inicio.html");
    configurarLink("nav-cursos", "cursos.html");
    configurarLink("nav-contato", "contato.html");

    // 2. Botões do Cabeçalho (Header)
    configurarLink("btn-entrar", "login.html");
    configurarLink("btn-cadastrar", "cadastro.html");

    // 3. Botões da Página (Hero e Final)
    configurarLink("btn-conhecer-cursos", "cursos.html");
    configurarLink("btn-comecar", "cadastro.html"); // Leva para o cadastro

});
document.addEventListener("DOMContentLoaded"), function() {}

    // ==========================================
    // 1. SISTEMA DE NAVEGAÇÃO ENTRE PÁGINAS
    // ==========================================
    function configurarLink(idDoElemento, paginaDestino) {
        let elemento = document.getElementById(idDoElemento);
        if (elemento) {
            elemento.addEventListener("click", function(event) {
                event.preventDefault(); 
                event.stopPropagation(); // <-- ISSO IMPEDE O CLIQUE DE VAZAR PARA OUTROS BOTÕES
                window.location.href = paginaDestino; 
            });
        }
    }

    // Configurando os menus e botões de cima
    configurarLink("nav-inicio", "inicio.html");
    configurarLink("nav-sobre", "sobre.html");
    configurarLink("nav-contato", "contato.html");
    configurarLink("btn-entrar", "login.html");
    configurarLink("btn-cadastrar", "cadastro.html");


    // ==========================================
    // 2. SISTEMA DE FILTRAGEM (BLINDADO)
    // ==========================================
    const btnFiltrar = document.getElementById("btn-filtrar");
    const btnLimpar = document.getElementById("btn-limpar");
    const todosOsCursos = document.querySelectorAll(".course-card");

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", function(event) {
            // As duas linhas abaixo garantem que o botão só vai filtrar e não vai abrir links
            event.preventDefault();
            event.stopPropagation(); 

            const areaEscolhida = document.getElementById("filter-area").value;
            const nivelEscolhido = document.getElementById("filter-nivel").value;
            const statusEscolhido = document.getElementById("filter-status").value;
            const textoBusca = document.getElementById("search-input").value.toLowerCase();

            todosOsCursos.forEach(function(curso) {
                // Pegando as etiquetas invisíveis de cada curso
                const areaDoCurso = curso.getAttribute("data-area") || "";
                const nivelDoCurso = curso.getAttribute("data-nivel") || "";
                const statusDoCurso = curso.getAttribute("data-status") || "";
                
                const tagElemento = curso.querySelector(".course-tag");
                const nomeDoCurso = tagElemento ? tagElemento.textContent.toLowerCase() : "";

                let deveMostrar = true;

                // Verificando se o curso passa nos filtros
                if (areaEscolhida !== "Selecione" && areaDoCurso !== areaEscolhida) {
                    deveMostrar = false;
                }
                if (nivelEscolhido !== "Nível" && nivelDoCurso !== nivelEscolhido) {
                    deveMostrar = false;
                }
                if (statusEscolhido !== "Status" && statusDoCurso !== statusEscolhido) {
                    deveMostrar = false;
                }
                if (textoBusca !== "" && !nomeDoCurso.includes(textoBusca)) {
                    deveMostrar = false;
                }

                // Mostra ou esconde
                curso.style.display = deveMostrar ? "block" : "none";
            });
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            // Reseta as caixas de seleção
            document.getElementById("filter-area").value = "Selecione";
            document.getElementById("filter-nivel").value = "Nível";
            document.getElementById("filter-status").value = "Status";
            document.getElementById("search-input").value = "";

            // Volta a mostrar todos os cursos
            todosOsCursos.forEach(function(curso) {
                curso.style.display = "block"; 
            });
        });
    }

document.addEventListener("DOMContentLoaded", function() {
    console.log("Filtro CapacitaPro Ativado!");

    const btnFiltrar = document.getElementById("btn-filtrar-v2");
    const btnLimpar = document.getElementById("btn-limpar-v2");

    function filtrarCursos() {
        const areaAlvo = document.getElementById("filter-area").value;
        const nivelAlvo = document.getElementById("filter-nivel").value;
        const statusAlvo = document.getElementById("filter-status").value;
        const buscaTexto = document.getElementById("input-busca-v2").value.toLowerCase();

        const cards = document.querySelectorAll(".course-card");

        cards.forEach(card => {
            const areaCard = card.getAttribute("data-area");
            const nivelCard = card.getAttribute("data-nivel");
            const statusCard = card.getAttribute("data-status");
            const nomeCard = card.textContent.toLowerCase();

            const bateArea = (areaAlvo === "all" || areaAlvo === areaCard);
            const bateNivel = (nivelAlvo === "all" || nivelAlvo === nivelCard);
            const bateStatus = (statusAlvo === "all" || statusAlvo === statusCard);
            const bateBusca = (buscaTexto === "" || nomeCard.includes(buscaTexto));

            if (bateArea && bateNivel && bateStatus && bateBusca) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", function(e) {
            e.preventDefault();
            filtrarCursos();
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function(e) {
            e.preventDefault();
            document.getElementById("filter-area").value = "all";
            document.getElementById("filter-nivel").value = "all";
            document.getElementById("filter-status").value = "all";
            document.getElementById("input-busca-v2").value = "";
            filtrarCursos();
        });
    }
document.addEventListener("DOMContentLoaded", function() {
    // Esta função faz os botões funcionarem em QUALQUER página
    document.body.addEventListener("click", function(event) {
        const elemento = event.target;
        
        // Verifica se clicou em um link ou botão que tenha esses textos
        const texto = elemento.innerText.trim();

        if (texto === "Início") {
            window.location.href = "inicio.html";
        } else if (texto === "Cursos" || texto === "Explorar Treinamentos") {
            window.location.href = "cursos.html";
        } else if (texto === "Sobre") {
            window.location.href = "sobre.html";
        } else if (texto === "Contato") {
            window.location.href = "contato.html";
        } else if (texto === "Entrar") {
            window.location.href = "login.html";
        } else if (texto === "Cadastrar-se" || texto === "Começar Agora") {
            window.location.href = "cadastro.html";
        }
    });

    // Configuração do formulário de contato
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Mensagem enviada com sucesso!");
            form.reset();
        });
    }
}  