namespace back
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Instituicao { get; set; } = string.Empty;
        public string AnoConclusao { get; set; } = string.Empty;
        public string NomeArquivoCurriculo { get; set; } = string.Empty;
    }
}