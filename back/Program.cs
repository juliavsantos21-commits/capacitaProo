var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// 2. Aplica a política de CORS
app.UseCors("LiberarFrontEnd");

// 3. Mapeia os seus Controllers (ex: AuthController)
app.MapControllers();

app.Run();