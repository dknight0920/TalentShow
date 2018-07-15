<%@ Page Title="System" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="SystemInfo.aspx.cs" Inherits="TalentShowWeb.SystemInfo" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %></h2>
    <hr />
    <div class="panel panel-default">
        <%
            var storageDrives = System.IO.DriveInfo.GetDrives().Where(d => d.IsReady);
        %>
        <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">Storage Drives <span class="badge"><% Response.Write(storageDrives.Count()); %></span></h3>
        </div>
        <div class="panel-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Free Space</th>
                    </tr>    
                </thead>
                <tbody>
                    <%
                        foreach (System.IO.DriveInfo drive in storageDrives)
                        {                
                    %>
                            <tr>
                                <td><% Response.Write(drive.Name); %></td>
                                <td><% Response.Write(FormatBytes(drive.TotalSize)); %></td>
                                <td><% Response.Write(FormatBytes(drive.AvailableFreeSpace)); %></td>
                            </tr>
                    <%
                        }
                    %>
                </tbody>
            </table>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">R.A.M.</h3>
        </div>
        <div class="panel-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Total Physical Memory</th>
                        <th>Available Physical Memory</th>
                        <th>Memory Used by App.</th>
                    </tr>    
                </thead>
                <tbody>
                    <tr>
                        <td><% Response.Write(GetTotalPhysicalMemory()); %></td>
                        <td><% Response.Write(GetAvailablePhysicalMemory()); %></td>
                        <td><% Response.Write(GetMemoryUsedByApp()); %></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</asp:Content>
