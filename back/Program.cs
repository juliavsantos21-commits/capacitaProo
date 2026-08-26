using System.Text;
using back;
using Microsoft.EntityFrameworkCore;

// Força o terminal a exibir acentos corretamente (UTF-8)
Console.OutputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);

// Configura a conexão com o banco SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=capacitapro.db"));

// 1. Registra os Controllers e a política de CORS
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LiberarFrontEnd", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Substituído AddOpenApi por Swagger (.NET 8.0)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Substituído MapOpenApi por SwaggerUI (.NET 8.0)
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2. Aplica a política de CORS
app.UseCors("LiberarFrontEnd");

// 3. Mapeia os seus Controllers (ex: AuthController)
app.MapControllers();

app.Run();