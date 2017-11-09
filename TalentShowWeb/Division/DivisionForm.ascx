<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DivisionForm.ascx.cs" Inherits="TalentShowWeb.Division.DivisionForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="Name" AssociatedControlID="txtName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtName" ForeColor="Red" ErrorMessage="Required" Display="Dynamic" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>