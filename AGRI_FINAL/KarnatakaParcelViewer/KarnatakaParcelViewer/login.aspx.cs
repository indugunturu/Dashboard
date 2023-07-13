using AgricultureBAL;
using CL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KarnatakaParcelViewer
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        mudaUserdetailsBAL mudaUserdetailsBAL = new mudaUserdetailsBAL();
        public Int32 UserStatus = 0;


        protected void btnlogin_Click(object sender, EventArgs e)
        {
            String email = username.Text.ToString();
            String userpassword = password.Text.ToString();

            HttpContext.Current.Session["email"] = email;


            Userdetails userdetails = mudaUserdetailsBAL.GetUserDetailsByEmailandPassword(email, userpassword);

            if (userdetails != null)
            {

                Response.Write(userdetails.isauthorized);

                if (userdetails.isauthorized == true && userdetails.isadmin == true)
                {
                    Response.Redirect("Default.aspx");
                }
                if (userdetails.isauthorized == false)
                {
                    UserStatus = 1;
                }

            }
            else
            {
                UserStatus = 2;

            }



        }
    }
}