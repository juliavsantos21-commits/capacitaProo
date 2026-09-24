document.addEventListener("DOMContentLoaded", function () {
    console.log("Sistema CapacitaPro inicializado!");

    // ==========================================
    // 1. SISTEMA DE TOAST (AVISOS)
    // ==========================================
    window.mostrarToast = function (mensagem, tipo = 'sucesso') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 99999;';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const isSucesso = tipo === 'sucesso' || tipo === 'success';
        const bgColor = isSucesso ? '#2af598' : '#ff4d4d';
        const textColor = isSucesso ? '#0b4b8a' : '#ffffff';
        const icone = isSucesso ? '✓ ' : '⚠️ ';

        toast.style.cssText = `
            background: ${bgColor}; color: ${textColor}; padding: 15px 25px; margin-bottom: 10px;
            border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-weight: 700;
            opacity: 0; transform: translateX(100%); transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;
        `;
        toast.innerHTML = `<span>${icone} ${mensagem}</span>`;
        container.appendChild(toast);

        setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(0)'; }, 10);
        setTimeout(() => {
            toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ==========================================
    // 2. MOSTRAR/OCULTAR SENHA
    // ==========================================
    document.querySelectorAll('.fa-eye, .fa-eye-slash').forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                if (input.type === 'password') {
                    input.type = 'text';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                }
            }
        });
    });

    // ==========================================
<<<<<<< HEAD
    // 3. ATUALIZAÇÃO DINÂMICA DO RESUMO DO CADASTRO
=======
    // 3. BARRA DE FORÇA DA SENHA
