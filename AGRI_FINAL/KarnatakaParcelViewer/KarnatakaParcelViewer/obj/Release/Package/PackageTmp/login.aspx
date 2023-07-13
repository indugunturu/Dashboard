<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="KarnatakaParcelViewer.login" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
          <script>
              $(function () {

                  $("#ContentPlaceHolder1_username,#ContentPlaceHolder1_password").val("");

                  var status = "<%=UserStatus%>";

                if (status == 1) {

                    $("#divAuthorization").html("Your not  Authorised to Access the Website. Please contact the Admin.");
                    $("#divAuthorization").dialog({
                        modal: true,
                        buttons: {
                            "OK": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
                if (status == 2) {

                    $("#divAuthorization").html("Invalid User name or  Password.");
                    $("#divAuthorization").dialog({
                        modal: true,
                        buttons: {
                            "OK": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                }
            });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
 <div class="container" style="color:black">
        <div class="col-md-12 col-md-offset-0">
            <h3><b>Login Account</b></h3>
          
            <div class="panel-body" >
            </div>
            <div id="formUserDetails" class="form-horizontal">
                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="username" CssClass="col-md-2 control-label">E-mail</asp:Label>

                    <div class="col-md-4 ">
                        <asp:TextBox runat="server" ID="username" CssClass="form-control" TextMode="Email" ValidationGroup="login" />
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="username" CssClass="text-danger" ErrorMessage="E-mail ID is required" ValidationGroup="login" />
                    </div>
                </div>

                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="password" CssClass="col-md-2 control-label">Password</asp:Label>
                   
                     <div class="col-md-4">
                        <asp:TextBox runat="server" ID="password" CssClass="form-control" TextMode="Password" ValidationGroup="login" />
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="password" CssClass="text-danger" ErrorMessage="Passowrd is required" ValidationGroup="login" />


                    </div>
                </div>


                <div class="form-group">
                    <div class="col-md-2">
                    </div>
                    <div class="controls">
                        <div class="col-md-2">
                            <asp:Button ID="btnlogin" runat="server" Text="Login" CssClass="btn btn-primary btn-color btn-md" ValidationGroup="login" OnClick="btnlogin_Click" />

                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <div class="col-md-1">
                    </div>
                    <div id="divAuthorization" title=" Unable to Access the Account" style="font-size: 12px; display: none;">
                    </div>
                </div>


                <div class="form-group"  style="color:red">
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-6">
<%--                        <p><a href="forgot.aspx">Forgot Password</a></p>--%>
                        <p ><a href="Registration.aspx" style="color:blue"><b>Create User</b></a></p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</asp:Content>
