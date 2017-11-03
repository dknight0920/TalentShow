using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace TalentShowWeb.CustomControls
{
    public partial class HyperlinkListPanel : System.Web.UI.UserControl
    {
        public bool ShowAddButton { get; set; }

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public Label GetPanelTitleLabel()
        {
            return panelTitle;
        }

        public Button GetPanelAddButton()
        {
            return panelAddButton;
        }

        public Repeater GetHyperlinkListRepeater()
        {
            return hyperLinkList;
        }
    }
}