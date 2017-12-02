<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ShowForm.ascx.cs" Inherits="TalentShowWeb.Show.ShowForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="Show Name" AssociatedControlID="txtShowName" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtShowName" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtShowName" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Description" AssociatedControlID="txtDescription" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtDescription" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtDescription" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Import Data from Excel File" AssociatedControlID="fileImportData" CssClass="control-label" />
    <asp:FileUpload runat="server" ID="fileImportData" CssClass="form-control" Width="280" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>