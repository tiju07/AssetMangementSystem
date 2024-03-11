using AssetManagementSystem.Interfaces;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit.Text;
using MimeKit;
using System.Net.Mail;
using System.Diagnostics;
using System.Net;

namespace AssetManagementSystem.Repository
{
    public class EmailService : IEmailService
    {
        public Task Send(string email, string subject, string message)
        {
            var mail = "mailtrap@demomailtrap.com";

            var client = new SmtpClient("live.smtp.mailtrap.io", 587)
            {
                Credentials = new NetworkCredential("api", "b094896200770c39ef79c1209e6ed3da"),
                EnableSsl = true
            };

            return client.SendMailAsync(
                new MailMessage(
                    from: mail,
                    to: email,
                    subject,
                    message
                ));
        }
    }
}
