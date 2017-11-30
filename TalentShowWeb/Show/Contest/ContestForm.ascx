<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ContestForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.ContestForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="Contest Name" AssociatedControlID="txtContestName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtContestName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtContestName" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Description" AssociatedControlID="txtDescription" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtDescription" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtDescription" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Maximum Duration in Minutes" AssociatedControlID="txtMaxDuration" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtMaxDuration" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtMaxDuration" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
    <asp:RegularExpressionValidator runat="server" ControlToValidate="txtMaxDuration" CssClass="text-danger" ErrorMessage="Only Numbers Allowed" ValidationExpression="\d+" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Time Keeper" AssociatedControlID="dropDownListTimeKeepers" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListTimeKeepers" CssClass="form-control" Width="275" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="dropDownListTimeKeepers" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Status" AssociatedControlID="dropDownListStatus" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListStatus" CssClass="form-control" Width="275" >
        <asp:ListItem Value="Pending"> Pending </asp:ListItem>
        <asp:ListItem Value="In Progress"> In Progress </asp:ListItem>
        <asp:ListItem Value="Complete"> Complete </asp:ListItem>
    </asp:DropDownList>
    <asp:RequiredFieldValidator runat="server" ControlToValidate="dropDownListStatus" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>