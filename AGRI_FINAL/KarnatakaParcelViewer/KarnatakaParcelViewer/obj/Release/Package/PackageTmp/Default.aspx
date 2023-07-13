<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="KarnatakaParcelViewer.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>AGRICULTURE GIS PORTAL</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--The viewport meta tag is used to improve the presentation and behavior of the samples
      on iOS devices-->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
    <!--Dojo  Themes-->
    <link rel="stylesheet" href="http://js.arcgis.com/3.13/dijit/themes/claro/claro.css" />
    <!--Esri css file-->
    <link rel="stylesheet" href="http://js.arcgis.com/3.13/esri/css/esri.css" />

    <link href="js/agsjs/css/agsjs.css" rel="stylesheet" />
    <!--Jquery UI Css Files-->
    <!--<link href="js/jquery-ui-1.11.4.custom/jquery-ui.css" rel="stylesheet" />
    <link href="js/jquery-ui-1.11.4.custom/jquery-ui.structure.css" rel="stylesheet" />
    <link href="js/jquery-ui-1.11.4.custom/jquery-ui.theme.css" rel="stylesheet" />-->
    <%--<link href="js/jquery-ui-1.11.4.custom/jquery-ui.css" rel="stylesheet" />
    <link href="js/jquery-ui-1.11.4.custom/jquery-ui.structure.css" rel="stylesheet" />
    <link href="js/jquery-ui-1.11.4.custom/jquery-ui.theme.css" rel="stylesheet" />--%>
    <link href="js/jquery-ui-start/jquery-ui.css" rel="stylesheet" />
    <link href="js/jquery-ui-start/jquery-ui.structure.css" rel="stylesheet" />
    <link href="js/jquery-ui-start/jquery-ui.theme.css" rel="stylesheet" />
    <link href="jquery/js/jqwidgets/styles/jqx.base.css" rel="stylesheet" />
    <link href="jquery/js/jqwidgets/styles/jqx.black.css" rel="stylesheet" />
    <link href="jquery/js/jqwidgets/styles/jqx.energyblue.css" rel="stylesheet" />
    <link href="jquery/js/jqwidgets/styles/jqx.darkblue.css" rel="stylesheet" />
    <script src="jquery/js/jqwidgets/jqxcore.js"></script>
    <script src="jquery/js/jqwidgets/jqxchart.core.js"></script>
    <script src="jquery/js/jqwidgets/jqxdraw.js"></script>
    <script src="jquery/js/jqwidgets/jqxgrid.js"></script>
    <script src="jquery/js/jqwidgets/jqxgrid.aggregates.js"></script>
    <!--Jqury core & UI ( Darkness)-->
    <script src="js/jquery/jquery.js"></script>
    <script src="js/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
    <script>"https://cdnjs.cloudflare.com/ajax/libs/json2/20150503/json2.js" </script>
    <!--Jquery layout-->
    <script src="js/jquery.layout-latest.js"></script>
    <script src="jquery/js/jqwidgets/jqx-all.js"></script>

    <script>
        var dojoConfig = {
            paths: { agsjs: location.pathname.replace(/\/[^/]+$/, "") + '2.10/agsjs' }
        };
    </script>
    <!--Esri JS API-->
    <script src="http://js.arcgis.com/3.13/"></script>
    <script src="2.10/src/agsjs/dijit/TOC.js"></script>


    <link href="css/main.css" rel="stylesheet" />
    <script src="js/AppConfig.js"></script>
    <script src="js/Layout.js"></script>
    <script src="js/app.js"></script>
    <script src="js/app/app1.js"></script>
    <script>
        $(function () {
            $("#dFromDate").datepicker({ minDate: new Date(2015, 12 - 1, 01), maxDate: "+0M +0D", dateFormat: 'dd-mm-yy' });
            $("#dToDate").datepicker({ minDate: new Date(2015, 12 - 1, 01), maxDate: "+0M +0D", dateFormat: 'dd-mm-yy' });
            //$('#myVariable').datepicker({ dateFormat: 'dd/mm/yy' });
            //minDate: new Date(1999, 10 - 1, 25),
        });
    </script>

    <script>
        require(["dojo/parser", "dijit/form/DateTextBox"]);
    </script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/dojo/1.10.4/dojo/dojo.js"></script>
    <script type="text/javascript">
        dojo.require('dijit/form/ComboBox');
    </script>

