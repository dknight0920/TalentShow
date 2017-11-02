using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.CustomControls.Models
{
    public class HyperlinkListPanelItem
    {
        public string URL { get; private set; }
        public string Heading { get; private set; }
        public string Text { get; private set; }

        public HyperlinkListPanelItem(string URL, string Heading, string Text)
        {
            this.URL = URL;
            this.Heading = Heading;
            this.Text = Text;
        }
    }
}