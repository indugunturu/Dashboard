using AgricultureBAL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;

namespace KarnatakaParcelViewer
{
    public class Global : System.Web.HttpApplication
    {
        SetconnectionString setconnectionstring = new SetconnectionString();
        protected void Application_Start(object sender, EventArgs e)
        {
            setconnectionstring.setconnctionstring(ConfigurationManager.AppSettings["ConString"].ToString());
            //setconnectionstringBL.SetconnectionString(ConfigurationManager.AppSettings["ConString"].ToString());
           // setconnectionstring.setconnctionstring(ConfigurationManager.AppSettings["ConString1"].ToString());
        }
        
    }
}