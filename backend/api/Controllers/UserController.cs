using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpPost(Name = "explore")]
        public IActionResult ExploreInitDataFromTMA([FromBody] object json)
        {
            string data = JsonSerializer.Serialize(json, new JsonSerializerOptions { WriteIndented = true });
            _logger.LogInformation(data);
            return Ok();
        }
    }
}
