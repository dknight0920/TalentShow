<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HyperlinkListPanel.ascx.cs" Inherits="TalentShowWeb.CustomControls.HyperlinkListPanel" %>

<div class="panel panel-default">
    <div class="panel-heading clearfix">
        <h3 class="panel-title pull-left"><asp:Label runat="server" ID="panelTitle"></asp:Label></h3>
        <% if (ShowAddButton) {%>
            <span class="pull-right">
                <asp:Button runat="server" ID="panelAddButton" Text="Add" CssClass="btn btn-sm btn-primary" />
            </span>
        <% } %>
    </div>
    <div class="panel-body">
        <div class="list-group">
            <asp:Repeater runat="server" ID="hyperLinkList">
                <ItemTemplate>
                    <asp:HyperLink runat="server" CssClass="list-group-item" NavigateUrl='<%# Eval("URL") %>'>
                        <h4 class="list-group-item-heading"><%# Eval("Heading") %></h4>
                        <span class="list-group-item-text"><%# Eval("Text") %></span>
                    </asp:HyperLink>
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </div>
</div>