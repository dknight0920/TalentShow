using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using TalentShowWeb.Account.Util;
using TalentShowWeb.CustomControls.Models;

namespace TalentShowWeb.CustomControls.Renderers
{
    public static class HyperlinkListPanelRenderer
    {
        public static void Render(HyperlinkListPanel Panel, HyperlinkListPanelConfig Config)
        {
            Panel.ShowAddButton = (Config.ButtonClickHandler == null ? false : true) && new AccountUtil(HttpContext.Current).IsUserAnAdmin();

            if (Panel.ShowAddButton)
                Panel.GetPanelAddButton().Click += new EventHandler(Config.ButtonClickHandler);

            Panel.GetPanelTitleLabel().Text = Config.PanelTitle;

            var linkRepeater = Panel.GetHyperlinkListRepeater();
            linkRepeater.DataSource = Config.Items;
            linkRepeater.DataBind();
        }
    }
}