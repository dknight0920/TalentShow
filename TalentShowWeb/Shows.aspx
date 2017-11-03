<%@ Page Title="Talent Show Control Center" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Shows.aspx.cs" Inherits="TalentShowWeb.Shows" %>
<%@ Register TagPrefix="custom" TagName="HyperlinkListPanel" Src="~/CustomControls/HyperlinkListPanel.ascx" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <hr />
    <custom:HyperlinkListPanel runat="server" ID="showsList" />
    <div class="stopwatch"></div>
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

