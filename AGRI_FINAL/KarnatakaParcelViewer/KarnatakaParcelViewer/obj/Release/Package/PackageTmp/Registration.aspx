<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="Registration.aspx.cs" Inherits="KarnatakaParcelViewer.Registration" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
       <script src="jslogin/app/UserDetails.js"></script>
     <style>
        body {
            line-height: 2;
        }

        .navbar-default .navbar-brand {
            color: #0386ff;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
      
    <div class="container" style="color:black">

        <div class="col-md-12 col-md-offset-0">
            <h3><b>Create User</b></h3>
            
            <div class="panel-body">
            </div>
             <section id="loginForm">
            <div id="formCreateUserDetails" class="form-horizontal">
                <div class="form-group">
                     <asp:Label runat="server" AssociatedControlID="txtfirstname" CssClass="col-md-2 control-label" ValidationGroup="register">First Name</asp:Label>
                    <div class="col-md-4 ">
                        <asp:TextBox ID="txtfirstname" runat="server"  placeholder="" class="form-control input-sm" type="text" ValidationGroup="register"></asp:TextBox>
                          </div>
                        <div class="col-md-2 ">
                         <asp:RequiredFieldValidator runat="server" ControlToValidate="txtfirstname" CssClass="text-danger" ErrorMessage="Please enter first name" ValidationGroup="register" />
                    </div>
                </div>

                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="txtlastname" CssClass="col-md-2 control-label" ValidationGroup="register">Last Name</asp:Label>
                    <div class=" col-md-4 ">
                        <asp:TextBox ID="txtlastname" runat="server" class="form-control input-sm" type="text" ValidationGroup="register"></asp:TextBox>
                         </div>
                        <div class="col-md-2 ">
                         <asp:RequiredFieldValidator runat="server" ControlToValidate="txtlastname" CssClass="text-danger" ErrorMessage="Please enter last name"  ValidationGroup="register"/>
                    </div>
                </div>

                <div class="form-group">
                     <asp:Label runat="server" AssociatedControlID="txtemail" CssClass="col-md-2 control-label" ValidationGroup="register">E-mail</asp:Label>
                    <div class=" col-md-4">
                        <asp:TextBox ID="txtemail" runat="server" class="form-control input-sm"  TextMode="Email" ValidationGroup="register"></asp:TextBox>
                         </div>
                        <div class="col-md-2 ">
                         <asp:RequiredFieldValidator runat="server" ControlToValidate="txtemail" CssClass="text-danger" ErrorMessage="Please enter E-mail id" ValidationGroup="register" />
                    </div>
                </div>


                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="txtpassword" CssClass="col-md-2 control-label" ValidationGroup="register">Password</asp:Label>
                    <div class="col-md-4 ">
                        <asp:TextBox ID="txtpassword" runat="server" placeholder="" class="form-control input-sm"  TextMode="Password" ValidationGroup="register"></asp:TextBox>
                         </div>
                        <div class="col-md-2 ">
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtpassword" CssClass="text-danger" ErrorMessage="Please enter passowrd" ValidationGroup="register" />
                    </div>
                </div>



                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="txtContactno" CssClass="col-md-2 control-label" ValidationGroup="register">Phone</asp:Label>
                    <div class="col-md-4 ">
                        <asp:TextBox ID="txtContactno" runat="server" placeholder="" class="form-control input-sm" type="text" TextMode="Phone" ValidationGroup="register"></asp:TextBox>
                         </div>
                        <div class="col-md-2 ">
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtContactno" CssClass="text-danger" ErrorMessage="Please enter your phone no" ValidationGroup="register"/>
                    </div>
                </div>

                <div class="form-group">
                    <asp:Label runat="server" AssociatedControlID="txtDesignation" CssClass="col-md-2 control-label" ValidationGroup="register">Designation</asp:Label>
                    <div class="col-md-4 ">
                        <asp:TextBox ID="txtDesignation" runat="server" placeholder="" class="form-control input-sm" type="text" ValidationGroup="register"></asp:TextBox>
                         </div>
                        <div class="col-md-2 ">
                        <asp:RequiredFieldValidator runat="server" ControlToValidate="txtDesignation" CssClass="text-danger" ValidationGroup="register" ErrorMessage="Please enter your designation" />

                    </div>
                </div>


<%--                <div class="form-group">
                     <asp:Label runat="server" AssociatedControlID="ddlSection" CssClass="col-md-2 control-label" ValidationGroup="register">Section</asp:Label>
                    <div class="col-md-6 ">
                        <asp:DropDownList ID="ddlSection" runat="server" class="form-control input-sm" ValidationGroup="register">
                            <asp:ListItem>--Select--</asp:ListItem>
                            <asp:ListItem>Land Acquisition</asp:ListItem>
                            <asp:ListItem>Town Planning</asp:ListItem>
                            <asp:ListItem>Engineering Section</asp:ListItem>
                            <asp:ListItem>Site Allotment</asp:ListItem>
                            <asp:ListItem>Legal section</asp:ListItem>
                            <asp:ListItem>Finance Section</asp:ListItem>
                            <asp:ListItem>Citizen module</asp:ListItem>
                        </asp:DropDownList>
                         </div>
                        <div class="col-md-4 ">
                         <asp:RequiredFieldValidator runat="server" InitialValue="--Select--" ControlToValidate="ddlSection" CssClass="text-danger"  ErrorMessage="Please select Section" ValidationGroup="register" />

                    </div>
                </div>


                <div class="form-group">
                     <asp:Label runat="server" AssociatedControlID="ddlZone" CssClass="col-md-2 control-label" ValidationGroup="register">Zone</asp:Label>
                    <div class=" col-md-6 ">
                        <asp:DropDownList ID="ddlZone" runat="server" class="form-control input-sm" ValidationGroup="register">
                            <asp:ListItem>--Select--</asp:ListItem>
                            <asp:ListItem>Zone1</asp:ListItem>
                            <asp:ListItem>Zone2</asp:ListItem>
                            <asp:ListItem>Zone3</asp:ListItem>
                            <asp:ListItem>Zone4</asp:ListItem>
                            <asp:ListItem>Zone5</asp:ListItem>
                            <asp:ListItem>Zone6</asp:ListItem>
                            <asp:ListItem>Zone7</asp:ListItem>
                            <asp:ListItem>Zone8</asp:ListItem>
                        </asp:DropDownList>
                         </div>
                        <div class="col-md-4 ">
                          <asp:RequiredFieldValidator runat="server" InitialValue="--Select--" ControlToValidate="ddlZone" CssClass="text-danger" ErrorMessage="Please select Zone" ValidationGroup="register" />

                    </div>
                </div>--%>


                <div class="form-group">
                    <div class="col-md-2">
                    </div>
                    <div class="controls">
                        <div class="col-md-4">
                            <asp:Button ID="btnCreateUser" runat="server" Text="Create User" class="btn btn-primary" style="width: 100px;" OnClick="btnCreateUser_Click" ValidationGroup="register"/>
                        
                        </div>
                    </div>
                </div>
            </div>

            </section>

            <div class="form-group">
                <div class="col-md-1">
                </div>
                <div class="col-md-4">
                    <p><a href="Login.aspx" style="color:blue"><b>Login to your account?</b> </a></p>


                </div>
            </div>
        </div>



    </div>

</asp:Content>
