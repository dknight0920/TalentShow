using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using TalentShowWeb.CustomControls.Models;

namespace TalentShowWeb.CustomControls.Renderers
{
    public static class HyperlinkListPanelRenderer
    {
        public static void Render(HyperlinkListPanel Panel, HyperlinkListPanelConfig Config)
        {
            Panel.ShowAddButton = Config.ButtonClickHandler == null ? false : true;

            if (Panel.ShowAddButton)
            {
                var panelAddButton = (Button)Panel.FindControl("panelAddButton");
                panelAddButton.Click += new EventHandler(Config.ButtonClickHandler);
            }

            var panelTitleLabel = (Label)Panel.FindControl("panelTitle");
            panelTitleLabel.Text = Config.PanelTitle;

            var linkRepeater = (Repeater)Panel.FindControl("hyperLinkList");
            linkRepeater.DataSource = Config.Items;
            linkRepeater.DataBind();
        }
    }
}