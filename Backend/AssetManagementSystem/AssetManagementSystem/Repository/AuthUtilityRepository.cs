using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AssetManagementSystem.Repository
{
	public class AuthUtilityRepository : IAuthUtilityRepository
	{
		private readonly AppSettings _appSettings;
		private readonly GoogleSettings _googleSettings;
        private readonly IConfigurationSection _googleOAuthSettings;
        private readonly IConfiguration _configuration;

        public AuthUtilityRepository(IOptions<AppSettings> appSettings, IOptions<GoogleSettings> googleSettings, IConfiguration configuration)
        {
			_appSettings = appSettings.Value;
            _googleSettings = googleSettings.Value;
        }

		public bool CheckPassword(string password, byte[] passwordSalt, byte[] passwordHash)
		{
			bool result;

			using (HMACSHA512? hmac = new HMACSHA512(passwordSalt))
			{
				var compute = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				result = compute.SequenceEqual(passwordHash);
			}

			return result;
		}

		public dynamic JwtGenerator(int id, string name, string role)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(this._appSettings.Secret);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[] { new("id", id.ToString()), new(ClaimTypes.Role, role) }),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			var encryptorToken = tokenHandler.WriteToken(token);

			return new { token = encryptorToken, name = name };
		}

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuthDto externalAuth)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _googleSettings.ClientID }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
				return null;
            }
        }
    }
}
