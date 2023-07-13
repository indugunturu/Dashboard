using CL;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AgricultureDAL
{
    public class mudaUserdetailsDAL
    {



        //insertmudauser,insertuserdetails
        public DataTable InsertUserDetails(string firstname, string lastname, string email, string paword, string contactnumber, string designation)
        {

            NpgsqlParameter[] parms = new NpgsqlParameter[]
                  {
                        new NpgsqlParameter("@firstname",firstname),
                        new NpgsqlParameter("@lastname",lastname),
                        new NpgsqlParameter("@email",email),
                        new NpgsqlParameter("@paword",Utilities.Encrypt(paword)),
                        new NpgsqlParameter("@contactnumber",contactnumber),
                        new NpgsqlParameter("@designation",designation),
                        //new NpgsqlParameter("@department",department),
                        //new NpgsqlParameter("@mudazone",mudazone)
                     
           
                  };

            DataTable dt = Helper.ExecuteParamerizedSelectCommand("insertmudauser", CommandType.StoredProcedure, parms);
            return dt;

        }

        public Userdetails GetUserDetailsByEmailandPassword(string email, string paword)
        {
            Userdetails userInfobyUsername = null;
            NpgsqlParameter[] parms = new NpgsqlParameter[]
                  {
                      
                        new NpgsqlParameter("@email",email),
                         new NpgsqlParameter("@paword",Utilities.Encrypt(paword))
                };

            using (DataTable table = Helper.ExecuteParamerizedSelectCommand("getuserdetailsbymail", CommandType.StoredProcedure, parms))
            {

                if (table.Rows.Count > 0)
                {
                    userInfobyUsername = new Userdetails();

                    foreach (DataRow row in table.Rows)
                    {
                        userInfobyUsername.userid = Convert.ToInt32(row["userid"].ToString());
                        userInfobyUsername.paword = Utilities.Decrypt(row["paword"].ToString());
                        userInfobyUsername.email = row["email"].ToString();
                        userInfobyUsername.isauthorized = Convert.ToBoolean(row["isauthorized"].ToString());
                        userInfobyUsername.isadmin = Convert.ToBoolean(row["isadmin"].ToString());
                        userInfobyUsername.islocked = Convert.ToInt32(row["islocked"].ToString());
                        userInfobyUsername.isactive = Convert.ToBoolean(row["isactive"].ToString());

                    }
                }

            }

            return userInfobyUsername;
        }


        public DataTable GetUserDetails()
        {
            NpgsqlParameter[] parms = new NpgsqlParameter[]
                  {
                };

            DataTable dt = Helper.ExecuteParamerizedSelectCommand("selectalluserdetails", CommandType.StoredProcedure, parms);
            return dt;
        }

        //updateuserrecord

        public DataTable UpdateUserdetails(int userid, Boolean isauthorized, Int32 islocked, Boolean isadmin)
        {
            NpgsqlParameter[] parms = new NpgsqlParameter[]
            {
                        new NpgsqlParameter("@userid",userid),
                         new NpgsqlParameter("@isauthorized",isauthorized),
                         new NpgsqlParameter("@islocked",islocked),
                        new NpgsqlParameter("@isadmin",isadmin)
            };

            DataTable dt = Helper.ExecuteParamerizedSelectCommand("updateuserrecord", CommandType.StoredProcedure, parms);
            return dt;

        }

    }
}