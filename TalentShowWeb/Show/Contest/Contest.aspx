<%@ Page Title="Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contest.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contest" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>
<%@ Register TagPrefix="custom" TagName="ScoreForm" Src="~/Show/Contest/ScoreForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <% if (IsUserAnAdmin())
        { %>
            <div class="form-group">
                <asp:Button runat="server" ID="btnEdit" Text="Edit" OnClick="btnEdit_Click" CssClass="btn btn-sm btn-primary" />
                <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this contest?');" CssClass="btn btn-sm btn-danger" />
            </div>
    <% } %>
    <hr />
    <% if (IsContestJudge())
        { %>
            <custom:ScoreForm runat="server" ID="scoreForm" />
            <br />
    <% }
      if(IsUserAnAdmin())
       { %>
            <custom:HyperlinkListPanel runat="server" ID="contestantsList" />
            <br />
            <custom:HyperlinkListPanel runat="server" ID="judgesList" />
            <br />
            <custom:HyperlinkListPanel runat="server" ID="scoreCriteriaList" />
    <% } %>
    <script type="text/javascript">
        function AddWarningFeedback(elem){
            var $elem = $(elem).parent();
            var $span = $elem.find("span");

            $elem.removeClass("has-success");
            $span.removeClass("glyphicon-ok"); 

            $elem.removeClass("has-warning");      
            $span.removeClass("glyphicon-warning-sign");

            $elem.removeClass("has-error");      
            $span.removeClass("glyphicon-remove");

            $elem.addClass("has-warning");
            $span.addClass("glyphicon-warning-sign");
        }

        function SetScore(contestId, contestantId, scoreCriterionId, score, elem) {
            var $elem = $(elem).parent();
            var $span = $elem.find("span");

            $elem.removeClass("has-success");
            $span.removeClass("glyphicon-ok");

            $elem.removeClass("has-warning");      
            $span.removeClass("glyphicon-warning-sign"); 

            $elem.removeClass("has-error");      
            $span.removeClass("glyphicon-remove"); 

            $elem.addClass("has-warning");
            $span.addClass("glyphicon-warning-sign");

            var data = JSON.stringify({"contestId": contestId, "contestantId": contestantId, "scoreCriterionId": scoreCriterionId, "score":score});
            $.ajax({
                type: 'POST',
                url: '<%= ResolveUrl("~/Show/Contest/Contest.aspx/SetScore") %>',
                data: data,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {     
                    $elem.removeClass("has-warning")
                    $span.removeClass("glyphicon-warning-sign");

                    $elem.addClass("has-success");
                    $span.addClass("glyphicon-ok");
                },
                error: function (jqXHR, exception) {
                    $elem.removeClass("has-warning")
                    $span.removeClass("glyphicon-warning-sign");

                    $elem.addClass("has-error");
                    $span.addClass("glyphicon-remove");
                }      
            });
        }
    </script>
</asp:Content>
