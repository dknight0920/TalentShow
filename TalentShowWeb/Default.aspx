<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="TalentShowWeb._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="jumbotron">
        <h1>Welcome <img runat="server" style="float:right;" src="~/Images/logo.png" width="200" height="195" /></h1>
        <p class="lead">This is the Talent Show Control Center for IPHC Fine Arts Festival.</p>
        <p><a href="http://iphc.org/youthquest/fine-arts-festival/" target="_blank" class="btn btn-primary btn-lg">Learn more about IPHC FAF &raquo;</a></p>
    </div>

    <div class="row">
        <div class="col-md-4">
            <h2>YouthQuest</h2>
            <p>
                YouthQuest is a four-day conference hosted by Student Ministries, of IPHC Discipleship Ministries. Students and leaders will be challenged to live a life of true discipleship through powerful worship, inspiring speakers, and loads of fun.
            </p>
            <p>
                <a class="btn btn-default" href="http://iphc.org/youthquest/history/" target="_blank">Learn more &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>IPHC</h2>
            <p>
                The International Pentecostal Holiness Church (IPHC) is a historical Pentecostal denomination formed in 1898, but our spiritual roots are in the Day of Pentecost mentioned in the book of Acts. We currently have more than two million members and affiliates in 103 countries. 
            </p>
            <p>
                <a class="btn btn-default" href="http://iphc.org/about-us/" target="_blank">Learn more &raquo;</a>
            </p>
        </div>
        <div class="col-md-4">
            <h2>Discipleship</h2>
            <p>
                Discipleship Ministries exists to lead generations in actively following Christ.
            </p>
            <p>
                <a class="btn btn-default" href="http://iphc.org/discipleship/" target="_blank">Learn more &raquo;</a>
            </p>
        </div>
    </div>

</asp:Content>
