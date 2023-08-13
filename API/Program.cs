using System.Runtime.Serialization;
using System.Runtime.CompilerServices;
using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

/* This code is setting up and configuring a web application in C#. */
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

//Calling Application services from our extension class
builder.Services.ApplicationServices(builder.Configuration);

//Calling Identity services from our extension class
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
//app.UseCors(c=> c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseCors("CORS");
//Add Redirection from HTTP to HTTPS
app.UseHttpsRedirection();

//Jwt Authetication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//Used thiis to seed data from data/Userdataseed.json and create new clean user Data
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<API.Data.DataContext>();
    await context.Database.MigrateAsync();
    await API.Data.Seed.SeedUsers(context);
}
catch(Exception ex)
{
    var logger  = services.GetService<ILogger<Program>>();
    logger.LogError(ex,"An error occur while seeding data/ Migration");
}

app.Run();