</head>
<body class="claro">
    <form id="form1" runat="server">
        <!--Map Control-->
        <div class="ui-layout-center" id="divMap" style="z-index: 1;">
            <div id="latlong" style="position: absolute; right: 50px; bottom: 40px; color: black; z-index: 999;">
            </div>
        </div>
        <%--<div class="ui-layout-north" style="background-image:url('images/33.jpg')">--%>
        <div class="ui-layout-north" style="background-color:ButtonHighlight" >
           

            <div class="headerIcon">
                <img src="images/agriculture.jpg" style="width: 60px; height: 60px; z-index: 99999;" />
            </div>

            <div class="header" style="vertical-align: middle;">
                <label id="lblAppName" style="color: white">
                    <b>AGRICULTURE GIS PORTAL </b>
                </label>
            </div>
            <div class="ui-layout-content ui-widget-content">
                <table id="MainMenu" style="height: 100%;">
                    <tr>
                        <td>
                            <img src="images/Icons/imgBaseMap.png" id="btnBasemap" class="buttonclass" title="Switch Basemap" />
                        </td>
                        <td>
                            <img src="images/Icons/i_search.png" id="btnSearchtools" title="Search Tools" class="buttonclass" />
                        </td>
                        <%--                    <td>
                        <img src="images/Icons/i_draw.png" id="btnsearchbygraphicstools" title="Search Tools" class="buttonclass" />
                    </td>--%>
                        <td>
                            <img src="images/Icons/i_nav.png" class="buttonclass" id="btnNavigation" title="Navigation Tools" />
                        </td>
                        <!--<td>
                        <img src="images/Icons/i_table.png" class="buttonclass" id="btnAttributeInfo" title="Attribute Info" />
                    </td>
                    <td>
                        <img src="images/Icons/i_info.png" class="buttonclass" id="btnIdentify" title="Identify" />
                    </td>-->
                        <td>
                            <img src="images/Icons/Legend16.png" class="buttonclass" id="btnLegend" title="Legend" />
                        </td>
                        <td>
                            <img src="images/Icons/i_measure.png" class="buttonclass" id="btnMeasure" title="Measurement Tools" />
                        </td>

                        <td>
                            <img src="images/graphibc.gif" class="buttonclass" id="ClearGraphics" title="Clear Graphics" />
                        </td>
                        <%--<td>
                        <a href="login.aspx"> <input id="Button1" type="button" value="logout" /></a> 
                    </td>--%>
                        <td>
                            <a href="login.aspx">
                                <img src="Extras-LogOff-icon.png" class="buttonclass" id="Logout" title="Logout" /></a>
                        </td>
                    </tr>
                </table>
            </div>

        </div>

        <!-- Base map Dialog    -->
        <div id="BasemapsDialog" title="Switch Basemaps" style="font-size: 12px;">
            <div id="basemapGallery"></div>
        </div>

        <!-- Base map Dialog    -->
        <div id="LegendDialog" title="Table of Contents" style="font-size: 12px;">
            <div id="tocDiv"></div>
        </div>
        <div id="MeasureDialog" title="Measurement" style="font-size: 12px;">
            <div id="measurementDiv"></div>
        </div>
        <div id="SearchDialog" title="Search Report" class="ui-widget-header" style="display: none;">
            <div id="SearchDialogTabs" style="font-size: 12px">
                <ul>
                    <li><a href="#SearchbyIndustrialArea">Report by Area</a></li>
                    <li><a href="#divSearchbyAcres">Report by Date</a></li>
                    <%--<li><a href="#SearchbyIndustrialAreabyStatus">by Status</a></li>--%>
                </ul>
                <div id="SearchbyIndustrialArea" style="font-size: 12px">
                    <table>
                        <tr>
                            <td>State </td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlState" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>District </td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlDistrict" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Taluk</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlTaluk" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Hobli</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlHobli" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Village</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlVillage" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="divSearchbyAcres">
                    <table>

                        <tr>
                            <td>State</td>
                            <td>:</td>

                            <td>
                                <asp:DropDownList ID="ddlStated" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>District</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlDistrictd" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Taluk</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlTalukd" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Hobli</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlHoblid" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>
                        <tr>
                            <td>Village</td>
                            <td>:</td>
                            <td>
                                <asp:DropDownList ID="ddlVillaged" runat="server" CssClass="dropdownlist"></asp:DropDownList>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="3">
                                <table>
                                    <tr>
                                        <td>From:</td>
                                        


                                        <td>
                                            <input id="dFromDate" type="text" style="width:80px"/></td>


                                        <td>To:</td>
                                       
                                        <td>
                                            <input id="dToDate" type="text" style="width:80px" /></td>

                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>

        <!--  Navigation Tools-->
        <div id="NavigationTools" title="Navigation Tools" style="font-size: 12px;">
            <table style="width: 100%; height: 100%">
                <tr>
                    <td>
                        <img src="images/Icons/i_zoomin.png" alt="Zoom In" id="ZoomInTool" title="ZoomIn"
                            class="buttonclass" />
                    </td>
                    <td>
                        <img src="images/Icons/i_zoomout.png" alt="Zoom Out" id="ZoomOutTool" title="ZoomOut"
                            class="buttonclass" />
                    </td>
                    <td>
                        <img src="images/Icons/i_pan.png" alt="Pan" id="panTool" title="Pan" class="buttonclass" />
                    </td>
                    <td>
                        <img src="images/Icons/i_zoomfull.png" alt="Full Extent" id="zoomfullext" title="Zoom to Full Extent"
                            class="buttonclass" />
                    </td>
                    <td>
                        <img src="images/Icons/i_zoomprevious.png" id="zoomtoPrevExtent" title="Zoom to Previous Extent"
                            alt="zoom To Previous Extent" class="buttonclass" />
                    </td>
                    <td>
                        <img src="images/Icons/i_zoomnext.png" id="zoomtoNextExtent" title="Zoom to Next Extent"
                            alt="zoom To Next Extent" class="buttonclass" />
                    </td>
                </tr>
            </table>
        </div>
        <%--<div class="buttonclass" id="HomeButton" title="Home" />--%>
        <%-- <div id="PlotResults" title="Samples Collected Report" style="font-size: 12px; z-index: 999;"></div>--%>
        <%--<div id="JqGrid" title="Samples Collected" style="z-index: 999;"></div>--%>
      <%--  <div id="SampleGrid" title="Samples Collected Report" style="font-size: 12px; z-index: 999;"></div>--%>
        <div class="ui-layout-east" style="background-color:white">
            <div id='jqxpie' style="width:600px; height:450px; position: absolute;top:0px; "></div>
          <div id='jqxChart' style="width:600px; height:400px; position: absolute;bottom:60px; "></div>
                       
        </div>
        <div class="ui-layout-south" style="background-color:white">
          
             <div id="JqGrid" title="Samples Collected" style="width:800px; top:30px;height:280px; position: absolute; left: 10px; z-index:999;"></div>
        </div>
          

       
        <script src="js/app/main.js"></script>
    </form>
</body>
</html>

