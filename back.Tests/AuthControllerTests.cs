using System;
using back;
using back.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace back.Tests
{
    public class AuthControllerTests
    {
        // Método auxiliar para isolar o banco de dados em memória para cada teste
        private AppDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new AppDbContext(options);
        }

        #region --- TESTES DE CADASTRO ---

        [Fact]
        public void Cadastrar_DadosValidos_DeveRetornarOkECadastrarAluno()
        {
            // ARRANGE (Preparar)
            using var context = GetInMemoryDbContext();
            var controller = new AuthController(context);
            var novoAluno = new Aluno
            {
                Nome = "Carlos Silva",
                Email = "carlos@capacitapro.com",
                Senha = "senha123"
            };

            // ACT (Executar)
            var resultado = controller.Cadastrar(novoAluno);

            // ASSERT (Verificar)
            var okResult = Assert.IsType<OkObjectResult>(resultado);
            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(1, context.Alunos.Count());
        }

        [Fact]
        public void Cadastrar_EmailOuSenhaVazios_DeveRetornarBadRequest()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            var controller = new AuthController(context);
            var alunoInvalido = new Aluno
            {
                Nome = "Carlos Silva",
                Email = "", // E-mail vazio
                Senha = ""
            };

            // ACT
            var resultado = controller.Cadastrar(alunoInvalido);

            // ASSERT
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(resultado);
            Assert.Equal(400, badRequestResult.StatusCode);
        }

        [Fact]
        public void Cadastrar_EmailJaExistente_DeveRetornarBadRequest()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            context.Alunos.Add(new Aluno { Nome = "Maria", Email = "maria@capacitapro.com", Senha = "123" });
            context.SaveChanges();

            var controller = new AuthController(context);
            var alunoDuplicado = new Aluno { Nome = "Maria Segunda", Email = "MARIA@capacitapro.com", Senha = "456" };

            // ACT
            var resultado = controller.Cadastrar(alunoDuplicado);

            // ASSERT
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(resultado);
            Assert.Equal(400, badRequestResult.StatusCode);
        }

        #endregion

        #region --- TESTES DE LOGIN ---

        [Fact]
        public void Login_CredenciaisValidas_DeveRetornarOk()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            context.Alunos.Add(new Aluno { Nome = "João", Email = "joao@capacitapro.com", Senha = "senhaSegura123" });
            context.SaveChanges();

            var controller = new AuthController(context);
            var dto = new LoginDTO { Email = "joao@capacitapro.com", Senha = "senhaSegura123" };

            // ACT
            var resultado = controller.Login(dto);

            // ASSERT
            var okResult = Assert.IsType<OkObjectResult>(resultado);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Login_SenhaIncorreta_DeveRetornarUnauthorized()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            context.Alunos.Add(new Aluno { Nome = "João", Email = "joao@capacitapro.com", Senha = "senhaCorreta" });
            context.SaveChanges();

            var controller = new AuthController(context);
            var dto = new LoginDTO { Email = "joao@capacitapro.com", Senha = "senhaErrada" };

            // ACT
            var resultado = controller.Login(dto);

            // ASSERT
            var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(resultado);
            Assert.Equal(401, unauthorizedResult.StatusCode);
        }

        [Fact]
        public void Login_EmailOuSenhaVazios_DeveRetornarBadRequest()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            var controller = new AuthController(context);
            var dto = new LoginDTO { Email = "", Senha = "" };

            // ACT
            var resultado = controller.Login(dto);

            // ASSERT
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(resultado);
            Assert.Equal(400, badRequestResult.StatusCode);
        }

        #endregion

        #region --- TESTES DE ATUALIZAÇÃO DE PERFIL ---

        [Fact]
        public void AtualizarPerfil_AlunoExistente_DeveAtualizarERetornarOk()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            context.Alunos.Add(new Aluno { Nome = "Ana", Email = "ana@capacitapro.com", Instituicao = "Escola A" });
            context.SaveChanges();

            var controller = new AuthController(context);
            var dto = new AtualizarPerfilDto 
            { 
                Email = "ana@capacitapro.com", 
                Nome = "Ana Souza", 
                Instituicao = "Universidade B" 
            };

            // ACT
            var resultado = controller.AtualizarPerfil(dto);

            // ASSERT
            var okResult = Assert.IsType<OkObjectResult>(resultado);
            Assert.Equal(200, okResult.StatusCode);

            var alunoNoBanco = context.Alunos.First(a => a.Email == "ana@capacitapro.com");
            Assert.Equal("Ana Souza", alunoNoBanco.Nome);
            Assert.Equal("Universidade B", alunoNoBanco.Instituicao);
        }

        [Fact]
        public void AtualizarPerfil_AlunoInexistente_DeveRetornarNotFound()
        {
            // ARRANGE
            using var context = GetInMemoryDbContext();
            var controller = new AuthController(context);
            var dto = new AtualizarPerfilDto 
            { 
                Email = "naoexistente@capacitapro.com", 
                Nome = "Teste", 
                Instituicao = "Teste" 
            };

            // ACT
            var resultado = controller.AtualizarPerfil(dto);

            // ASSERT
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(resultado);
            Assert.Equal(404, notFoundResult.StatusCode);
        }

        #endregion
    }
}