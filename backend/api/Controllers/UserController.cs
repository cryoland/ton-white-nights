using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Controllers
{
    [Authorize]
    [Route("user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpPost("explore")]
        public IActionResult ExploreInitDataFromTMA([FromBody] object json)
        {
          string data = JsonSerializer.Serialize(json, new JsonSerializerOptions { WriteIndented = true });
            _logger.LogInformation(data);
            return Ok();
        }

        [HttpGet("balance")]
        public Results<Ok<object>, BadRequest> RouteList(
            [FromServices] FakeContext fakeContext,
            CancellationToken cancellationToken)
        {
            try
            {
                return TypedResults.Ok((object)new { fakeContext.Balance });
            }
            catch (Exception e)
            {
                _logger.LogError("{path} Error: {message}\nStackTrace: {StackTrace}", Request.Path, e.Message, e.StackTrace);
                return TypedResults.BadRequest();
            }
        }

        [HttpGet("routes")]
        public Results<Ok<List<Models.UserRoute>>, BadRequest> UserRoutes(
            [FromServices] FakeContext fakeContext,
            CancellationToken cancellationToken)
        {
            try
            {
                return TypedResults.Ok(fakeContext.UserRoutes);
            }
            catch (Exception e)
            {
                _logger.LogError("{path} Error: {message}\nStackTrace: {StackTrace}", Request.Path, e.Message, e.StackTrace);
                return TypedResults.BadRequest();
            }
        }

        [HttpGet("routes/current")]
        public Results<Ok<UserRoute>, BadRequest> UserCurrentRoute(
            [FromServices] FakeContext fakeContext,
            CancellationToken cancellationToken)
        {
            try
            {
                return TypedResults.Ok(fakeContext.UserRoutes.FirstOrDefault());
            }
            catch (Exception e)
            {
                _logger.LogError("{path} Error: {message}\nStackTrace: {StackTrace}", Request.Path, e.Message, e.StackTrace);
                return TypedResults.BadRequest();
            }
        }
    }
}
