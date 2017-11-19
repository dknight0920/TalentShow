using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.Models
{
    public class BreadCrumb
    {
        public string URL { get; private set; }
        public string Name { get; private set; }
        public bool IsActive { get; private set; }

        public BreadCrumb(string URL, string Name, bool IsActive = false)
        {
            this.URL = URL;
            this.Name = Name;
            this.IsActive = IsActive;
        }
    }
}