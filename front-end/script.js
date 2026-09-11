document.addEventListener("DOMContentLoaded", function () {
    console.log("Script CapacitaPro carregado com sucesso!");

    // Expressão regular padrão para e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // ==========================================
    // 1. SISTEMA UNIFICADO DE TOASTS (ALERTAS)
    // ==========================================
    window.mostrarToast = function (mensagem, tipo = 'sucesso') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999;';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const isSucesso = tipo === 'sucesso' || tipo === 'success';
        const bgColor = isSucesso ? '#2af598' : '#ff4d4d';
        const textColor = isSucesso ? '#0b4b8a' : '#ffffff';
        const icone = isSucesso ? '✓ ' : '⚠️ ';

        toast.style.cssText = `
            background: ${bgColor}; color: ${textColor}; padding: 15px 25px; margin-bottom: 10px;
            border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); font-weight: 600;
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

    // Alias de compatibilidade
    window.showToast = window.mostrarToast;

    // ==========================================
    // 2. MOSTRAR/OCULTAR SENHA (OLHINHO)
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
    // 3. BARRA DE FORÇA DA SENHA (SEM EXIGÊNCIA DE 4 NÚMEROS)
    // ==========================================
    const inputSenhaCadastro = document.getElementById('cad-senha');
    if (inputSenhaCadastro) {
        const containerForca = document.createElement('div');
        containerForca.className = 'password-strength-container';
        containerForca.style.marginTop = '8px';

        const barra = document.createElement('div');
        barra.style.cssText = 'height: 6px; width: 100%; background: rgba(255,255,255,0.2); border-radius: 3px; overflow: hidden;';

        const preenchimento = document.createElement('div');
        preenchimento.style.cssText = 'height: 100%; width: 0%; transition: all 0.3s ease;';

        const textoForca = document.createElement('span');
        textoForca.style.cssText = 'font-size: 12px; color: #ccc; display: block; margin-top: 4px;';
        textoForca.innerText = 'Digite uma senha...';

        barra.appendChild(preenchimento);
        containerForca.appendChild(barra);
        containerForca.appendChild(textoForca);

        inputSenhaCadastro.parentElement.insertAdjacentElement('afterend', containerForca);

        inputSenhaCadastro.addEventListener('input', function () {
            const senha = this.value;
            let forca = 0;

            if (senha.length >= 6) forca += 1;
            if (senha.length >= 8) forca += 1;
            if (/[A-Z]/.test(senha)) forca += 1;
            if (/[0-9]/.test(senha)) forca += 1;
            if (/[^A-Za-z0-9]/.test(senha)) forca += 1;

            if (senha.length === 0) {
                preenchimento.style.width = '0%';
                textoForca.innerText = 'Digite uma senha...';
                textoForca.style.color = '#ccc';
            } else if (forca <= 2) {
                preenchimento.style.width = '33%';
                preenchimento.style.backgroundColor = '#ff4d4d';
                textoForca.innerText = 'Senha Fraca (mínimo 6 caracteres)';
                textoForca.style.color = '#ff4d4d';
            } else if (forca <= 4) {
                preenchimento.style.width = '66%';
                preenchimento.style.backgroundColor = '#ffa502';
                textoForca.innerText = 'Senha Média';
                textoForca.style.color = '#ffa502';
            } else {
                preenchimento.style.width = '100%';
                preenchimento.style.backgroundColor = '#2af598';
                textoForca.innerText = 'Senha Forte';
                textoForca.style.color = '#2af598';
            }
        });
    }

    // ==========================================
    // 4. CARREGAR DADOS DO PERFIL / PROTEÇÃO DE ROTAS
    // ==========================================
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    const elNomeAluno = document.getElementById("nome-aluno-header");
    const elAvatarAluno = document.getElementById("avatar-aluno-header");

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        const nomeVal = usuario.nome || usuario.Nome || "";
        const emailVal = usuario.email || usuario.Email || "";
        const instVal = usuario.instituicao || usuario.Instituicao || "";
        const anoVal = usuario.anoConclusao || usuario.AnoConclusao || "";

        const primeiroNome = nomeVal ? nomeVal.split(" ")[0] : "Aluno(a)";
        const inicial = primeiroNome.charAt(0).toUpperCase();

        if (elNomeAluno) elNomeAluno.innerHTML = `Olá, <strong>${primeiroNome}</strong>`;
        if (elAvatarAluno) elAvatarAluno.textContent = inicial;

        const inputNome = document.getElementById("nome") || document.getElementById("perfil-nome");
        const inputEmail = document.getElementById("email") || document.getElementById("perfil-email");
        const inputInst = document.getElementById("instituicao") || document.getElementById("perfil-instituicao");
        const inputAno = document.getElementById("ano");
        const tituloPerfil = document.getElementById("perf-titulo-nome");
        const avatarGrande = document.getElementById("perf-avatar-large");

        if (inputNome) inputNome.value = nomeVal;
        if (inputEmail) inputEmail.value = emailVal;
        if (inputInst) inputInst.value = instVal;
        if (inputAno) inputAno.value = anoVal;
        if (tituloPerfil) tituloPerfil.textContent = `Perfil de ${primeiroNome}`;
        if (avatarGrande) avatarGrande.textContent = inicial;
    } else {
        const paginaAtual = window.location.pathname;
        if (paginaAtual.includes("aluno.html") || paginaAtual.includes("perfil.html")) {
            window.location.href = "login.html";
        }
    }

    // ==========================================
    // 5. ATUALIZAR PERFIL NA API C#
    // ==========================================
    const formPerfil = document.getElementById("form-perfil");
    if (formPerfil) {
        formPerfil.addEventListener("submit", async function (e) {
            e.preventDefault();

            let usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : {};
            const emailVal = document.getElementById("perfil-email")?.value || document.getElementById("email")?.value || usuario.email;
            const nomeInput = document.getElementById("perfil-nome")?.value.trim() || document.getElementById("nome")?.value.trim();
            const instituicaoInput = document.getElementById("perfil-instituicao")?.value.trim() || document.getElementById("instituicao")?.value.trim();

            const dadosPerfil = {
                Email: emailVal,
                Nome: nomeInput,
                Instituicao: instituicaoInput
            };

            try {
                const response = await fetch('http://localhost:5226/api/auth/atualizar-perfil', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosPerfil)
                });

                const texto = await response.text();
                const resultado = texto ? JSON.parse(texto) : {};

                if (response.ok) {
                    usuario.nome = nomeInput;
                    usuario.instituicao = instituicaoInput;
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

                    mostrarToast(resultado.mensagem || "Perfil atualizado com sucesso!", "sucesso");
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    mostrarToast(resultado.mensagem || "Erro ao atualizar perfil.", "erro");
                }
            } catch (erro) {
                console.error("Erro:", erro);
                mostrarToast("Erro ao conectar com o servidor C#.", "erro");
            }
        });
    }

    // ==========================================
    // 6. LOGOUT
    // ==========================================
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            localStorage.removeItem("usuarioLogado");
            mostrarToast("Sessão encerrada com sucesso!");
            setTimeout(() => window.location.href = "login.html", 1000);
        });
    }

    // ==========================================
    // 7. UPLOAD DE CURRÍCULO (FEEDBACK)
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
    // 8. PROCESSAR CADASTRO (C# API INTEGRATION)
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

            // Lê como texto primeiro para evitar o erro de JSON vazio!
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
});

// ==========================================
// 12. EMISSÃO DE CERTIFICADOS (jsPDF)
// ==========================================
window.baixarCertificado = function (nomeCurso) {
    if (!window.jspdf) {
        alert("A biblioteca de PDF não foi carregada. Verifique as tags <script> no HTML.");
        return;
    }

    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    let nomeAluno = "Aluno";
    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);
        nomeAluno = usuario.nome || usuario.Nome || "Aluno";
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    doc.text("Certificado de Conclusão", 148, 50, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Certificamos que", 148, 80, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(23, 179, 217);
    doc.text(nomeAluno, 148, 100, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`concluiu com êxito o curso de ${nomeCurso}.`, 148, 120, { align: "center" });

    doc.save(`Certificado_${nomeCurso.replace(/\s/g, '_')}.pdf`);
};
const btnGoogle = document.getElementById("btn-google");

if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
        // ID do seu cliente obtido no Google Cloud ou Firebase
        const clientId = "914867735981-SEU_CLIENT_ID.apps.googleusercontent.com"; 
        
        // Para onde o Google deve devolver o usuário após o login
        const redirectUri = encodeURIComponent(window.location.href); 
        const scope = encodeURIComponent("email profile");

        // Redireciona a aba inteira DIRETO para a tela de login do Google
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
    });
}
// ==========================================
// CONFIGURAÇÃO DO FIREBASE (FIREBASE AUTH)
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

// Inicializa o Firebase
if (typeof firebase !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Evento do botão de login do Google
document.addEventListener("DOMContentLoaded", () => {
    const btnGoogle = document.getElementById("btn-google");

    if (btnGoogle) {
        btnGoogle.addEventListener("click", async () => {
            const provider = new firebase.auth.GoogleAuthProvider();

            try {
                // Abre a janela oficial de login do Google
                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;

                // Salva os dados do usuário autenticado no navegador
                localStorage.setItem("usuarioLogado", JSON.stringify({
                    nome: user.displayName,
                    email: user.email,
                    foto: user.photoURL
                }));

                // Redireciona para a área do aluno
                window.location.href = "aluno.html";

            } catch (error) {
                console.error("Erro na autenticação:", error);
                alert("Falha ao autenticar com o Google: " + error.message);
            }
        });
    }
});