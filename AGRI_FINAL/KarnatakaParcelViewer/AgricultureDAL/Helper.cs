using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Npgsql;


namespace AgricultureDAL
{
    public class Helper
    {
        private static string _cnstr;
        /// <summary>
        /// Set Connection String
        /// </summary>
        /// <param name="cnstr"></param>
        public static void setconnectionstring(String cnstr)
        {
            _cnstr = cnstr;
        }

        internal static DataTable ExecuteSelectCommand(String CommandName, CommandType cmdType)
        {
            DataTable table = null;
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_cnstr);
                NpgsqlCommand cmd = con.CreateCommand();
                cmd.CommandType = cmdType;
                cmd.CommandTimeout = 240;
                cmd.CommandText = CommandName;

                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }

                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd))
                {
                    table = new DataTable();
                    da.Fill(table);

                }
                con.Close();
            }
            catch { throw; }
            return table;
        }



        internal static DataTable ExecuteParamerizedSelectCommand(String CommandName, CommandType cmdType, NpgsqlParameter[] param)
        {
            DataTable table = new DataTable();
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_cnstr);
                NpgsqlCommand cmd = con.CreateCommand();
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.CommandTimeout = 120;
                cmd.Parameters.AddRange(param);

                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }

                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd))
                {
                    da.Fill(table);

                }
                con.Close();
            }
            catch
            {
                throw;
            }
            return table;
        }

        internal static DataSet dsExecuteParamerizedSelectCommand(String CommandName, CommandType cmdType, NpgsqlParameter[] param)
        {
            DataTable table = new DataTable();
            DataSet ds = new DataSet();
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_cnstr);
                NpgsqlCommand cmd = con.CreateCommand();
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.CommandTimeout = 120;
                cmd.Parameters.AddRange(param);

                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }

                using (NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd))
                {
                    da.Fill(ds);
                }
                con.Close();
            }
            catch
            {
                throw;
            }
            return ds;
        }

        internal static Int32 ExecuteNonQuery(String CommandName, CommandType cmdType, NpgsqlParameter[] param)
        {
            int result = 0;
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_cnstr);
                NpgsqlCommand cmd = con.CreateCommand();
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.CommandTimeout = 600;
                cmd.Parameters.AddRange(param);

                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }

                result = cmd.ExecuteNonQuery();
                con.Close();
            }
            catch { throw; }

            return result;
        }

        internal static Int32 ExecuteNonQuerywithReturnStatement(String CommandName, CommandType cmdType, NpgsqlParameter[] param)
        {
            int result = 0;
            try
            {
                NpgsqlConnection con = new NpgsqlConnection(_cnstr);
                NpgsqlCommand cmd = con.CreateCommand();
                cmd.CommandType = cmdType;
                cmd.CommandText = CommandName;
                cmd.CommandTimeout = 120;
                cmd.Parameters.AddRange(param);

                var returnParam = new NpgsqlParameter
                {
                    ParameterName = "@return",
                    Direction = ParameterDirection.ReturnValue
                };
                cmd.Parameters.Add(returnParam);

                if (con.State != ConnectionState.Open)
                {
                    con.Open();
                }

                cmd.ExecuteNonQuery();
                result = (int)returnParam.Value;
                con.Close();
            }
            catch { throw; }

            return result;
        }


    }
}
