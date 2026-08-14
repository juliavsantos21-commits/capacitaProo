📚 CapacitaPro - Sistema de Treinamentos Profissionais

📋 Visão Geral

O CapacitaPro é uma plataforma web completa de treinamentos profissionais online, desenvolvida como projeto do curso **Técnico em Informática para Internet** do SENAI/SE. O sistema oferece uma experiência personalizada de onboarding, permitindo que os alunos se cadastrem, informem seu histórico escolar e recebam recomendações de cursos adaptadas ao seu perfil.

---

🎯 Objetivo do Projeto

Desenvolver uma aplicação web responsiva que permita aos usuários se cadastrarem, enviarem seus históricos escolares ou grades curriculares e, a partir disso, receberem recomendações inteligentes de cursos. O objetivo final é democratizar o acesso à qualificação profissional de alta qualidade de forma direcionada e eficiente.

---

👥 Equipe

- Isaque Nascimento Sousa
- Isis Gabriela Barbosa de Jesus
- Júlia Vitória de Jesus Santos
- Hyan Gustavo Souza de Jesus

Orientador: Prof. Dr. LIZAR EVELLYN DA CONCEIÇÃO SANTOS

---

🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura das páginas |
| **CSS3** | Estilização e efeitos Glassmorphism |
| **JavaScript** | Interatividade e lógica do front-end |
| **API** | Autenticação (Login com Google) |
| **Font Awesome** | Ícones vetoriais |
| **Google Fonts** | Tipografia (Montserrat, Inter, Poppins) |

---

📁 Estrutura de Arquivos

```
CapacitaPro/
├── index.html              # Redireciona para inicio.html
├── inicio.html             # Página inicial da plataforma
├── cadastro.html           # Formulário de cadastro em 4 passos
├── login.html              # Tela de login com Firebase
├── cursos.html             # Catálogo de cursos com filtros
├── sobre.html              # Página institucional
├── contato.html            # Formulário de contato
├── cursoPSCRR.html         # Curso: Primeiros Socorros (Sobre)
├── cursoPSCRR2.html        # Curso: Primeiros Socorros (Conteúdo)
├── cursoPSCRR3.html        # Curso: Primeiros Socorros (Instrutor)
├── cursosPCSRR4.html       # Curso: Primeiros Socorros (Avaliações)
├── style.css               # Estilos globais
├── script.js               # JavaScript unificado
├── png.logo.png            # Logo da plataforma
└── CapacitaPro.docx        # Documentação do projeto
```

---

🔐 Funcionalidades Principais

1. Autenticação com Firebase
- Login tradicional (simulado)
- Login com Google (integrado via Firebase Auth)
- Proteção de rotas simulada

2. Cadastro Inteligente (4 Passos)
- Passo 1: Criação de conta (Nome, E-mail, Senha)
- Passo 2/3: Seleção de objetivo profissional e curso
- Passo 4: Informações da grade curricular e instituição de ensino
- Resumo: Finalização da matrícula

3. Catálogo de Cursos
- Cards com informações de cursos
- Filtros por: Área, Nível, Status
- Busca por texto
- Botão "Saiba Mais" navegando para detalhes do curso

4. Páginas do Curso (Primeiros Socorros)
- Sobre: Descrição, características, conteúdo
- Conteúdo Programático: Módulos com carga horária
- Instrutor: Perfil profissional e certificações
- Avaliações: Critérios de aprovação e funcionamento

5. Interface Glassmorphism
- Efeitos de vidro (backdrop-filter)
- Gradientes vibrantes
- Design moderno e responsivo

---

🧪 Casos de Teste Implementados

| CT | Funcionalidade | Status |
|----|----------------|--------|
| CT001 | Cadastro de Usuário (validação de campos) | ✅ Simulado |
| CT002 | Mapa de Risco (não implementado no front-end) | ⚠️ Back-end pendente |
| CT003 | Filtro de Cursos (Área, Nível, Status) | ✅ Funcional |
| CT004 | Login com Google (Firebase) | ✅ Integrado |
| CT005 | Navegação entre abas do curso | ✅ Funcional |

---

📱 Responsividade

O sistema é totalmente responsivo, adaptando-se a:
- 📱 **Dispositivos móveis** (até 768px)
- 📟 **Tablets** (768px - 992px)
- 💻 **Desktops** (acima de 992px)

---

🎨 Paleta de Cores

```css
--color-blue-deep: #004aad;
--color-cyan: #00d4ff;
--color-green-vibrant: #2af598;
--bg-gradient-start: #0a1930;
--bg-gradient-end: #0c4a6e;
--blue-primary: #1d4ed8;
--green-primary: #16a34a;
```

---

🔮 Funcionalidades Futuras (Roadmap)

- [ ] Implementar back-end completo (Node.js/Python)
- [ ] Upload real de histórico escolar
- [ ] Algoritmo de recomendação de cursos
- [ ] Dashboard do aluno com progresso
- [ ] Certificados digitais após conclusão
- [ ] Modo B2B para empresas
- [ ] Sistema de avaliação e comentários

---

🐛 Problemas Conhecidos

1. Upload de histórico: Funcionalidade simulada (sem back-end real)
2. Recomendação de cursos: Não integrada com banco de dados
3. Persistência de dados: Apenas Firebase Auth está funcional
4. Mapa de risco: Funcionalidade do documento original não implementada

---

📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso Técnico em Informática para Internet do SENAI/SE.

---

📞 Contato

Para mais informações sobre o projeto, entre em contato através da página `contato.html` da plataforma.

---

CapacitaPro - Treinamentos Profissionais
"Aprendizado que transforma carreiras e gera oportunidades."
