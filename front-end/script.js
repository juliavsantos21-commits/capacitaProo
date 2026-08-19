document.addEventListener("DOMContentLoaded", function () {
    console.log("Script CapacitaPro carregado com sucesso!");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const senhaApenasNumerosRegex = /^\d{4,}$/;

    // ==========================================
    // CARREGAR DADOS DO ALUNO (ALUNO.HTML E PERFIL.HTML)
    // ==========================================
    const usuarioSalvo = localStorage.getItem("usuarioLogado");

    const elNomeAluno = document.getElementById("nome-aluno-header");
    const elAvatarAluno = document.getElementById("avatar-aluno-header");

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        // Mapeamento tolerante a variações de maiúsculas/minúsculas vindas do C#
        const nomeVal = usuario.nome || usuario.Nome || "";
        const emailVal = usuario.email || usuario.Email || "";
        const instVal = usuario.instituicao || usuario.Instituicao || usuario.estruturaCurricular || usuario.EstruturaCurricular || "";
        const anoVal = usuario.anoConclusao || usuario.AnoConclusao || usuario.ano || usuario.Ano || "";

        const primeiroNome = nomeVal ? nomeVal.split(" ")[0] : "Aluno(a)";
        const inicial = primeiroNome.charAt(0).toUpperCase();

        // Atualiza a navbar (aluno.html e perfil.html)
        if (elNomeAluno) {
            elNomeAluno.innerHTML = `Olá, <strong>${primeiroNome}</strong>`;
        }

        if (elAvatarAluno) {
            elAvatarAluno.textContent = inicial;
        }

        // Preenche o formulário da tela de Perfil (perfil.html)
        const inputNome = document.getElementById("nome");
        const inputEmail = document.getElementById("email");
        const inputInst = document.getElementById("instituicao");
        const inputAno = document.getElementById("ano");
        const tituloPerfil = document.getElementById("perf-titulo-nome");
        const avatarGrande = document.getElementById("perf-avatar-large");

        if (inputNome) {
            inputNome.value = nomeVal;
            inputEmail.value = emailVal;
            if (inputInst) inputInst.value = instVal;
            if (inputAno) inputAno.value = anoVal;
            if (tituloPerfil) tituloPerfil.textContent = `Perfil de ${primeiroNome}`;
            if (avatarGrande) avatarGrande.textContent = inicial;
        }
    } else {
        // Redireciona para o login caso tente acessar áreas restritas sem autenticação
        const paginaAtual = window.location.pathname;
        if (paginaAtual.includes("aluno.html") || paginaAtual.includes("perfil.html")) {
            window.location.href = "login.html";
        }
    }

    // ==========================================
    // SALVAR ALTERAÇÕES DO PERFIL LOCALMENTE
    // ==========================================
    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", function (e) {
            e.preventDefault();

            let usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : {};

            usuario.nome = document.getElementById("nome")?.value.trim() || usuario.nome;
            usuario.email = document.getElementById("email")?.value.trim() || usuario.email;
            usuario.instituicao = document.getElementById("instituicao")?.value.trim() || "";
            usuario.anoConclusao = document.getElementById("ano")?.value.trim() || "";

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            alert("Perfil atualizado com sucesso!");
            window.location.reload();
        });
    }

    // ==========================================
    // LOGOUT
    // ==========================================
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            localStorage.removeItem("usuarioLogado");
            alert("Sessão encerrada com sucesso!");
            window.location.href = "login.html";
        });
    }

    // ==========================================
    // 1. UPLOAD DE ARQUIVO (EFEITO VISUAL)
    // ==========================================
    const inputCurriculo = document.getElementById("cad-curriculo");
    const labelArquivo = document.getElementById("nome-arquivo-selecionado");

    if (inputCurriculo && labelArquivo) {
        inputCurriculo.addEventListener("change", function () {
            if (this.files && this.files.length > 0) {
                labelArquivo.textContent = `📎 Arquivo: ${this.files[0].name}`;
                labelArquivo.style.color = "#00ffcc";
            } else {
                labelArquivo.textContent = "Nenhum arquivo selecionado";
            }
        });
    }

    // ==========================================
    // 2. PROCESSAR CADASTRO E ALERTAS
    // ==========================================
    function processarCadastro(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const nomeVal = document.getElementById("cad-nome")?.value.trim() || "";
        const emailVal = document.getElementById("cad-email")?.value.trim() || "";
        const senhaVal = document.getElementById("cad-senha")?.value.trim() || "";
        const confirmaSenhaVal = document.getElementById("cad-confirma-senha")?.value.trim() || "";

        if (nomeVal === "" || emailVal === "" || senhaVal === "") {
            alert("Por favor, preencha todos os campos obrigatórios: Nome, E-mail e Senha!");
            return false;
        }

        if (!emailRegex.test(emailVal)) {
            alert("Por favor, insira um e-mail válido!");
            return false;
        }

        if (!senhaApenasNumerosRegex.test(senhaVal)) {
            alert("A senha deve conter apenas números (no mínimo 4 dígitos)!");
            return false;
        }

        if (senhaVal !== confirmaSenhaVal) {
            alert("As senhas informadas não coincidem!");
            return false;
        }

        const arquivo = inputCurriculo?.files ? inputCurriculo.files[0] : null;

        const dadosAluno = {
            nome: nomeVal,
            email: emailVal,
            senha: senhaVal,
            instituicao: document.getElementById("cad-instituicao")?.value || "",
            anoConclusao: document.getElementById("cad-ano")?.value || "",
            estruturaCurricular: document.getElementById("cad-estrutura")?.value || "",
            areaInteresse: document.getElementById("cad-interesse")?.value || "",
            nomeArquivoCurriculo: arquivo ? arquivo.name : "Nenhum arquivo enviado"
        };

        console.log("Enviando dados para a API C#...", dadosAluno);

        fetch('http://localhost:5226/api/auth/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosAluno)
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro na comunicação com a API.');
            return response.json();
        })
        .then(data => {
            alert("Cadastro realizado com sucesso!");
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosAluno));
            window.location.href = "aluno.html";
        })
        .catch(error => {
            console.error("Erro na integração:", error);
            alert("Não foi possível conectar ao servidor C#. Verifique se a API está rodando!");
        });

        return false;
    }

    const btnFinalizar = document.getElementById("btn-finalizar-submit");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", processarCadastro);
    }

    const formCadastro = document.getElementById("form-cadastro-main");
    if (formCadastro) {
        formCadastro.addEventListener("submit", processarCadastro);
    }

    // ==========================================
    // 3. PROCESSAR LOGIN
    // ==========================================
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailVal = document.getElementById("login-email")?.value.trim() || "";
            const senhaVal = document.getElementById("login-senha")?.value.trim() || "";

            if (emailVal === "" || senhaVal === "") {
                alert("Por favor, preencha o e-mail/matrícula e a senha!");
                return;
            }

            const dadosLogin = {
                email: emailVal,
                senha: senhaVal
            };

            console.log("Enviando dados de login para a API...", dadosLogin);

            fetch('http://localhost:5226/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosLogin)
            })
            .then(response => {
                if (!response.ok) throw new Error('Credenciais inválidas.');
                return response.json();
            })
            .then(data => {
                alert("Login efetuado com sucesso!");
                localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
                window.location.href = "aluno.html";
            })
            .catch(error => {
                console.error("Erro no login:", error);
                alert("Falha no login. Verifique seu usuário, senha e se a API está rodando!");
            });
        });
    }

    // ==========================================
    // 4. LINKS DE NAVEGAÇÃO
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
});