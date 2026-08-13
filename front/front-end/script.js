// ==========================================
// FUNÇÃO GLOBAL PARA MOSTRAR/OCULTAR SENHA
// ==========================================
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
            element.classList.remove('fa-eye');
            element.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            element.classList.remove('fa-eye-slash');
            element.classList.add('fa-eye');
        }
    }
}

// ==========================================
// CAPACITAPRO - SCRIPT COMPLETO
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    
    console.log("🚀 CapacitaPro - Sistema inicializado!");

    // ==========================================
    // 1. NAVEGAÇÃO
    // ==========================================
    function configurarLink(idDoElemento, paginaDestino) {
        let elemento = document.getElementById(idDoElemento);
        if (elemento) {
            elemento.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                window.location.href = paginaDestino;
            });
        }
    }

    configurarLink("nav-inicio", "inicio.html");
    configurarLink("nav-sobre", "sobre.html");
    configurarLink("nav-contato", "contato.html");
    configurarLink("btn-entrar", "login.html");
    configurarLink("btn-cadastrar", "cadastro.html");
    configurarLink("btn-conhecer-cursos", "cursos.html");
    configurarLink("btn-comecar", "cadastro.html");

    // Navegação por clique no body
    document.body.addEventListener("click", function(event) {
        const elemento = event.target;
        const texto = elemento.innerText?.trim() || "";

        if (texto === "Início" || texto === "Inicio") {
            window.location.href = "inicio.html";
        } else if (texto === "Cursos" || texto === "Explorar Treinamentos" || texto === "Explorar") {
            window.location.href = "cursos.html";
        } else if (texto === "Sobre") {
            window.location.href = "sobre.html";
        } else if (texto === "Contato") {
            window.location.href = "contato.html";
        } else if (texto === "Entrar" || texto === "Login") {
            window.location.href = "login.html";
        } else if (texto === "Cadastrar-se" || texto === "Começar Agora" || texto === "Cadastrar") {
            window.location.href = "cadastro.html";
        }
    });

    // ==========================================
    // 2. BOTÃO VOLTAR
    // ==========================================
    const botoesVoltar = document.querySelectorAll(".btn-voltar");
    botoesVoltar.forEach(function(botao) {
        botao.addEventListener("click", function(event) {
            event.preventDefault();
            window.history.back();
        });
    });

    // ==========================================
    // 3. FILTRAGEM DE CURSOS
    // ==========================================
    const btnFiltrar = document.getElementById("btn-filtrar");
    const btnLimpar = document.getElementById("btn-limpar");
    const todosOsCursos = document.querySelectorAll(".course-card");

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            const areaEscolhida = document.getElementById("filter-area")?.value || "Selecione";
            const nivelEscolhido = document.getElementById("filter-nivel")?.value || "Nível";
            const statusEscolhido = document.getElementById("filter-status")?.value || "Status";
            const textoBusca = document.getElementById("search-input")?.value.toLowerCase() || "";

            todosOsCursos.forEach(function(curso) {
                const areaDoCurso = curso.getAttribute("data-area") || "";
                const nivelDoCurso = curso.getAttribute("data-nivel") || "";
                const statusDoCurso = curso.getAttribute("data-status") || "";
                
                const tagElemento = curso.querySelector(".course-tag");
                const nomeDoCurso = tagElemento ? tagElemento.textContent.toLowerCase() : "";

                let deveMostrar = true;

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

                curso.style.display = deveMostrar ? "block" : "none";
            });
        });
    }

    if (btnLimpar) {
        btnLimpar.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            const filterArea = document.getElementById("filter-area");
            const filterNivel = document.getElementById("filter-nivel");
            const filterStatus = document.getElementById("filter-status");
            const searchInput = document.getElementById("search-input");

            if (filterArea) filterArea.value = "Selecione";
            if (filterNivel) filterNivel.value = "Nível";
            if (filterStatus) filterStatus.value = "Status";
            if (searchInput) searchInput.value = "";

            todosOsCursos.forEach(function(curso) {
                curso.style.display = "block";
            });
        });
    }

    // ==========================================
    // 4. FORMULÁRIO DE CONTATO
    // ==========================================
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("✅ Mensagem enviada com sucesso!");
            form.reset();
        });
    }

    // ==========================================
    // 5. SISTEMA DE UPLOAD DE HISTÓRICO ESCOLAR
    // ==========================================
    const inputUpload = document.getElementById('uploadHistorico');
    const nomeArquivo = document.getElementById('nomeArquivo');
    const resumoHistorico = document.getElementById('resumoHistorico');

    if (inputUpload) {
        inputUpload.addEventListener('change', function(e) {
            const arquivo = this.files[0];
            
            if (arquivo) {
                if (nomeArquivo) nomeArquivo.textContent = arquivo.name;
                if (resumoHistorico) resumoHistorico.textContent = arquivo.name;

                const tiposPermitidos = ['application/pdf', 'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'image/jpeg', 'image/png', 'text/plain'];

                if (!tiposPermitidos.includes(arquivo.type)) {
                    alert('⚠️ Tipo de arquivo não suportado. Use PDF, DOC, DOCX, JPG, PNG ou TXT.');
                    this.value = '';
                    if (nomeArquivo) nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                    if (resumoHistorico) resumoHistorico.textContent = 'Nenhum arquivo';
                    return;
                }

                if (arquivo.size > 10 * 1024 * 1024) {
                    alert('⚠️ Arquivo muito grande. Tamanho máximo: 10MB.');
                    this.value = '';
                    if (nomeArquivo) nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                    if (resumoHistorico) resumoHistorico.textContent = 'Nenhum arquivo';
                    return;
                }

                console.log('✅ Arquivo válido:', arquivo.name);

                // Envia para o servidor
                const nome = document.getElementById('nomeCompleto')?.value || '';
                const email = document.getElementById('email')?.value || '';
                const objetivo = document.getElementById('objetivo')?.value || '';
                const instituicao = document.getElementById('instituicao')?.value || '';
                const anoConclusao = document.getElementById('anoConclusao')?.value || '';
                const curriculo = document.getElementById('curriculo')?.value || '';
                const interesses = document.getElementById('interesses')?.value || '';

                const formData = new FormData();
                formData.append('historico', arquivo);
                formData.append('nome', nome);
                formData.append('email', email);
                formData.append('objetivo', objetivo);
                formData.append('instituicao', instituicao);
                formData.append('anoConclusao', anoConclusao);
                formData.append('curriculo', curriculo);
                formData.append('interesses', interesses);

                const btnUpload = document.querySelector('.btn-upload');
                if (btnUpload) {
                    btnUpload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    btnUpload.style.opacity = '0.7';
                }

                fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro no servidor: ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('✅ Upload realizado:', data);
                    if (btnUpload) {
                        btnUpload.innerHTML = '<i class="fas fa-check-circle"></i> Histórico enviado!';
                        btnUpload.style.opacity = '1';
                        btnUpload.style.borderColor = '#00b894';
                    }
                    if (resumoHistorico) {
                        resumoHistorico.textContent = arquivo.name + ' ✅';
                    }
                    alert('✅ Histórico escolar enviado com sucesso!');
                })
                .catch(error => {
                    console.error('❌ Erro:', error);
                    if (btnUpload) {
                        btnUpload.innerHTML = '<i class="fas fa-paperclip"></i> Upload de Histórico Escolar';
                        btnUpload.style.opacity = '1';
                        btnUpload.style.borderColor = '#ff6b6b';
                    }
                    alert('❌ Erro ao enviar arquivo. Tente novamente.');
                });

            } else {
                if (nomeArquivo) nomeArquivo.textContent = 'Nenhum arquivo selecionado';
                if (resumoHistorico) resumoHistorico.textContent = 'Nenhum arquivo';
            }
        });
    }

    // ==========================================
    // 6. ATUALIZAÇÃO DO RESUMO EM TEMPO REAL ⭐
    // ==========================================
    
    // Atualiza Nome
    const nomeInput = document.getElementById('nomeCompleto');
    const resumoNome = document.getElementById('resumoNome');
    if (nomeInput && resumoNome) {
        nomeInput.addEventListener('input', function() {
            resumoNome.textContent = this.value.trim() || '-';
        });
    }

    // Atualiza E-mail
    const emailInput = document.getElementById('email');
    const resumoEmail = document.getElementById('resumoEmail');
    if (emailInput && resumoEmail) {
        emailInput.addEventListener('input', function() {
            resumoEmail.textContent = this.value.trim() || '-';
        });
    }

    // Atualiza Curso (Objetivo)
    const objetivoSelect = document.getElementById('objetivo');
    const resumoCurso = document.getElementById('resumoCurso');
    if (objetivoSelect && resumoCurso) {
        objetivoSelect.addEventListener('change', function() {
            const opcoes = {
                'tecnica': 'Área Técnica',
                'operacional': 'Área Operacional',
                'administrativa': 'Área Administrativa'
            };
            resumoCurso.textContent = opcoes[this.value] || '-';
        });
    }

    // Atualiza Instituição (opcional)
    const instituicaoSelect = document.getElementById('instituicao');
    const resumoInstituicao = document.getElementById('resumoInstituicao');
    if (instituicaoSelect && resumoInstituicao) {
        instituicaoSelect.addEventListener('change', function() {
            const texto = this.options[this.selectedIndex]?.text || '-';
            resumoInstituicao.textContent = texto;
        });
    }

    // ==========================================
    // 7. FUNÇÃO DE FINALIZAR CADASTRO
    // ==========================================
    const btnFinalizar = document.querySelector(".summary-section .btn-primary-block");
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", function(event) {
            event.preventDefault();
            
            const nome = document.getElementById('nomeCompleto')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const senha = document.getElementById('senha')?.value || '';
            const confirmar = document.getElementById('confirmarSenha')?.value || '';
            const arquivo = document.getElementById('uploadHistorico')?.files[0];

            if (!nome) {
                alert('⚠️ Por favor, preencha seu nome completo.');
                return;
            }
            if (!email) {
                alert('⚠️ Por favor, preencha seu e-mail.');
                return;
            }
            if (!email.includes('@')) {
                alert('⚠️ Por favor, insira um e-mail válido.');
                return;
            }
            if (senha.length < 6) {
                alert('⚠️ A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            if (senha !== confirmar) {
                alert('⚠️ As senhas não coincidem.');
                return;
            }
            if (!arquivo) {
                alert('⚠️ Por favor, faça o upload do seu Histórico Escolar.');
                return;
            }

            alert('✅ Cadastro realizado com sucesso!\n\n' +
                  '📄 Histórico Escolar anexado: ' + arquivo.name + '\n' +
                  '🎯 Você receberá recomendações personalizadas em breve!\n\n' +
                  '📧 Um e-mail de confirmação foi enviado para: ' + email);

            window.location.href = "inicio.html";
        });
    }

    console.log("✅ CapacitaPro - Todos os sistemas carregados com sucesso!");

});
 // ← FECHA O DOMContentLoaded
