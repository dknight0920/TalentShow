<%@ Page Title="Contest" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Contestant.aspx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.Contestant" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><asp:Label runat="server" ID="labelPageTitle" /></h2>
    <p><asp:Label runat="server" ID="labelPageDescription" /></p>
    <div class="form-group">
        <asp:Button runat="server" ID="btnEdit" Text="Edit" OnClick="btnEdit_Click" CssClass="btn btn-sm btn-primary" />
        <asp:Button runat="server" ID="btnDelete" Text="Delete" OnClick="btnDelete_Click" OnClientClick="return confirm('Are you sure you want to delete this contestant?');" CssClass="btn btn-sm btn-danger" />
    </div>
    <hr />
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">Performance Duration</h3>
        </div>
        <div class="panel-body">
            <div class="stopwatch"></div>
        </div>
    </div>
    <br />
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <% var scoreCards = GetScoreCards();  %>
            <h3 class="panel-title pull-left">Score Cards <span class="badge"><% Response.Write(scoreCards.Count()); %></span></h3>
        </div>
        <div class="panel-body">

            <% foreach (var scoreCard in scoreCards)
                { %>
                    <div class="panel panel-warning">
                        <div class="panel-heading clearfix">
                            <h3 class="panel-title pull-left">Score Card by <% Response.Write(GetJudgeEmailAddress(scoreCard.Judge.UserId)); %></h3>
                        </div>
                        <div class="panel-body">
                            <% foreach (var scorableCriterion in scoreCard.ScorableCriteria)
                                { %>
                                    <h4><% Response.Write(scorableCriterion.ScoreCriterion.CriterionDescription); %></h4>
                                    <p><b>Score</b>: <% Response.Write(scorableCriterion.Score); %></p>
                                    <% if(!String.IsNullOrWhiteSpace(scorableCriterion.Comment))
                                        { %>
                                            <p><b>Comment</b>: <% Response.Write(scorableCriterion.Comment); %></p>
                                    <% } %>
                                    <hr />
                            <% } %>
                            <h3>Card Total: <% Response.Write(scoreCard.TotalScore); %></h3>
                        </div>
                    </div>
                    <br />
             <% } %>
            <h2>Total Score: <% Response.Write(GetTotalScore()); %></h2>
            <h1>Final Score: <% Response.Write(GetFinalScore()); %></h1>
        </div>
    </div>
    <br />
    <custom:HyperlinkListPanel runat="server" ID="performersList" />
    <script>
        var Stopwatch = function(elem, options) {

          var timer       = createTimer(),
              startButton = createButton("start", start, "primary"),
              stopButton  = createButton("stop", stop, "danger"),
              resetButton = createButton("reset", reset, "default"),
              offset,
              clock,
              interval;

          // default options
          options = options || {};
          options.delay = options.delay || 1;

          // append elements     
          elem.appendChild(timer);
          elem.appendChild(document.createElement("br"));
          elem.appendChild(startButton);
          elem.appendChild(stopButton);
          elem.appendChild(resetButton);

          // initialize
          reset();

          // private functions
          function createTimer() {
            var span = document.createElement("span");
            span.setAttribute("style", "font-size: 24pt; font-weight: bold;");
            return span;
          }

          function createButton(action, handler, color) {
            var button = document.createElement("button");
            button.innerHTML = action;
            button.classList.add("btn");
            button.classList.add("btn-" + color);
            button.setAttribute("style", "margin-right: 5px;");
            button.addEventListener("click", function(event) {
              handler();
              event.preventDefault();
            });
            return button;
          }

          function start() {
            if (!interval) {
              offset   = Date.now();
              interval = setInterval(update, options.delay);
            }
          }

          function stop() {
            if (interval) {
              clearInterval(interval);
              interval = null;
            }
          }

          function reset() {
            clock = 0;
            render();
          }

          function update() {
            clock += delta();
            render();
          }

          function render() {
            timer.innerHTML = clock/1000; 
          }

          function delta() {
            var now = Date.now(),
                d   = now - offset;

            offset = now;
            return d;
          }

          // public API
          this.start  = start;
          this.stop   = stop;
          this.reset  = reset;
        };

        var elems = document.getElementsByClassName("stopwatch");

        for (var i=0, len=elems.length; i<len; i++) {
            new Stopwatch(elems[i], {delay: 10});
        }
    </script>  
</asp:Content>