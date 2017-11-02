using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TalentShowWeb.CustomControls.Models
{
    public class HyperlinkListPanelConfig
    {
        public string PanelTitle { get; private set; }
        public Action<object, EventArgs> ButtonClickHandler { get; private set; }
        public IEnumerable<HyperlinkListPanelItem> Items { get; private set; }

        public HyperlinkListPanelConfig(string PanelTitle, IEnumerable<HyperlinkListPanelItem> Items, Action<object, EventArgs> ButtonClickHandler = null)
        {
            this.PanelTitle = PanelTitle;
            this.Items = Items;
            this.ButtonClickHandler = ButtonClickHandler;
        }
    }
}