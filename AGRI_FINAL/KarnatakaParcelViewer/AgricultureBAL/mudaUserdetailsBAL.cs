using AgricultureDAL;
using CL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgricultureBAL
{
   public class mudaUserdetailsBAL
    {
        mudaUserdetailsDAL mudaUserdetails = new mudaUserdetailsDAL();


        public DataTable InsertUserDetails(string firstname, string lastname, string email, string paword, string contactnumber, string designation)
        {
            return mudaUserdetails.InsertUserDetails(firstname, lastname, email, paword, contactnumber, designation);
        }





        public Userdetails GetUserDetailsByEmailandPassword(string email, string paword)
        {

            return mudaUserdetails.GetUserDetailsByEmailandPassword(email, paword);
        }



        public DataTable GetUserDetails()
        {

            return mudaUserdetails.GetUserDetails();
        }


        public DataTable UpdateUserdetails(int userid, Boolean isauthorized, Int32 islocked, Boolean isadmin)
        {
            return mudaUserdetails.UpdateUserdetails(userid, isauthorized, islocked, isadmin);

        }




    }
}