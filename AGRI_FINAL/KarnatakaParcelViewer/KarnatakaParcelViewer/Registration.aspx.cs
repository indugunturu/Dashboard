using AgricultureBAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KarnatakaParcelViewer
{

        public partial class Registration : System.Web.UI.Page
    {
        mudaUserdetailsBAL mudaUserdetailsBAL = new mudaUserdetailsBAL();
        public int userinsertstatus = 0;

        protected void Page_Load(object sender, EventArgs e)
        {


        }

        protected void btnCreateUser_Click(object sender, EventArgs e)
        {

            DataTable dt = mudaUserdetailsBAL.InsertUserDetails(txtfirstname.Text, txtlastname.Text, txtemail.Text, txtpassword.Text, txtContactno.Text, txtDesignation.Text);

            if (dt != null && dt.Rows.Count > 0)
            {

                SendConfirmationAfterRegister(txtemail.Text, txtfirstname.Text);

                string message = "Registered Successfully,Account will be activated soon.";

                System.Text.StringBuilder sb = new System.Text.StringBuilder();

                sb.Append("<script type = 'text/javascript'>");

                sb.Append("window.onload=function(){");

                sb.Append("alert('");

                sb.Append(message);

                sb.Append("')};");

                sb.Append("</script>");

                ClientScript.RegisterClientScriptBlock(this.GetType(), "alert", sb.ToString());



                txtfirstname.Text = "";
                txtlastname.Text = "";
                txtpassword.Text = "";
                txtemail.Text = "";
                txtContactno.Text = "";
                txtDesignation.Text = "";
                //ddlSection.SelectedValue = "Select Section";
                //ddlZone.SelectedValue = "Select Zone";

            }
            else
            {
                Response.Write("oop's something went wrong");
            }
        }




        public void SendConfirmationAfterRegister(String EmailID, String UserName)
        {
            MailMessage mailMsg = new MailMessage();

            String BodyMsg = UserName + ", \r\n\nWe have recieved your request to become a user of our site.  Upon review, we will send you verification for site access.\r\n\n" +
                "Thank you, \r\n\nMuda Admin";
            try
            {
                var client = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential(ConfigurationManager.AppSettings["AdminEmail"].ToString(), ConfigurationManager.AppSettings["Pwd"].ToString()),
                    EnableSsl = true
                };

                mailMsg.IsBodyHtml = true;
                client.Send(ConfigurationManager.AppSettings["AdminEmail"].ToString(), EmailID, "Received Your Request", BodyMsg);

                client.Send(ConfigurationManager.AppSettings["AdminEmail"].ToString(), "shilpa.r1585@gmail.com", "User Needs Access", EmailID + " looking for access the Muda Network Site.");
            }
            catch (Exception ex) { throw new Exception(ex.Message); }
        }

    }
}