using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace api.Authorization;

internal class ApiKeyAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly string? _apiKey;
    private readonly HttpContext _context;

    public ApiKeyAuthHandler(IHttpContextAccessor accessor,
                             ApiKeyConfig apiKeyConfig,
                             IOptionsMonitor<AuthenticationSchemeOptions> options,
                             ILoggerFactory logger,
                             UrlEncoder encoder,
                             ISystemClock clock)
        : base(options, logger, encoder, clock)
    {
        _context = accessor.HttpContext ?? throw new InvalidOperationException("HttpContext is missing");
        _apiKey = apiKeyConfig?.ApiKey;
    }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        bool allowedAnonymous = _context.GetEndpoint()?.Metadata?.GetMetadata<IAllowAnonymous>() != null;
        string? authHeader = _context.Request.Headers["Authorization"];
        bool isValid = _apiKey is { Length: > 0 }
                       && authHeader is { Length: > 0 } _authHeader
                       && _authHeader.StartsWith("Bearer")
                       && string.Equals(_apiKey, _authHeader.Replace("Bearer", string.Empty).Trim(), StringComparison.InvariantCultureIgnoreCase);

        var identity = new ClaimsIdentity(_context.User.Claims, "ApiKey");
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, "ApiKey");

        var result = isValid || allowedAnonymous ? AuthenticateResult.Success(ticket) : AuthenticateResult.Fail("Invalid api key");

        return Task.FromResult(result);
    }
}
