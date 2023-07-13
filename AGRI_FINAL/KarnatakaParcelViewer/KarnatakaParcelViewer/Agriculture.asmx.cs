using AgricultureBAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;

namespace KarnatakaParcelViewer
{
    /// <summary>
    /// Summary description for Agriculture
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Agriculture : System.Web.Services.WebService
    {


        AgricultureDetailsBAL AgricultureDetailsBAL = new AgricultureDetailsBAL();

        [WebMethod]
        //[ScriptMethod(UseHttpGet = true)]
        public String Getstate()
        {
            DataTable dt = AgricultureDetailsBAL.Getstate();
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        //[ScriptMethod(UseHttpGet = true)]
        public String Getalldistricts()
        {
            DataTable dt = AgricultureDetailsBAL.Getalldistricts();
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String Getalltaluksbydistrict(String districtname)
        {
            DataTable dt = AgricultureDetailsBAL.Getalltaluksbydistrict(districtname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetHobliDetailsbyTaluk(String districtname, String talukname)
        {
            DataTable dt = AgricultureDetailsBAL.GetHobliDetailsbyTaluk(districtname, talukname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetVillagedetailsbyHobli(String districtname, String talukname, String hobliname)
        {
            DataTable dt = AgricultureDetailsBAL.GetVillagedetailsbyHobli(districtname, talukname, hobliname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetDistrictReport(String districtname)
        {
            DataTable dt = AgricultureDetailsBAL.GetDistrictReport(districtname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetStateReport(String statename)
        {
            DataTable dt = AgricultureDetailsBAL.GetStateReport(statename);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetStateReportbydate(String statename, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetStateReportbydate(statename, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetTalukReport(String talukname)
        {
            DataTable dt = AgricultureDetailsBAL.GetTalukReport(talukname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetHobliReport(String talukname, String hobliname)
        {
            DataTable dt = AgricultureDetailsBAL.GetHobliReport(talukname, hobliname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetVillageReport(String talukname, String hobliname, String villagename)
        {
            DataTable dt = AgricultureDetailsBAL.GetVillageReport(talukname, hobliname, villagename);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetDistrictReportbydate(String districtname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetDistrictReportbydate(districtname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetTalukReportbydate(String talukname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetTalukReportbydate(talukname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetHobliReportbydate(String talukname, String hobliname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetHobliReportbydate(talukname, hobliname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetVillageReportbydate(String talukname, String hobliname, String villagename, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetVillageReportbydate(talukname, hobliname, villagename, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetDistrictpoints(string districtname)
        {
            DataTable dt = AgricultureDetailsBAL.GetDistrictpoints(districtname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetTalukpoints(string talukname)
        {
            DataTable dt = AgricultureDetailsBAL.GetTalukpoints(talukname);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetHoblipoints(string talukname, string hobliname)
        {
            DataTable dt = AgricultureDetailsBAL.GetHoblipoints(talukname, hobliname);
            return JsonConvert.SerializeObject(dt);
        }
        [WebMethod]
        public String GetVillagepoints(string talukname, string hobliname, string villagename)
        {
            DataTable dt = AgricultureDetailsBAL.GetVillagepoints(talukname, hobliname, villagename);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetDistrictReportbydatePoints(String districtname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetDistrictReportbydatePoints(districtname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetTalukReportbydatePoints(String talukname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetTalukReportbydatePoints(talukname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetHobliReportbydatePoints(String talukname, String hobliname, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetHobliReportbydatePoints(talukname, hobliname, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public String GetVillageReportbydatePoints(String talukname, String hobliname, String villagename, String from_date, String to_date)
        {
            DataTable dt = AgricultureDetailsBAL.GetVillageReportbydatePoints(talukname, hobliname, villagename, from_date, to_date);
            return JsonConvert.SerializeObject(dt);
        }

    }
}
