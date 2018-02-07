<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserForm.ascx.cs" Inherits="TalentShowWeb.User.UserForm" %>

<div class="form-group">   
    <asp:Label runat="server" Text="User Id" AssociatedControlID="labelUserName" CssClass="control-label" />
    <br />
    <asp:Label runat="server" ID="labelUserName" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Email" AssociatedControlID="txtEmail" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtEmail" CssClass="form-control" TextMode="Email" MaxLength="256" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtEmail" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:CheckBox runat="server" ID="chkIsAdmin" /> <asp:Label runat="server" Text="Is an Administrator" AssociatedControlID="chkIsAdmin" CssClass="control-label" /> 
</div>
<div class="form-group">
    <asp:CheckBox runat="server" ID="chkIsSuperuser" /> <asp:Label runat="server" Text="Is a Superuser" AssociatedControlID="chkIsSuperuser" CssClass="control-label" /> 
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>