>>>>>>> f891f860bac6bbf893f2e0039e6b31ef0211fe29
    // ==========================================
    const inNome = document.getElementById("cad-nome");
    const inEmail = document.getElementById("cad-email");
    const inCurso = document.getElementById("cad-curso");
    const inInst = document.getElementById("cad-instituicao");
    const fileInput = document.getElementById("cad-curriculo");

    function atualizarResumo() {
        const resNome = document.getElementById("resumo-nome");
        const resEmail = document.getElementById("resumo-email");
        const resCurso = document.getElementById("resumo-curso");
        const resInst = document.getElementById("resumo-instituicao");

        if (resNome) resNome.textContent = inNome?.value.trim() || "-";
        if (resEmail) resEmail.textContent = inEmail?.value.trim() || "-";
        if (resCurso) resCurso.textContent = inCurso?.value || "-";
        if (resInst) resInst.textContent = inInst?.value || "-";
    }

    if (inNome) inNome.addEventListener("input", atualizarResumo);
    if (inEmail) inEmail.addEventListener("input", atualizarResumo);
    if (inCurso) inCurso.addEventListener("change", atualizarResumo);
    if (inInst) inInst.addEventListener("change", atualizarResumo);

    // ==========================================
    // 4. ATUALIZAR NOME DO ARQUIVO ANEXADO
    // ==========================================
    if (fileInput) {
        fileInput.addEventListener("change", function () {
            const labelSpan = document.getElementById("nome-arquivo-selecionado");
            if (labelSpan) {
                if (this.files && this.files.length > 0) {
                    labelSpan.textContent = `Arquivo anexado: ${this.files[0].name}`;
                    labelSpan.style.color = '#00ffcc';
                } else {
                    labelSpan.textContent = 'Nenhum arquivo selecionado';
                    labelSpan.style.color = 'rgba(255, 255, 255, 0.6)';
                }
            }
        });
    }

    // ==========================================
    // 5. CARREGAR DADOS NAS TELAS ALUNO, AULA E PERFIL
    // ==========================================
    const usuarioSalvo = localStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioCadastrado");
    if (usuarioSalvo) {
        try {
            const usuario = JSON.parse(usuarioSalvo);
            const nomeVal = usuario.Nome || usuario.nome || "Aluno";
            const emailVal = usuario.Email || usuario.email || "";
            const instVal = usuario.Instituicao || usuario.instituicao || "";
            const anoVal = usuario.AnoConclusao || usuario.anoConclusao || "";
            const cursoVal = usuario.CursoMatriculado || usuario.cursoMatriculado || "Curso Técnico";
            const areaVal = usuario.AreaObjetivo || usuario.areaObjetivo || "Geral";

            const primeiroNome = nomeVal.split(" ")[0];
            const inicial = primeiroNome.charAt(0).toUpperCase();

            // Elementos de Cabeçalhos
            const elNome = document.getElementById("nome-aluno-header");
            const elAvatar = document.getElementById("avatar-aluno-header");
            const elCurso = document.getElementById("curso-aluno") || document.getElementById("nome-curso-matriculado");
            const elArea = document.getElementById("tag-area-aluno");
            const elTituloAula = document.getElementById("aula-titulo-curso");
            const elDescAula = document.getElementById("aula-desc-curso");

            if (elNome) elNome.innerHTML = `Olá, <strong>${primeiroNome}</strong>`;
            if (elAvatar) elAvatar.textContent = inicial;
            if (elCurso) elCurso.textContent = cursoVal;
            if (elArea) elArea.textContent = areaVal;
            if (elTituloAula) elTituloAula.textContent = `01. Introdução ao ${cursoVal}`;
            if (elDescAula) elDescAula.textContent = `Nesta aula você aprenderá os conceitos fundamentais de ${cursoVal}.`;

            // Preenchimento dos dados da Tela de Perfil
            const perfAvatarLarge = document.getElementById("perf-avatar-large");
            const perfTituloNome = document.getElementById("perf-titulo-nome");
            const inputPerfNome = document.getElementById("nome");
            const inputPerfEmail = document.getElementById("email");
            const inputPerfInst = document.getElementById("instituicao");
            const inputPerfAno = document.getElementById("ano");

            if (perfAvatarLarge) perfAvatarLarge.textContent = inicial;
            if (perfTituloNome) perfTituloNome.textContent = `Perfil de ${nomeVal}`;
            if (inputPerfNome) inputPerfNome.value = nomeVal;
            if (inputPerfEmail) inputPerfEmail.value = emailVal;
            if (inputPerfInst) inputPerfInst.value = instVal;
            if (inputPerfAno) inputPerfAno.value = anoVal;

        } catch (e) {
            console.error("Erro ao carregar dados do usuário:", e);
        }
    }

    // Configuração do Botão Sair da Conta caso exista na página
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", window.sairDaConta);
    }

<<<<<<< HEAD
    // Inicializar barras de progresso e estado da tela de aula se aplicável
    if (typeof window.atualizarBarraProgresso === "function") {
        window.atualizarBarraProgresso();
    }
    if (typeof window.atualizarInterfaceAula === "function") {
        window.atualizarInterfaceAula('aula_01');
    }
});

