using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace api.Controllers
{
    [Authorize]
    [Route("routes")]
    [ApiController]
    public class RoutesController : Controller
    {
        private readonly ILogger<RoutesController> _logger;

        public RoutesController(ILogger<RoutesController> logger)
        {
            _logger = logger;
        }

        [HttpGet("list")]
        public Results<Ok<List<Models.Route>>, BadRequest> Routes(
            [FromServices] FakeContext fakeContext,
            CancellationToken cancellationToken)
        {
            try
            {
                return TypedResults.Ok(fakeContext.Routes);
            }
            catch (Exception e)
            {
                _logger.LogError("{path} Error: {message}\nStackTrace: {StackTrace}", Request.Path, e.Message, e.StackTrace);
                return TypedResults.BadRequest();
            }
        }

        [HttpGet("{routeId}")]
        public Results<Ok<Models.Route>, NotFound, BadRequest> Route(
            [FromServices] FakeContext fakeContext,
            [FromRoute][Required] int routeId,
            CancellationToken cancellationToken)
        {
            try
            {
                var route = fakeContext.Routes.FirstOrDefault(x => x.Id == routeId);
                if (route == null) 
                {
                    return TypedResults.NotFound();
                }
                return TypedResults.Ok(fakeContext.Routes.FirstOrDefault(x => x.Id == routeId));
            }
            catch (Exception e)
            {
                _logger.LogError("{path} Error: {message}\nStackTrace: {StackTrace}", Request.Path, e.Message, e.StackTrace);
                return TypedResults.BadRequest();
            }
        }
    }
}
