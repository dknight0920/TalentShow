<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ContestantForm.ascx.cs" Inherits="TalentShowWeb.Show.Contest.Contestant.ContestantForm" %>

<div class="form-group">
    <asp:Label runat="server" Text="Performance Description" AssociatedControlID="txtPerformanceDescription" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtPerformanceDescription" CssClass="form-control" MaxLength="1000" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtPerformanceDescription" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
</div>
<div class="form-group">
    <asp:Label runat="server" Text="Rule Violation Penalty Points" AssociatedControlID="txtRuleViolationPenaltyPoints" CssClass="control-label" />
    <asp:TextBox runat="server" ID="txtRuleViolationPenaltyPoints" CssClass="form-control" />
    <asp:RequiredFieldValidator runat="server" ControlToValidate="txtRuleViolationPenaltyPoints" CssClass="text-danger" ErrorMessage="Required" Display="Dynamic" />
    <asp:RegularExpressionValidator runat="server" ControlToValidate="txtRuleViolationPenaltyPoints" CssClass="text-danger" ErrorMessage="Only Numbers Allowed" ValidationExpression="\d+" Display="Dynamic" />
</div>
<br />
<div class="form-group">
    <asp:Button runat="server" ID="btnSubmit" Text="Submit"  CausesValidation="true" CssClass="btn btn-primary" />
    <asp:Button runat="server" ID="btnCancel" Text="Cancel"  CausesValidation="false" CssClass="btn btn-danger" />
</div>