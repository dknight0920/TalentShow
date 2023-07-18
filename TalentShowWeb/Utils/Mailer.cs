using System.Net;
using System.Net.Mail;

namespace TalentShowWeb.Utils
{
    public class Mailer
    {
        public void Send(MailMessage mailMessage)
        {
            var smtpClient = new SmtpClient( Properties.Settings.Default.SmtpHost,  Properties.Settings.Default.SmtpPort);
            smtpClient.Credentials = new NetworkCredential( Properties.Settings.Default.SmtpUser,  Properties.Settings.Default.SmtpPassword);
            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);
        }
    }
}