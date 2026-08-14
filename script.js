document.addEventListener("DOMContentLoaded", function () {
    console.log("Script CapacitaPro carregado com sucesso!");

    // Regex para validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Regex para validar senha de APENAS NÚMEROS (mínimo 4 dígitos)
    const senhaApenasNumerosRegex = /^\d{4,}$/;

    // ==========================================
    // 1. VALIDAÇÃO DE LOGIN E CADASTRO
    // ==========================================

    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        if (!form.classList.contains("contact-form")) {
            form.addEventListener("submit", function (e) {
                // Bloqueia a ação padrão do HTML imediatamente
                e.preventDefault();
                e.stopPropagation();

                // Busca inputs independente se o type é email, text ou password
                const inputs = form.querySelectorAll("input, select, textarea");
                const inputFileInput = form.querySelector('input[type="file"]');
                
                let inputEmailOuUser = null;
                let inputPassword = null;

                // Tenta identificar os campos de Login/Senha pelos atributos comuns
                inputs.forEach(input => {
                    const nameOrId = (input.name + " " + input.id + " " + input.type + " " + input.placeholder).toLowerCase();
                    if (nameOrId.includes("email") || nameOrId.includes("usuario") || nameOrId.includes("login") || input.type === "email") {
                        inputEmailOuUser = input;
                    }
                    if (nameOrId.includes("senha") || nameOrId.includes("pass") || input.type === "password") {
                        inputPassword = input;
                    }
                });

                // ------------------------------------------
                // A) FORMULÁRIO DE LOGIN (Sem upload de arquivo)
                // ------------------------------------------
                if (!inputFileInput && !form.classList.contains("form-cadastro")) {
                    
                    if (!inputEmailOuUser || !inputPassword) {
                        alert("Erro: Campos de login ou senha não encontrados no formulário.");
                        return;
                    }

                    const emailVal = inputEmailOuUser.value.trim();
                    const senhaVal = inputPassword.value.trim();

                    // Valida se os campos estão vazios
                    if (emailVal === "" || senhaVal === "") {
                        alert("Por favor, preencha todos os campos para fazer o login!");
                        return;
                    }

                    // Valida E-mail (se for formato de e-mail)
                    if (inputEmailOuUser.type === "email" || emailVal.includes("@")) {
                        if (!emailRegex.test(emailVal)) {
                            alert("Por favor, insira um e-mail válido!");
                            inputEmailOuUser.focus();
                            return;
                        }
                    }

                    // Valida Senha (Deve ser apenas números)
                    if (!senhaApenasNumerosRegex.test(senhaVal)) {
                        alert("A senha deve conter apenas números (no mínimo 4 dígitos)!");
                        inputPassword.focus();
                        return;
                    }

                    // Se passou em tudo -> VAI PARA A PÁGINA DO ALUNO
                    console.log("Login validado com sucesso! Redirecionando...");
                    window.location.href = "aluno.html";
                    return;
                }

                // ------------------------------------------
                // B) FORMULÁRIO DE CADASTRO
                // ------------------------------------------
                if (inputFileInput || form.classList.contains("form-cadastro")) {
                    let todosCamposPreenchidos = true;
                    let campoFaltanteNome = "";

                    // Garante que TODOS os campos visíveis e obrigatórios estejam preenchidos
                    inputs.forEach(input => {
                        if (input.type === "file") {
                            // Exige upload do currículo/arquivo
                            if (!input.files || input.files.length === 0) {
                                todosCamposPreenchidos = false;
                                campoFaltanteNome = "Upload do Currículo";
                            }
                        } else if (input.type !== "submit" && input.type !== "button" && input.value.trim() === "") {
                            todosCamposPreenchidos = false;
                            campoFaltanteNome = input.placeholder || input.name || input.id || "campo obrigatório";
                        }
                    });

                    if (!todosCamposPreenchidos) {
                        alert(`Por favor, preencha todos os dados! Faltou o campo: ${campoFaltanteNome}`);
                        return;
                    }

                    // Valida formato de e-mail no cadastro se houver
                    if (inputEmailOuUser && (inputEmailOuUser.type === "email" || inputEmailOuUser.value.includes("@"))) {
                        if (!emailRegex.test(inputEmailOuUser.value.trim())) {
                            alert("Por favor, insira um e-mail válido no cadastro!");
                            inputEmailOuUser.focus();
                            return;
                        }
                    }

                    // Valida senha numérica no cadastro se houver
                    if (inputPassword && !senhaApenasNumerosRegex.test(inputPassword.value.trim())) {
                        alert("A senha do cadastro deve conter apenas números (mínimo 4 dígitos)!");
                        inputPassword.focus();
                        return;
                    }

                    // Tudo correto -> Cadastra e vai para o aluno.html
                    alert("Cadastro realizado com sucesso!");
                    window.location.href = "aluno.html";
                    return;
                }
            });
        }
    });

    // ==========================================
    // 2. NAVEGAÇÃO DE ABAS E BOTÕES GERAIS
    // ==========================================

    document.addEventListener("click", function (e) {
        const elemento = e.target;
        const texto = elemento.innerText ? elemento.innerText.trim().toLowerCase() : "";

        // Ignora cliques que acontecem DENTRO do formulário para não atrapalhar o Submit/Validação
        if (elemento.closest("form")) {
            return;
        }

        // --- BOTÕES DE MATRÍCULA ---
        if (texto.includes("matricular-se") || texto.includes("matricular se")) {
            e.preventDefault();
            window.location.href = "cadastro.html";
            return;
        }

        // --- ABAS DO CURSO DE PRIMEIROS SOCORROS ---
        if (texto.includes("conteúdo programático") || texto.includes("conteudo programatico")) {
            e.preventDefault();
            window.location.href = "cursoPSCRR2.html";
            return;
        }

        if (texto.includes("instrutor")) {
            e.preventDefault();
            window.location.href = "cursoPSCRR3.html";
            return;
        }

        if (texto.includes("avaliações") || texto.includes("avaliacoes")) {
            e.preventDefault();
            window.location.href = "cursoPSCRR4.html";
            return;
        }

        if (texto.includes("sobre o curso")) {
            e.preventDefault();
            window.location.href = "cursoPSCRR.html";
            return;
        }

        // --- SAIBA MAIS NOS CARDS DE CURSOS ---
        if (texto === "saiba mais" || elemento.classList.contains("btn-saiba-mais")) {
            const card = elemento.closest(".course-card");
            if (card && card.textContent.toLowerCase().includes("primeiros socorros")) {
                e.preventDefault();
                window.location.href = "cursoPSCRR.html"; 
                return;
            }
        }
    });

    // ==========================================
    // 3. CONFIGURAÇÃO DE LINKS DO MENU SUPERIOR
    // ==========================================

    function configurarLink(idDoElemento, paginaDestino) {
        let elemento = document.getElementById(idDoElemento);
        if (elemento) {
            elemento.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = paginaDestino;
            });
        }
    }

    configurarLink("nav-inicio", "index.html");
    configurarLink("nav-cursos", "cursos.html");
    configurarLink("nav-sobre", "sobre.html");
    configurarLink("nav-contato", "contato.html");
    configurarLink("btn-entrar", "login.html");
    configurarLink("btn-cadastrar", "cadastro.html");

    // Botão Voltar
    const botoesVoltar = document.querySelectorAll(".btn-voltar, .back-link");
    botoesVoltar.forEach(botao => {
        botao.addEventListener("click", function (event) {
            if (!this.getAttribute("href") || this.getAttribute("href") === "#") {
                event.preventDefault();
                window.history.back();
            }
        });
    });

    // ==========================================
    // 4. FILTRAGEM DE CURSOS
    // ==========================================
    const btnFiltrar = document.getElementById("btn-filtrar") || document.getElementById("btn-filtrar-v2");
    const btnLimpar = document.getElementById("btn-limpar") || document.getElementById("btn-limpar-v2");

    function filtrarCursos() {
        const inputArea = document.getElementById("filter-area");
        const inputNivel = document.getElementById("filter-nivel");
        const inputStatus = document.getElementById("filter-status");
        const inputBusca = document.getElementById("search-input") || document.getElementById("input-busca-v2");

        const areaAlvo = inputArea ? inputArea.value.toLowerCase() : "all";
        const nivelAlvo = inputNivel ? inputNivel.value.toLowerCase() : "all";
        const statusAlvo = inputStatus ? inputStatus.value.toLowerCase() : "all";
        const buscaTexto = inputBusca ? inputBusca.value.toLowerCase() : "";

        const cards = document.querySelectorAll(".course-card");

        cards.forEach(card => {
            const areaCard = (card.getAttribute("data-area") || "").toLowerCase();
            const nivelCard = (card.getAttribute("data-nivel") || "").toLowerCase();
            const statusCard = (card.getAttribute("data-status") || "").toLowerCase();
            const nomeCard = card.textContent.toLowerCase();

            const bateArea = (areaAlvo === "all" || areaAlvo === "selecione" || areaAlvo === areaCard);
            const bateNivel = (nivelAlvo === "all" || nivelAlvo === "nível" || nivelAlvo === nivelCard);
            const bateStatus = (statusAlvo === "all" || statusAlvo === "status" || statusAlvo === statusCard);
            const bateBusca = (buscaTexto === "" || nomeCard.includes(buscaTexto));

            card.style.display = (bateArea && bateNivel && bateStatus && bateBusca) ? "block" : "none";
        });
    }

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", function (e) {
            e.preventDefault();
            filtrarCursos();
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function (e) {
            e.preventDefault();
            if (document.getElementById("filter-area")) document.getElementById("filter-area").value = "all";
            if (document.getElementById("filter-nivel")) document.getElementById("filter-nivel").value = "all";
            if (document.getElementById("filter-status")) document.getElementById("filter-status").value = "all";
            
            const buscaInput = document.getElementById("search-input") || document.getElementById("input-busca-v2");
            if (buscaInput) buscaInput.value = "";

            filtrarCursos();
        });
    }
});