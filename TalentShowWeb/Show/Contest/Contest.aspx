<%@ Page Title="Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contest.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contest" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>
<%@ Register TagPrefix="custom" TagName="ScoreForm" Src="~/Show/Contest/ScoreForm.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><small>Contest:</small> <asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <% if (IsUserAnAdmin())
        { %>
            <div class="form-group">
                <asp:Button runat="server" ID="btnEdit" Text="Edit" OnClick="btnEdit_Click" CssClass="btn btn-sm btn-primary" />
                <% if (IsUserASuperuser())
                    { %>
                        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this contest?');" CssClass="btn btn-sm btn-danger" />
                <% } %>
                <asp:Button runat="server" ID="btnViewJudgeSheets" Text="Judge Sheets" OnClick="btnViewJudgeSheets_Click" CssClass="btn btn-sm btn-success" />
            </div>
    <% } %>
    <hr />
    <% if (IsAllowedToScoreForm())
        { %>
            <custom:ScoreForm runat="server" ID="scoreForm" />
            <br />
    <% }
      if(IsAllowedToViewContestantsList())
       { %>
            <custom:HyperlinkListPanel runat="server" ID="contestantsList" />
            <br />
    <% }
      if(IsUserAnAdmin())
       { %>
            <custom:HyperlinkListPanel runat="server" ID="judgesList" />
            <br />
            <custom:HyperlinkListPanel runat="server" ID="scoreCriteriaList" />
    <% } %>
    <script type="text/javascript">
        function AddWarningFeedback(elem){
            var $elem = $(elem).parent();
            var $span = $elem.find("span");

            DisplayWarning($elem, $span);
        }

        function DisplayWarning($elem, $span){
            $elem.removeClass("has-success");
            $span.removeClass("glyphicon-ok"); 

            $elem.removeClass("has-warning");      
            $span.removeClass("glyphicon-warning-sign");

            $elem.removeClass("has-error");      
            $span.removeClass("glyphicon-remove");

            $elem.addClass("has-warning");
            $span.addClass("glyphicon-warning-sign");
        }

        function DisplaySuccess($elem, $span){
            $elem.removeClass("has-warning")
            $span.removeClass("glyphicon-warning-sign");

            $elem.addClass("has-success");
            $span.addClass("glyphicon-ok");
        }

        function DisplayError($elem, $span){
            $elem.removeClass("has-warning")
            $span.removeClass("glyphicon-warning-sign");

            $elem.addClass("has-error");
            $span.addClass("glyphicon-remove");
        }

        function SetScore(contestId, contestantId, scoreCriterionId, score, elem) {
            var $elem = $(elem).parent();
            var $span = $elem.find("span");

            DisplayWarning($elem, $span);

            if(!$.isNumeric(score)){
                toastr.error("The value \"" + score + "\" is not numeric. Scores must be numeric.");
                DisplayError($elem, $span);
                return;
            }

            queueAndProcessRequest({
                "$elem": $elem,
                "$span": $span,
                "url": '<%= ResolveUrl("~/Show/Contest/Contest.aspx/SetScore") %>',
                "data": {"contestId": contestId, "contestantId": contestantId, "scoreCriterionId": scoreCriterionId, "score":score},
                "successMsg": "Score Saved: " + score
            });

            var totalScore = 0;

            $(".score-contestant-" + contestantId).each(function(){
                var value = $(this).val();
                if($.isNumeric(value)){
                    totalScore += parseFloat(value);
                }
		   	});

            $("#totalScoreContestant_" + contestantId).text(totalScore);
        }

        function ShowCommentFields(elemClassName, e){
            e.preventDefault();
            $("." + elemClassName).slideToggle();
        }

        function SetComment(contestId, contestantId, scoreCriterionId, comment, elem) {
            var $elem = $(elem).parent();
            var $span = $elem.find("span");

            DisplayWarning($elem, $span);

            queueAndProcessRequest({
                "$elem": $elem,
                "$span": $span,
                "url": '<%= ResolveUrl("~/Show/Contest/Contest.aspx/SetComment") %>',
                "data": {"contestId": contestId, "contestantId": contestantId, "scoreCriterionId": scoreCriterionId, "comment":comment},
                "successMsg": "Comment Saved: " + comment
            });
        }

        var isCurrentlyProcessingARequest = false;
        var updateScoreCardRequestQueue = [];

        function queueAndProcessRequest(request){
            updateScoreCardRequestQueue.push(request);
            processRequestQueue();
        }

        function processRequestQueue(){
            if(!isCurrentlyProcessingARequest && updateScoreCardRequestQueue.length > 0){
                sendRequest(updateScoreCardRequestQueue.shift());
            }
        }

        function sendRequest(request){
            isCurrentlyProcessingARequest = true;
            $.ajax({
                type: 'POST',
                url: request.url,
                data: JSON.stringify(request.data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (msg) {
                    isCurrentlyProcessingARequest = false;
                    processRequestQueue();
                    toastr.success(request.successMsg);
                    DisplaySuccess(request.$elem, request.$span);
                },
                error: function (jqXHR, exception) {
                    isCurrentlyProcessingARequest = false;
                    processRequestQueue();
                    handleAjaxError(jqXHR);
                    DisplayError(request.$elem, request.$span);
                }      
            });
        }

        function handleAjaxError(jqXHR){
            if(jqXHR){
                switch (jqXHR.status) {
                    case 500:
                        var error = JSON.parse(jqXHR.responseText);
                        if(error && error.Message){
                            toastr.error(error.Message);
                        } else {
                            toastr.error("Unexpected Error: " + jqXHR.responseText);
                        }
                        break;
                    case 0:
                        toastr.error("The server is unreachable. Check your internet connection.");
                        break;
                    default:
                        toastr.error("Unexpected Error: " + jqXHR.responseText);
                        break;
                }
            }
        }

        $(".score-form-input").prop('disabled', false);
    </script>
</asp:Content>
