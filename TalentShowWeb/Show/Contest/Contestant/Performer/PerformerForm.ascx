<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="PerformerForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.Performer.PerformerForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="First Name" AssociatedControlID="txtFirstName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtFirstName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtFirstName" ForeColor="Red" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Last Name" AssociatedControlID="txtLastName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtLastName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtLastName" ForeColor="Red" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Affiliation" AssociatedControlID="dropDownListOrganizations" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListOrganizations" CssClass="form-control" Width="275" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="dropDownListOrganizations" ForeColor="Red" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Division" AssociatedControlID="dropDownListDivisions" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListDivisions" CssClass="form-control" Width="275" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="dropDownListDivisions" ForeColor="Red" ErrorMessage="Required" Display="Dynamic" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>