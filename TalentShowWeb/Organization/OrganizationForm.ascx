<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OrganizationForm.ascx.cs" Inherits="TalentShowWeb.Organization.OrganizationForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="Organization Name" AssociatedControlID="txtName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtName" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Parent Organization" AssociatedControlID="dropDownListOrganizations" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListOrganizations" CssClass="form-control" Width="280" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>