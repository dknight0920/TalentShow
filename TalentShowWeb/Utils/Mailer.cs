using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace TalentShowWeb.Utils
{
    public class Mailer
    {
        public void Send(MailMessage mailMessage)
        {
            SmtpClient smtpClient = new SmtpClient("localhost");
            smtpClient.UseDefaultCredentials = true;
            smtpClient.Send(mailMessage);
        }
    }
}