// ==========================================
// 6. FUNÇÃO DE MEDIÇÃO DA FORÇA DA SENHA
=======
    // ==========================================
    // 7. UPLOAD DE CURRÍCULO
    // ==========================================
    const inputCurriculo = document.getElementById("cad-curriculo");
    const labelArquivo = document.getElementById("nome-arquivo-selecionado");
    if (inputCurriculo && labelArquivo) {
        inputCurriculo.addEventListener("change", function () {
            if (this.files && this.files.length > 0) {
                labelArquivo.textContent = `📎 Arquivo: ${this.files[0].name}`;
                labelArquivo.style.color = "#2af598";
            } else {
                labelArquivo.textContent = "Nenhum arquivo selecionado";
            }
        });
    }

    // ==========================================
    // 8. PROCESSAR CADASTRO
    // ==========================================
    async function processarCadastro(e) {
        if (e) { e.preventDefault(); e.stopPropagation(); }

        const nomeVal = document.getElementById("cad-nome")?.value.trim() || "";
        const emailVal = document.getElementById("cad-email")?.value.trim() || "";
        const senhaVal = document.getElementById("cad-senha")?.value || "";
        const confirmaSenhaVal = document.getElementById("cad-confirma-senha")?.value || "";

        if (!nomeVal || !emailVal || !senhaVal) {
            mostrarToast("Preencha todos os campos obrigatórios!", "erro");
            return false;
        }

        if (!emailRegex.test(emailVal)) {
            mostrarToast("Insira um e-mail válido!", "erro");
            return false;
        }

        if (senhaVal.length < 6) {
            mostrarToast("A senha deve ter pelo menos 6 caracteres!", "erro");
            return false;
        }

        if (senhaVal !== confirmaSenhaVal) {
            mostrarToast("As senhas não coincidem!", "erro");
            return false;
        }

        const arquivo = inputCurriculo?.files ? inputCurriculo.files[0] : null;

        const dadosAluno = {
            Nome: nomeVal,
            Email: emailVal,
            Senha: senhaVal,
            Instituicao: document.getElementById("cad-instituicao")?.value || "",
            AnoConclusao: document.getElementById("cad-ano")?.value || "",
            EstruturaCurricular: document.getElementById("cad-estrutura")?.value || "",
            AreaInteresse: document.getElementById("cad-interesse")?.value || "",
            NomeArquivoCurriculo: arquivo ? arquivo.name : "Nenhum arquivo enviado"
        };

        try {
            const response = await fetch('http://localhost:5226/api/auth/cadastrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAluno)
            });

            const texto = await response.text();
            const data = texto ? JSON.parse(texto) : {};

            if (response.ok) {
                mostrarToast(data.mensagem || "Cadastro realizado com sucesso!", "sucesso");
                localStorage.setItem("usuarioLogado", JSON.stringify(dadosAluno));
                setTimeout(() => window.location.href = "aluno.html", 1500);
            } else {
                mostrarToast(data.mensagem || "Erro ao cadastrar.", "erro");
            }
        } catch (error) {
            console.error("Erro na integração:", error);
            mostrarToast("Erro ao conectar com a API C#.", "erro");
        }
        return false;
    }

    const btnFinalizar = document.getElementById("btn-finalizar-submit");
    if (btnFinalizar) btnFinalizar.addEventListener("click", processarCadastro);

    const formCadastro = document.getElementById("form-cadastro-main");
    if (formCadastro) formCadastro.addEventListener("submit", processarCadastro);

    // ==========================================
    // 9. PROCESSAR LOGIN
    // ==========================================
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", async function (e) {
            e.preventDefault();

            const emailVal = document.getElementById("login-email")?.value.trim() || "";
            const senhaVal = document.getElementById("login-senha")?.value || "";

            if (!emailVal || !senhaVal) {
                mostrarToast("Preencha o e-mail e a senha!", "erro");
                return;
            }

            try {
                const response = await fetch('http://localhost:5226/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Email: emailVal, Senha: senhaVal })
                });

                const texto = await response.text();
                const data = texto ? JSON.parse(texto) : {};

                if (response.ok) {
                    mostrarToast("Login efetuado com sucesso!", "sucesso");
                    localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario || { nome: emailVal, email: emailVal }));
                    setTimeout(() => window.location.href = "aluno.html", 1000);
                } else {
                    mostrarToast(data.mensagem || "Credenciais inválidas.", "erro");
                }
            } catch (error) {
                console.error("Erro:", error);
                mostrarToast("Falha no login. Verifique sua conexão!", "erro");
            }
        });
    }

    // ==========================================
    // 10. FILTROS DE CURSOS
    // ==========================================
    const btnFiltros = document.querySelectorAll('.btn-filtro');
    const cardsCursos = document.querySelectorAll('.course-card');

    if (btnFiltros.length > 0 && cardsCursos.length > 0) {
        btnFiltros.forEach(btn => {
            btn.addEventListener('click', () => {
                btnFiltros.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const categoria = btn.getAttribute('data-filter');

                cardsCursos.forEach(card => {
                    const tagCurso = card.querySelector('.course-tag')?.innerText || "";
                    if (categoria === 'all' || tagCurso.includes(categoria)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // 11. LINKS DE NAVEGAÇÃO INTERNA
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

    // ==========================================
    // 12. EVENTO BOTÃO LOGIN COM GOOGLE (FIREBASE)
    // ==========================================
    const btnGoogle = document.getElementById("btn-google");
    if (btnGoogle) {
        btnGoogle.addEventListener("click", async () => {
            if (typeof firebase === "undefined" || !firebase.auth) {
                mostrarToast("Erro: Bibliotecas do Firebase não foram carregadas.", "erro");
                return;
            }

            const provider = new firebase.auth.GoogleAuthProvider();

            // Força a exibição da janela para selecionar a conta do Google
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            try {
                // Encerra sessão ativa anterior para abrir a janela do Google limpa
                await firebase.auth().signOut();

                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;

                localStorage.setItem("usuarioLogado", JSON.stringify({
                    nome: user.displayName,
                    email: user.email,
                    foto: user.photoURL
                }));

                mostrarToast(`Bem-vindo(a), ${user.displayName}!`, "sucesso");
                setTimeout(() => window.location.href = "aluno.html", 1000);

            } catch (error) {
                console.error("Erro na autenticação Google:", error);
                mostrarToast("Falha ao autenticar com o Google: " + error.message, "erro");
            }
        });
    }
});

// ==========================================
// 13. CONFIGURAÇÃO DO FIREBASE (FIREBASE AUTH)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyATHp7t5e3o5CCHF4Nhxta9lqrr4NdZ1rk",
  authDomain: "capacitapro-9b85d.firebaseapp.com",
  projectId: "capacitapro-9b85d",
  storageBucket: "capacitapro-9b85d.firebasestorage.app",
  messagingSenderId: "914867735981",
  appId: "1:914867735981:web:9c065d108063f5fedfe524",
  measurementId: "G-8TBHYGS2SM"
};

if (typeof firebase !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// ==========================================
// 14. EMISSÃO DE CERTIFICADOS (jsPDF)
>>>>>>> f891f860bac6bbf893f2e0039e6b31ef0211fe29
// ==========================================
window.validarForcaSenha = function(senha) {
    const container = document.getElementById('password-strength-container');
    const bar = document.getElementById('password-strength-bar');
    const text = document.getElementById('password-strength-text');

    if (!container || !bar || !text) return;

    if (!senha || senha.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    let forca = 0;

    if (senha.length >= 6) forca += 25;
    if (senha.match(/[a-z]/) && senha.match(/[A-Z]/)) forca += 25;
    if (senha.match(/[0-9]/)) forca += 25;
    if (senha.match(/[^a-zA-Z0-9]/)) forca += 25;

    if (forca <= 25) {
        bar.style.width = '25%';
        bar.style.backgroundColor = '#ff4d4d';
        text.innerText = 'Senha Fraca';
        text.style.color = '#ff4d4d';
    } else if (forca <= 75) {
        bar.style.width = '65%';
        bar.style.backgroundColor = '#ffb703';
        text.innerText = 'Senha Média';
        text.style.color = '#ffb703';
    } else {
        bar.style.width = '100%';
        bar.style.backgroundColor = '#00ffcc';
        text.innerText = 'Senha Forte';
        text.style.color = '#00ffcc';
    }
};

// ==========================================
// 7. FUNÇÃO GLOBAL DE FINALIZAR CADASTRO
// ==========================================
window.executarCadastro = function (e) {
    if (e) e.preventDefault();

    const nome = document.getElementById("cad-nome")?.value.trim();
    const email = document.getElementById("cad-email")?.value.trim();
    const senha = document.getElementById("cad-senha")?.value;
    const confirmaSenha = document.getElementById("cad-confirma-senha")?.value;
    const curso = document.getElementById("cad-curso")?.value;
    const area = document.getElementById("cad-area")?.value || "Área Técnica";
    const instituicao = document.getElementById("cad-instituicao")?.value || "";
    const anoConclusao = document.getElementById("cad-ano")?.value || "";
    const estruturaCurricular = document.getElementById("cad-estrutura")?.value.trim() || "";
    const interesseAdicional = document.getElementById("cad-interesse")?.value.trim() || "";

    if (!nome || !email || !senha) {
        window.mostrarToast("Preencha Nome, E-mail e Senha!", "erro");
        return false;
    }

    if (!curso) {
        window.mostrarToast("Selecione um curso para se matricular!", "erro");
        return false;
    }

    if (senha.length < 6) {
        window.mostrarToast("A senha deve ter pelo menos 6 caracteres!", "erro");
        return false;
    }

    if (senha !== confirmaSenha) {
        window.mostrarToast("As senhas não coincidem!", "erro");
        return false;
    }

    const dadosAluno = {
        Nome: nome,
        Email: email,
        Senha: senha,
        CursoMatriculado: curso,
        AreaObjetivo: area,
        Instituicao: instituicao,
        AnoConclusao: anoConclusao,
        EstruturaCurricular: estruturaCurricular,
        InteresseAdicional: interesseAdicional
    };

    localStorage.setItem("usuarioCadastrado", JSON.stringify(dadosAluno));
    localStorage.setItem("usuarioLogado", JSON.stringify(dadosAluno));

<<<<<<< HEAD
    try {
        fetch('http://localhost:5226/api/auth/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAluno)
        }).catch(() => {});
    } catch (err) {}

    window.mostrarToast("Cadastro realizado! Redirecionando para o login...", "sucesso");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

    return false;
};

// ==========================================
// 8. FUNÇÃO GLOBAL DE LOGIN
// ==========================================
window.executarLogin = function (e) {
    if (e) e.preventDefault();

    const emailInput = document.getElementById("login-email") || document.querySelector("input[type='email']");
    const senhaInput = document.getElementById("login-senha") || document.querySelector("input[type='password']");

    const email = emailInput?.value.trim();
    const senha = senhaInput?.value;

    if (!email || !senha) {
        window.mostrarToast("Preencha o e-mail e a senha!", "erro");
        return false;
    }

    const usuarioCadastrado = localStorage.getItem("usuarioCadastrado") || localStorage.getItem("usuarioLogado");

    if (usuarioCadastrado) {
        const userObj = JSON.parse(usuarioCadastrado);
        localStorage.setItem("usuarioLogado", JSON.stringify(userObj));
    } else {
        const mockUser = {
            Nome: email.split('@')[0],
            Email: email,
            CursoMatriculado: "Programação Python",
            AreaObjetivo: "Área Técnica"
        };
        localStorage.setItem("usuarioLogado", JSON.stringify(mockUser));
    }

    try {
        fetch('http://localhost:5226/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Senha: senha })
        }).catch(() => {});
    } catch (err) {}

    window.mostrarToast("Login efetuado com sucesso!", "sucesso");

    setTimeout(() => {
        window.location.href = "aluno.html";
    }, 1000);

    return false;
};

// ==========================================
// 9. FUNÇÃO DE SALVAR ALTERAÇÕES NO PERFIL
// ==========================================
window.salvarPerfil = function (e) {
    if (e) e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const instituicao = document.getElementById("instituicao")?.value.trim();
    const ano = document.getElementById("ano")?.value.trim();
    const novaSenha = document.getElementById("senha")?.value;

    const usuarioSalvo = localStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioCadastrado") || "{}";
    let usuario = {};
    
    try {
        usuario = JSON.parse(usuarioSalvo);
    } catch(e) {}

    usuario.Nome = nome || usuario.Nome;
    usuario.Email = email || usuario.Email;
    usuario.Instituicao = instituicao || usuario.Instituicao;
    usuario.AnoConclusao = ano || usuario.AnoConclusao;
    if (novaSenha) usuario.Senha = novaSenha;

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

    window.mostrarToast("Dados atualizados com sucesso!", "sucesso");

    // Atualiza cabeçalho
    const primeiroNome = usuario.Nome.split(" ")[0];
    const inicial = primeiroNome.charAt(0).toUpperCase();
    const perfAvatarLarge = document.getElementById("perf-avatar-large");
    const perfTituloNome = document.getElementById("perf-titulo-nome");
    const elAvatar = document.getElementById("avatar-aluno-header");

    if (perfAvatarLarge) perfAvatarLarge.textContent = inicial;
    if (elAvatar) elAvatar.textContent = inicial;
    if (perfTituloNome) perfTituloNome.textContent = `Perfil de ${usuario.Nome}`;

    return false;
};

// ==========================================
// 10. FUNÇÃO DE ENCERRA SESSÃO (SAIR DA CONTA)
// ==========================================
window.sairDaConta = function () {
    localStorage.removeItem("usuarioLogado");

    if (typeof window.mostrarToast === "function") {
        window.mostrarToast("Sessão encerrada com sucesso!", "sucesso");
    }

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
};

// ==========================================
// 11. FUNÇÃO PARA GERAR E BAIXAR CERTIFICADO
// ==========================================
window.baixarCertificado = function (nomeCurso, dataConclusao) {
    const usuarioSalvo = localStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioCadastrado");
    let nomeAluno = "Aluno CapacitaPro";

    if (usuarioSalvo) {
        try {
            const user = JSON.parse(usuarioSalvo);
            nomeAluno = user.Nome || user.nome || nomeAluno;
        } catch (e) {}
    }

    if (typeof window.mostrarToast === "function") {
        window.mostrarToast("Gerando seu certificado, aguarde...", "sucesso");
    }

    // Criar elemento invisível para renderizar o layout do certificado
    const certElement = document.createElement("div");
    certElement.style.cssText = `
        width: 800px;
        padding: 40px;
        background: #0b2239;
        color: #ffffff;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        border: 10px solid #00ffcc;
        border-radius: 12px;
        text-align: center;
        box-sizing: border-box;
    `;

    certElement.innerHTML = `
        <div style="border: 2px solid rgba(255,255,255,0.2); padding: 30px; border-radius: 8px;">
            <h1 style="color: #00ffcc; font-size: 36px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px;">CapacitaPro</h1>
            <p style="color: #2af598; font-size: 14px; margin-top: 0; text-transform: uppercase; font-weight: bold;">Treinamentos Profissionais</p>
            
            <hr style="border: 0; height: 1px; background: rgba(255,255,255,0.2); margin: 30px 0;">
            
            <h2 style="font-size: 28px; font-weight: 300; margin-bottom: 20px;">CERTIFICADO DE CONCLUSÃO</h2>
            
            <p style="font-size: 16px; color: #d0dbe5;">Certificamos que</p>
            <h3 style="font-size: 32px; color: #ffffff; margin: 10px 0; font-weight: bold; text-transform: capitalize;">${nomeAluno}</h3>
            
            <p style="font-size: 16px; color: #d0dbe5; max-width: 600px; margin: 0 auto 20px auto;">
                concluiu com êxito o treinamento profissional de <strong>${nomeCurso}</strong>, obtendo excelente aproveitamento prático e teórico.
            </p>
            
            <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 40px;">
                <div style="text-align: left;">
                    <p style="font-size: 12px; color: #a0b2c6; margin: 0;">Data de Conclusão:</p>
                    <p style="font-size: 14px; color: #00ffcc; font-weight: bold; margin: 0;">${dataConclusao}</p>
                </div>
                <div style="text-align: center;">
                    <div style="width: 180px; border-bottom: 1px solid #ffffff; margin-bottom: 5px;"></div>
                    <p style="font-size: 12px; color: #a0b2c6; margin: 0;">Coordenação Acadêmica</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(certElement);

    const opcoes = {
        margin: 5,
        filename: `Certificado_${nomeCurso.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    // Gera e baixa o PDF
    html2pdf().set(opcoes).from(certElement).save().then(() => {
        document.body.removeChild(certElement);
    });
};

// ==========================================
// 12. SISTEMA DE PROGRESSO DE AULAS (NOVO)
// ==========================================

// Função executada ao clicar no botão de concluir aula na tela 'aula.html'
window.concluirAulaAtual = function (idAula) {
    let concluidas = JSON.parse(localStorage.getItem("aulasConcluidas")) || [];

    if (!concluidas.includes(idAula)) {
        concluidas.push(idAula);
        localStorage.setItem("aulasConcluidas", JSON.stringify(concluidas));
        if (typeof window.mostrarToast === "function") {
            window.mostrarToast("Aula concluída! Progresso atualizado.", "sucesso");
        }
    }

    window.atualizarInterfaceAula(idAula);
    window.atualizarBarraProgresso();
};

// Atualiza o estado dos botões e lista na tela de Aula
window.atualizarInterfaceAula = function (idAulaAtual = 'aula_01') {
    const concluidas = JSON.parse(localStorage.getItem("aulasConcluidas")) || [];
    const btnConcluir = document.getElementById("btn-concluir-aula");

    if (btnConcluir) {
        if (concluidas.includes(idAulaAtual)) {
            btnConcluir.innerHTML = '<i class="fa-solid fa-check-double"></i> Aula Concluída';
            btnConcluir.style.backgroundColor = '#1b5e20';
            btnConcluir.disabled = true;
        }
    }

    document.querySelectorAll(".lesson-list li").forEach(li => {
        const id = li.getAttribute("data-aula-id");
        if (concluidas.includes(id)) {
            li.classList.add("completed");
            const icone = li.querySelector("i");
            if (icone) {
                icone.className = "fa-solid fa-circle-check";
            }
        }
    });
};

// Atualiza a barra visual em aluno.html e perfil.html
window.atualizarBarraProgresso = function (totalAulasCurso = 5) {
    const concluidas = JSON.parse(localStorage.getItem("aulasConcluidas")) || [];
    const porcentagem = Math.min(Math.round((concluidas.length / totalAulasCurso) * 100), 100);

    // 1. Atualização para aluno.html
    const progressFillCard = document.querySelector(".progress-fill");
    const progressTextCard = document.querySelectorAll(".progress-info span")[1];

    if (progressFillCard) progressFillCard.style.width = `${porcentagem}%`;
    if (progressTextCard) progressTextCard.textContent = `${porcentagem}%`;

    // 2. Atualização para perfil.html (se existirem os IDs)
    const barraPerfil = document.getElementById("barra-progresso");
    const textoPerfil = document.getElementById("texto-progresso");

    if (barraPerfil) barraPerfil.style.width = `${porcentagem}%`;
    if (textoPerfil) textoPerfil.textContent = `${porcentagem}% Concluído`;
};

// Vincula eventos aos formulários caso o usuário aperte ENTER
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "form-cadastro-main") {
        e.preventDefault();
        window.executarCadastro(e);
    }
    if (e.target && (e.target.id === "form-login" || window.location.pathname.includes("login.html"))) {
        e.preventDefault();
        window.executarLogin(e);
    }
    if (e.target && e.target.id === "form-perfil") {
        e.preventDefault();
        window.salvarPerfil(e);
    }
});
=======
    doc.save(`Certificado_${nomeCurso.replace(/\s/g, '_')}.pdf`);
};
>>>>>>> f891f860bac6bbf893f2e0039e6b31ef0211fe29
