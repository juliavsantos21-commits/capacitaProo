using Microsoft.AspNetCore.Mvc;
using back.Models;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("cadastrar")]
        public IActionResult Cadastrar([FromBody] Aluno aluno)
        {
            Console.WriteLine("\n====================================");
            Console.WriteLine("---> DADOS CHEGARAM DO FRONT-END! <---");
            Console.WriteLine($"Nome: {aluno.Nome}");
            Console.WriteLine($"E-mail: {aluno.Email}");
            Console.WriteLine($"Instituição: {aluno.Instituicao}");
            Console.WriteLine($"Ano Conclusão: {aluno.AnoConclusao}");
            Console.WriteLine($"Arquivo Anexado: {aluno.NomeArquivoCurriculo}");
            Console.WriteLine("====================================\n");

            if (string.IsNullOrEmpty(aluno.Email) || string.IsNullOrEmpty(aluno.Senha))
            {
                return BadRequest(new { mensagem = "E-mail e senha são obrigatórios." });
            }

            return Ok(new { mensagem = "Usuário cadastrado com sucesso!", dados = aluno });
        }
    }
}