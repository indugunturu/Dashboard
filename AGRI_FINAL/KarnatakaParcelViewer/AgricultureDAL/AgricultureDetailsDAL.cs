using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Npgsql;

namespace AgricultureDAL
{
    public class AgricultureDetailsDAL
    {
        public DataTable Getstate()
        {
            return Helper.ExecuteSelectCommand("select distinct statename from village;", CommandType.Text);
        }

        public DataTable Getalldistricts()
        {
            return Helper.ExecuteSelectCommand("select distinct districtname from village order by districtname;", CommandType.Text);
        }

        public DataTable Getalltaluksbydistrict(String districtname)
        {
            return Helper.ExecuteSelectCommand("select * from fngettalukbydistrict('" + districtname + "');", CommandType.Text);
        }

        public DataTable GetHobliDetailsbyTaluk(String districtname, String talukname)
        {

            return Helper.ExecuteSelectCommand("select * from fngethoblibytaluk1('" + districtname + "','" + talukname + "');", CommandType.Text);
        }
        public DataTable GetVillagedetailsbyHobli(String districtname, String talukname, String hobliname)
        {

            return Helper.ExecuteSelectCommand("select * from fngetvillagebyhobli1('" + districtname + "','" + talukname + "','" + hobliname + "');", CommandType.Text);
        }

        public DataTable GetStateReport(String statename)
        {

            return Helper.ExecuteSelectCommand("select * from agri_statereport('" + statename + "');", CommandType.Text);
        }

        public DataTable GetStateReportbydate(String statename, String from_date, String to_date)
        {

            return Helper.ExecuteSelectCommand("select * from agri_statereportbydate('" + statename + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetDistrictReport(String districtname)
        {

            return Helper.ExecuteSelectCommand("select * from agri_districtreport('" + districtname + "');", CommandType.Text);
        }
        public DataTable GetTalukReport(String talukname)
        {

            return Helper.ExecuteSelectCommand("select * from agri_talukreport('" + talukname + "');", CommandType.Text);
        }
        public DataTable GetHobliReport(String talukname, String hobliname)
        {

            return Helper.ExecuteSelectCommand("select * from agri_hoblireport('" + talukname + "','" + hobliname + "');", CommandType.Text);

        }
        public DataTable GetVillageReport(String talukname, String hobliname, String villagename)
        {

            return Helper.ExecuteSelectCommand("select * from agri_villagereport('" + talukname + "','" + hobliname + "','" + villagename + "');", CommandType.Text);

        }

        public DataTable GetDistrictReportbydate(String districtname, String from_date, String to_date)
        {

            return Helper.ExecuteSelectCommand("select * from agri_districtreportbydate('" + districtname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetTalukReportbydate(String talukname, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from agri_talukreportbydate('" + talukname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }
        public DataTable GetHobliReportbydate(String talukname, String hobliname, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from agri_hoblireportbydate('" + talukname + "','" + hobliname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }
        public DataTable GetVillageReportbydate(String talukname, String hobliname, String villagename, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from agri_villagereportbydate('" + talukname + "','" + hobliname + "','" + villagename + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetDistrictpoints(String districtname)
        {
            return Helper.ExecuteSelectCommand("select * from fngetdistrictpointsfinalobjectid('" + districtname + "');", CommandType.Text);
        }

        public DataTable GetTalukpoints(String talukname)
        {
            return Helper.ExecuteSelectCommand("select * from fngettalukpointsfinalobjectid('" + talukname + "');", CommandType.Text);
        }
        public DataTable GetHoblipoints(String talukname, String hobliname)
        {
            return Helper.ExecuteSelectCommand("select * from fngethoblipointsfinalobjectid('" + talukname + "','" + hobliname + "');", CommandType.Text);
        }
        public DataTable GetVillagepoints(String talukname, String hobliname, String villagename)
        {
            return Helper.ExecuteSelectCommand("select * from fngetvillagepointsfinalobjectid('" + talukname + "','" + hobliname + "','" + villagename + "');", CommandType.Text);
        }

        public DataTable GetDistrictReportbydatePoints(String districtname, String from_date, String to_date)
        {

            return Helper.ExecuteSelectCommand("select * from fngetdistrictpointsbydatefinalobjectid('" + districtname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetTalukReportbydatePoints(String talukname, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from fngettalukpointsbydatefinalobjectid('" + talukname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetHobliReportbydatePoints(String talukname, String hobliname, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from fngethoblipointsbydatefinalobjectid('" + talukname + "','" + hobliname + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }

        public DataTable GetVillageReportbydatePoints(String talukname, String hobliname, String villagename, String from_date, String to_date)
        {
            return Helper.ExecuteSelectCommand("select * from fngetvillagepointsbydatefinalobjectid('" + talukname + "','" + hobliname + "','" + villagename + "','" + from_date + "','" + to_date + "');", CommandType.Text);
        }
    }
}
