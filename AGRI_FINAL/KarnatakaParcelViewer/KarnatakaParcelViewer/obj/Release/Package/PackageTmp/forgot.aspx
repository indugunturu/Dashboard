<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="forgot.aspx.cs" Inherits="KarnatakaParcelViewer.forgot" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <div class="container">
        <div class="col-md-12 col-md-offset-0">
            <h3>Forgot Password</h3>
            <div class="panel-body">
                <label class="col-md-10" for="forgot">Enter an email address to get Username and Password.</label>
            </div>
            <div id="formForgotPasswordDetails" class="form-horizontal">
                <div class="form-group">
                    <label class="col-md-2" for="email" style="text-align: right;">E-mail ID :</label>
                    <div class="col-md-4 ">
                        <input id="email" name="email" placeholder="E-mail" class="form-control input-md" type="text" />
                    </div>
                </div>
                <br />

                <div class="form-group">
                    <div class="col-md-2">
                    </div>
                    <div class="controls">
                        <div class="col-md-4">

                            <button id="btnForgotUsername" type="button" class="btn btn-primary btn-color btn-md " style="width: 87px;">
                                <span aria-hidden="true"></span>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <div class="form-group">
        <div class="col-md-1">
        </div>
        <div class="col-md-4">
            <p><a href="Registration.aspx" style="color:blue"><b>if you don't have an account?</b> </a></p>

            <p><a href="Login.aspx" style="color:blue"><b>Login to your account?</b> </a></p>
        </div>
    </div>









</asp:Content>


