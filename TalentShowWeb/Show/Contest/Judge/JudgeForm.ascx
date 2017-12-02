<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="JudgeForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.Judge.JudgeForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="User" AssociatedControlID="dropDownListUsers" CssClass="control-label" />
    <asp:DropDownList runat="server" ID="dropDownListUsers" CssClass="form-control" Width="280" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="dropDownListUsers" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>