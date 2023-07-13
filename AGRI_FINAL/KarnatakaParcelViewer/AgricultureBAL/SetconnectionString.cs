using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AgricultureDAL;

namespace AgricultureBAL
{
    public class SetconnectionString
    {
        public void setconnctionstring(String ConString)
        {
            Helper.setconnectionstring(ConString);
        }
    }
}
