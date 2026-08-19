using Microsoft.AspNetCore.Mvc;
using back;
using System.Linq;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] Aluno aluno)
        {
            Console.WriteLine("\n====================================");
            Console.WriteLine("---> DADOS CHEGARAM DO FRONT-END! <---");
            Console.WriteLine($"Nome: {aluno.Nome}");
            Console.WriteLine($"E-mail: {aluno.Email}");
            Console.WriteLine("====================================\n");

            if (string.IsNullOrEmpty(aluno.Email) || string.IsNullOrEmpty(aluno.Senha))
            {
                return BadRequest(new { mensagem = "E-mail e senha são obrigatórios." });
            }

            var jaExiste = _context.Alunos.Any(a => a.Email.ToLower() == aluno.Email.ToLower());
            if (jaExiste)
            {
                return BadRequest(new { mensagem = "Este e-mail já está cadastrado!" });
            }

            _context.Alunos.Add(aluno);
            _context.SaveChanges();

            return Ok(new { mensagem = "Usuário cadastrado com sucesso!", dados = aluno });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDTO dados)
        {
            Console.WriteLine("\n====================================");
            Console.WriteLine("---> TENTATIVA DE LOGIN <---");
            Console.WriteLine($"E-mail: {dados.Email}");
            Console.WriteLine("====================================\n");

            if (string.IsNullOrEmpty(dados.Email) || string.IsNullOrEmpty(dados.Senha))
            {
                return BadRequest(new { mensagem = "E-mail e senha são obrigatórios." });
            }

            var alunoEncontrado = _context.Alunos.FirstOrDefault(a => 
                a.Email.ToLower() == dados.Email.ToLower() && 
                a.Senha == dados.Senha);

            if (alunoEncontrado == null)
            {
                return Unauthorized(new { mensagem = "E-mail ou senha incorretos!" });
            }

            return Ok(new 
            { 
                sucesso = true, 
                mensagem = "Login efetuado com sucesso!",
                usuario = new { nome = alunoEncontrado.Nome, email = alunoEncontrado.Email }
            });
        }
    }

    public class LoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
    }
}