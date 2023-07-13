<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="UserDetails.aspx.cs" Inherits="KarnatakaParcelViewer.UserDetails" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
      <script src="jslogin/jqwidgets/jqx-all.js"></script>
    <link href="jslogin/jqwidgets/styles/jqx.base.css" rel="stylesheet" />
    <script src="jslogin/app/admin.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    
     <div class="row">
        <div class="col-lg-12">

            <div class="panel panel-primary">
                <div class="panel-heading">View User Details</div>
                <div class="panel-body">
                    <div id="GridUserDetails">
                    </div>
                </div>
            </div>


             <div id="formUserDetails" class="form-horizontal" style="display:none;"title="Edit UserDetails">

                 <div class="form-group">
                        <label class="col-md-4 control-label">UserID :</label>
                        <div class="col-md-8">
                            <input id="hdnuserid" type="hidden"  />
                            <input id="txtUserid" type="text" class="form-control" name="userid"/>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-md-4 control-label">First Name :</label>
                        <div class="col-md-8">
                            <input id="txtFirstName" type="text" class="form-control" name="firstname" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Email-id :</label>
                        <div class="col-md-8">
                            <input id="txtEmail" type="text" class="form-control" name="email" />
                        </div>
                    </div>

                <%--    <div class="form-group">
                        <label class="col-md-4 control-label">Password :</label>
                        <div class="col-md-8">
                            <input id="txtPassword" type="text" class="form-control" name="password" />
                        </div>
                    </div>--%>

                     <div class="form-group">
                        <label class="col-md-4 control-label">Department :</label>
                        <div class="col-md-8">
                            <input id="txtDepartment" type="text" class="form-control" name="department"/>
                        </div>
                    </div>

                 <div class="form-group">
                        <label class="col-md-4 control-label">isAuthorize :</label>
                        <div class="col-md-8">
                            <input id="txtisAuthorize" type="text" class="form-control" name="isauthorize"/>
                        </div>
                    </div>

                  <div class="form-group">
                        <label class="col-md-4 control-label">isAdmin :</label>
                        <div class="col-md-8">
                            <input id="txtisAdmin" type="text" class="form-control" name="isadmin" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">isActive :</label>
                        <div class="col-md-8">
                            <input id="txtisActive" type="text" class="form-control" name="isactive" />
                        </div>
                    </div>

                   <div class="form-group">
                        <label class="col-md-4 control-label">isLocked :</label>
                        <div class="col-md-8">
                            <input id="txtisLocked" type="text" class="form-control" name="islocked"/>
                        </div>
                    </div>



                 </div>
            </div>
        </div>
</asp:Content>
