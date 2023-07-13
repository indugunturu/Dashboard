using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AgricultureDAL;
using System.Data;


namespace AgricultureBAL
{
    public class AgricultureDetailsBAL
    {

        AgricultureDetailsDAL AgricultureDetailsDAL = new AgricultureDetailsDAL();
        public DataTable Getstate()
        {
            return AgricultureDetailsDAL.Getstate();
        }
        public DataTable Getalldistricts()
        {
            return AgricultureDetailsDAL.Getalldistricts();
        }
        public DataTable Getalltaluksbydistrict(String districtname)
        {
            return AgricultureDetailsDAL.Getalltaluksbydistrict(districtname);
        }
        public DataTable GetHobliDetailsbyTaluk(String districtname,String talukname)
        {
            return AgricultureDetailsDAL.GetHobliDetailsbyTaluk(districtname,talukname);
        }
        public DataTable GetVillagedetailsbyHobli(String districtname,String talukname,String hobliname)
        {
            return AgricultureDetailsDAL.GetVillagedetailsbyHobli(districtname, talukname,hobliname);
        }
        public DataTable GetStateReport(String statename)
        {
            return AgricultureDetailsDAL. GetStateReport(statename);
        }
        public DataTable GetStateReportbydate(String statename, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetStateReportbydate(statename, from_date,to_date);
        }
        public DataTable GetDistrictReport(String districtname)
        {
            return AgricultureDetailsDAL.GetDistrictReport(districtname);
        }
        public DataTable GetTalukReport(String talukname)
        {
            return AgricultureDetailsDAL.GetTalukReport(talukname);
        }
        public DataTable GetHobliReport(String talukname,String hobliname)
        {
            return AgricultureDetailsDAL.GetHobliReport(talukname,hobliname);
        }
        public DataTable GetVillageReport(String talukname,String hobliname,String villagename)
        {
            return AgricultureDetailsDAL.GetVillageReport(talukname, hobliname,villagename);
        }
        public DataTable GetDistrictReportbydate(String districtname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetDistrictReportbydate(districtname, from_date, to_date);
        }
        public DataTable GetTalukReportbydate(String talukname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetTalukReportbydate(talukname, from_date, to_date);
        }
        public DataTable GetHobliReportbydate(String talukname,String hobliname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetHobliReportbydate(talukname,hobliname, from_date, to_date);
        }
        public DataTable GetVillageReportbydate(String talukname,String hobliname,String villagename, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetVillageReportbydate(talukname,hobliname,villagename, from_date, to_date);
        }
        public DataTable GetDistrictpoints(string districtname)
        {
            return AgricultureDetailsDAL.GetDistrictpoints(districtname);
        }
        public DataTable GetTalukpoints(string talukname)
        {
            return AgricultureDetailsDAL.GetTalukpoints(talukname);
        }
        public DataTable GetHoblipoints(string talukname, string hobliname)
        {
            return AgricultureDetailsDAL.GetHoblipoints(talukname, hobliname);
        }
        public DataTable GetVillagepoints(string talukname, string hobliname, string villagename)
        {
            return AgricultureDetailsDAL.GetVillagepoints(talukname, hobliname, villagename);
        }

        public DataTable GetDistrictReportbydatePoints(String districtname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetDistrictReportbydatePoints(districtname, from_date, to_date);
        }

        public DataTable GetTalukReportbydatePoints(String talukname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetTalukReportbydatePoints(talukname, from_date, to_date);
        }

        public DataTable GetHobliReportbydatePoints(String talukname, String hobliname, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetHobliReportbydatePoints(talukname, hobliname, from_date, to_date);
        }
        public DataTable GetVillageReportbydatePoints(String talukname, String hobliname, String villagename, String from_date, String to_date)
        {
            return AgricultureDetailsDAL.GetVillageReportbydatePoints(talukname, hobliname, villagename, from_date, to_date);
        }

    }
}
