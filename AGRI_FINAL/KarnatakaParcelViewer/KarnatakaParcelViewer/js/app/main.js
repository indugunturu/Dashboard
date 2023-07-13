
$(document).ready(function () {

    GetStateReport('Karnataka');
    function GetStateReport(statename) {
        $.ajax({
            type: "POST",
            url: "Agriculture.asmx/GetStateReport",
            data: "{'statename':'" + statename + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            //error: OnError

        });
        function OnSuccess(data, status) {
            var myObject = JSON.parse(data.d);
            var source = {
                datatype: "json",
                datafields: [
                   { name: 'statename' },
                    { name: 'districtname' },

                    { name: 'samplescollected' }
                ],
                localdata: myObject
            };

            // Preparing the data for use
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#JqGrid").jqxGrid(
              {
                  pagesize: 5,
                  source: dataAdapter,
                  width: 650,
                  sortable: true,
                  pageable: true,
                  autoheight: true,
                  columnsresize: true,
                  //filterable: true,
                  //showfilterrow: true,
                  showtoolbar: true,
                  showstatusbar: true,
                  showaggregates: true,


                  rendertoolbar: function (toolbar) {
                      var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                      var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                      container.append(exportButton);
                      toolbar.append(container);
                      exportButton.jqxButton({ width: 150, height: 20 });
                      exportButton.click(function (event) {
                          $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                      });
                  },
                  selectionmode: 'checkbox',

                  columns: [
                               { text: 'StateName', datafield: 'statename', width: 'auto' },
                                { text: 'DistrictName', datafield: 'districtname', width: 'auto' },

                             {
                                 text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                     '<b>TOTAL</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var total = aggregatedValue + parseInt(record['samplescollected']);
                                                    return total;
                                                }
                                 }]
                             }
                  ]

              });
            var themesetting = { theme: 'darkblue' };
            $("#JqGrid").jqxGrid(themesetting);
            var settings = {
                title: "Statistics Of Sample Collected",
                description: "State Report",
                showLegend: true,
                enableAnimations: true,
                padding: { left: 20, top: 5, right: 20, bottom: 5 },
                titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
                source: dataAdapter,
                categoryAxis:
                    {

                        dataField: 'districtname',
                        //textRotationAngle: 45,
                        showGridLines: true,
                        flip: false
                    },
                colorScheme: 'scheme01',
                seriesGroups:
                    [
                        {
                            type: 'column',
                            orientation: 'vertical',
                            columnsGapPercent: 5,
                            valueAxis:
                            {
                                flip: false,
                                displayValueAxis: true,
                                description: 'samples collected'

                            },
                            series: [
                                    { dataField: 'samplescollected', displayText: 'samplescollected' }
                            ]
                        }
                    ]
            };
            // setup the chart
            $('#jqxChart').jqxChart(settings);
            var settings1 = {
                enableAnimations: true,
                showLegend: true,
                showBorderLine: true,
                legendLayout: {
                    left: 320,
                    top: 50,
                    width: 100,
                    height: 400,
                    flow: 'vertical'
                },
                padding: { left: 1, top: 10, right: 250, bottom: 0 },
                source: dataAdapter,
                colorScheme: 'scheme2',
                title: 'Statistics Of Sample Collected',
                description: 'State Report',
                seriesGroups: [{

                    type: 'pie',
                    showLabels: false,
                    useGradient: false,
                    series: [{
                        dataField: 'samplescollected',
                        displayText: 'districtname',
                        labelRadius: 170,
                        initialAngle: 15,
                        radius: 145,
                        centerOffset: 0

                    }]
                }]
            };
            // setup the chart
            $('#jqxpie').jqxChart(settings1);

        }
        // $("#JqGrid").dialog('open');
    }



});
function Getstate() {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/Getstate",
        data: "{}",
        contentType: "application/json; character=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError
    });

    function OnSuccess(data, status) {
        var obj = JSON.parse(data.d);
        $("#ddlState").empty();
        $("#ddlState").append('<option value="--Select State--">--Select State--</option>');
        for (var i = 0; i < obj.length; i++) {
            $("#ddlState").append('<option value="' + obj[i].statename + '">' + obj[i].statename + '</option>');
        }
    }
    function OnError(request, status, error) {
        alert(request.statusText);
    }
}


function Getalldistricts() {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/Getalldistricts",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            var obj = JSON.parse(data.d);
            $("#ddlDistrict").empty();
            $("#ddlDistrict").append('<option value="--Select District--">--Select District--</option>');
            for (var i = 0; i < obj.length ; i++) {
                $("#ddlDistrict").append(' <option value="' + obj[i].districtname + '">' + obj[i].districtname + '</option>');
            }
        },
        //error: function () {
        //    alert("Ajax Error");
        //}
    });
}

//Getalltaluksbydistrict(DistrictName)
$("#ddlDistrict").change(function () {
    var selectedItem = $("#ddlDistrict").val();
    var ddlTaluk = $("#ddlTaluk");
    //var statesProgress = $("#states-loading-progress");
    //alert(selectedItem);
    //statesProgress.show();
    //ddlTaluk.prop('disabled', false);
    //ddlHobli('disabled', true);
    //ddlVillage.prop('disabled', true);
    $("#ddlHobli").empty();
    $("#ddlVillage").empty();
    Getalltaluksbydistrict(selectedItem);


});
$("#ddlTaluk").change(function () {
    var selectedItem = $("#ddlDistrict").val();
    var selectedItem1 = $("#ddlTaluk").val();
    var ddlDistrict = $("#ddlDistrict");
    var ddlTaluk = $("#ddlTaluk");
    //var statesProgress = $("#states-loading-progress");
    //alert(selectedItem);
    //statesProgress.show();
    $("#ddlVillage").empty();
    GetHobliDetailsbyTaluk(selectedItem, selectedItem1);

});

$("#ddlHobli").change(function () {
    var selectedItem = $("#ddlDistrict").val();
    var selectedItem1 = $("#ddlTaluk").val();
    var selectedItem2 = $("#ddlHobli").val();
    var ddlDistrict = $("#ddlDistrict");
    var ddlTaluk = $("#ddlTaluk");
    var ddlTaluk = $("#ddlTaluk");
    var ddlVillage = $("#ddlVillage");
    //var statesProgress = $("#states-loading-progress");
    //alert(selectedItem);
    //statesProgress.show();
    GetVillagedetailsbyHobli(selectedItem, selectedItem1, selectedItem2);

});

function Getalltaluksbydistrict(districtname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/Getalltaluksbydistrict",
        data: "{'districtname':'" + districtname + "'}",
        contentType: "application/json; character=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError

    });

    function OnSuccess(data, status) {
        var obj = JSON.parse(data.d);
        $("#ddlTaluk").empty();
        $("#ddlTaluk").append('<option value="--Select Taluk--">--Select Taluk--</option>');
        for (var i = 0; i < obj.length; i++) {
            $("#ddlTaluk").append('<option value="' + obj[i].talukname + '">' + obj[i].talukname + '</option>');
            //alert(obj[taluknamekan]);
        }
    }
    function OnError(request, status, error) {
        alert(request.statusText);
    }
}
////GetHobliDetailsbyTaluk(TalukName)
function GetHobliDetailsbyTaluk(districtname, talukname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetHobliDetailsbyTaluk",
        //data: "{'districtname':'" + districtname + "','talukname':'" + talukname + "'}",
        data: "{'districtname':'" + districtname + "', "
          + "'talukname':'" + talukname + "'}",
        contentType: "application/json; character=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError

    });

    function OnSuccess(data, status) {
        var obj = JSON.parse(data.d);
        $("#ddlHobli").empty();
        $("#ddlHobli").append('<option value="--Select Hobli--">--Select Hobli--</option>');
        for (var i = 0; i < obj.length; i++) {
            $("#ddlHobli").append('<option value="' + obj[i].hobliname + '">' + obj[i].hobliname + '</option>');
            //alert(obj[taluknamekan]);
        }
    }
    function OnError(request, status, error) {
        alert(request.statusText);
    }
}

////GetVillagedetailsbyHobli(HobliName)
function GetVillagedetailsbyHobli(districtname, talukname, hobliname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetVillagedetailsbyHobli",
        data: "{'districtname':'" + districtname + "', "
            + "'talukname':'" + talukname + "',"
       + "'hobliname':'" + hobliname + "'}",
        contentType: "application/json; character=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError

    });

    function OnSuccess(data, status) {
        var obj = JSON.parse(data.d);
        $("#ddlVillage").empty();
        $("#ddlVillage").append('<option value="--Select Village--">--Select Village--</option>');
        for (var i = 0; i < obj.length; i++) {
            $("#ddlVillage").append('<option value="' + obj[i].villagename + '">' + obj[i].villagename + '</option>');
            //alert(obj[taluknamekan]);
        }
    }
    function OnError(request, status, error) {
        alert(request.statusText);
    }
}


// GetStateReport(TalukName);
function GetStateReport(statename) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetStateReport",
        data: "{'statename':'" + statename + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
               { name: 'statename' },
                { name: 'districtname' },

                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,
             

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                           { text: 'StateName', datafield: 'statename', width: 'auto' },
                            { text: 'DistrictName', datafield: 'districtname', width: 'auto' },

                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = aggregatedValue + parseInt(record['samplescollected']);
                                                return total;
                                            }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "State Report",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {

                    dataField: 'districtname',
                    //textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'samples collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);
        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 320,
                top: 50,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'State Report',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'districtname',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}


// GetDistrictReport(DistrictName);
function GetDistrictReport(districtname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetDistrictReport",
        data: "{'districtname':'" + districtname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'districtname' },
                { name: 'talukname' },
                { name: 'samplescollected' }

            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              // filterable: true,
              // showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',
              //rendertoolbar: function (toolbar) {
              //    var container = $("<div style='overflow: hidden; position:relative;margin:3px;'></div>");

              //    var exportButton = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/excel.png'/><span style='margin-left:4px;position:relative;top:2px'>Export to Excel</span></div>");
              //    exportButton.jqxButton({ width: '130' });
              //    container.append(exportButton);
              //    toolbar.append(container);
              //}
              columns: [
                         { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                         { text: 'TalukName', datafield: 'talukname', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                function (aggregatedValue, currentValue, column, record) {
                                    var total = aggregatedValue + parseInt(record['samplescollected']);
                                    return total;
                                }
                             }]
                         }


              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);

        var settings = {
            title: "Statistics Of Sample Collected",
            description: "District Report",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {

                    dataField: 'talukname',
                    //textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'samples collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);

        var settings1= {
        enableAnimations: true,
        showLegend: true,
        showBorderLine: true,
        legendLayout: {
            left:400,
            top: 150,
            width: 100,
            height: 400,
            flow: 'vertical'
        },
        padding: { left: 1, top: 10, right: 250, bottom: 0 },
        source: dataAdapter,
        colorScheme: 'scheme2',
        title: 'Statistics Of Sample Collected',
        description: 'District Report',
        seriesGroups: [{

            type: 'pie',
            showLabels: false,
            useGradient: false,
            series: [{
                dataField: 'samplescollected',
                displayText: 'talukname',
                labelRadius: 170,
                initialAngle: 15,
                radius: 145,
                centerOffset: 0

            }]
        }]
    };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
     // $("#JqGrid").dialog('open');
}
function showresults(districtname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetDistrictpoints",
        data: "{'districtname':'" + districtname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);




        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://117.247.176.60:6080/arcgis/rest/services/CRD/CRD3/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }
        map.graphics.clear();
    }

}



// GetTalukReport(TalukName);
function GetTalukReport(talukname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetTalukReport",
        data: "{'talukname':'" + talukname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
               { name: 'districtname' },
                { name: 'talukname' },
                { name: 'hobliname' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                           { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                            { text: 'TalukName', datafield: 'talukname', width: 'auto' },
                         { text: 'HobliName', datafield: 'hobliname', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                    function (aggregatedValue, currentValue, column, record) {
                                        var total = aggregatedValue + parseInt(record['samplescollected']);
                                        return total;
                                    }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);

        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Taluk Report",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'hobliname',
                    //  textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);

        var settings1= {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left:400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Taluk Report',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'hobliname',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    
    }
     // $("#JqGrid").dialog('open');
}

function showTalukresults(talukname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetTalukpoints",
        data: "{'talukname':'" + talukname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);




        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }
        map.graphics.clear();
    }

}



//GetHobliReport(TalukName) 

function GetHobliReport(talukname, hobliname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetHobliReport",
        data: "{'talukname':'" + talukname + "', "
    + "'hobliname':'" + hobliname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                 { name: 'districtname' },
                  { name: 'talukname' },
                   { name: 'hobliname' },
                { name: 'villagename' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                   { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                            { text: 'TalukName', datafield: 'talukname', width: 'auto' },
                         { text: 'HobliName', datafield: 'hobliname', width: 'auto' },
                         { text: 'VillageName', datafield: 'villagename', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                    function (aggregatedValue, currentValue, column, record) {
                                        var total = aggregatedValue + parseInt(record['samplescollected']);
                                        return total;
                                    }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);

        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Hobli Report",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'villagename',
                    //  textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);

        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 320,
                top: 50,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Hobli Report',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'villagename',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 135,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);


    }
    // $("#JqGrid").dialog('open');
}


function showHobliresults(talukname, hobliname) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetHoblipoints",
        data: "{'talukname':'" + talukname + "', "
    + "'hobliname':'" + hobliname + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);




        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();

    }

}

//GetVillageReport(VillageName)

function GetVillageReport(talukname, hobliname, villagename) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetVillageReport",
        data: "{'talukname':'" + talukname + "', "
            + "'hobliname':'" + hobliname + "', "
       + "'villagename':'" + villagename + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'districtname' },
                  { name: 'talukname' },
                   { name: 'hobliname' },
                { name: 'villagename' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                   { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                            { text: 'TalukName', datafield: 'talukname', width: 'auto' },
                         { text: 'HobliName', datafield: 'hobliname', width: 'auto' },
                         { text: 'VillageName', datafield: 'villagename', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                    function (aggregatedValue, currentValue, column, record) {
                                        var total = aggregatedValue + parseInt(record['samplescollected']);
                                        return total;
                                    }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Village Report",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'villagename',
                    //textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);

        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Village Report',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'villagename',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);


    }
    // $("#JqGrid").dialog('open');
}

function showVillageresults(talukname, hobliname, villagename) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetVillagepoints",
        data: "{'talukname':'" + talukname + "', "
             + "'hobliname':'" + hobliname + "', "
        + "'villagename':'" + villagename + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);




        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();
    }

}

// GetStateReportbyDate(StateName);
function GetStateReportbydate(statename, from_date, to_date) {
    var param = "{'statename':'" + statename + "';'from_date':'" + from_date + "';'to_date':'" + to_date + "'}";
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetStateReportbydate",
        // data: "{'DistrictName':'" + DistrictName + "';'FROM_DATE':'" + FROM_DATE + "';'TO_DATE':'" + TO_DATE + "'}",
        //data: {

        //    viewparams: "indarcd:" + industrycode + ";minarea:" + minarea + ";maxarea:" + maxarea
        //},
        data: "{'statename':'" + $("#ddlStated").val() + "', "
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'statename' },
                { name: 'districtname' },
                { name: 'samplescollected' }

            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                         { text: 'StateName', datafield: 'statename', width: 'auto' },
                         { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                         //{ text: 'From Date', datafield: 'gdb_from_date', width: 'auto' },
                        // { text: 'To Date', datafield: 'to-date', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var total = aggregatedValue + parseInt(record['samplescollected']);
                                            return total;
                                        }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "State Report By Date",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {

                    dataField: 'districtname',
                    //textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'samples collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);
        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 320,
                top: 50,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'State Report By Date',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'districtname',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}
// GetDistrictReportbyDate(DistrictName);
function GetDistrictReportbydate(districtname, from_date, to_date) {
    var param = "{'districtname':'" + districtname + "';'from_date':'" + from_date + "';'to_date':'" + to_date + "'}";
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetDistrictReportbydate",
        // data: "{'DistrictName':'" + DistrictName + "';'FROM_DATE':'" + FROM_DATE + "';'TO_DATE':'" + TO_DATE + "'}",
        //data: {

        //    viewparams: "indarcd:" + industrycode + ";minarea:" + minarea + ";maxarea:" + maxarea
        //},
        data: "{'districtname':'" + $("#ddlDistrictd").val() + "', "
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'districtname' },
                { name: 'talukname' },

                { name: 'samplescollected' }

            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/Icons/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',

              columns: [
                         { text: 'DistrictName', datafield: 'districtname', width: 'auto' },
                         { text: 'TalukName', datafield: 'talukname', width: 'auto' },
                         //{ text: 'From Date', datafield: 'gdb_from_date', width: 'auto' },
                        // { text: 'To Date', datafield: 'to-date', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                    function (aggregatedValue, currentValue, column, record) {
                                        var total = aggregatedValue + parseInt(record['samplescollected']);
                                        return total;
                                    }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "District Report By Date",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'talukname',
                    // textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);
        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'District Report By Date',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'talukname',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}
function showDistrictresultsFromDatePoints(districtname, from_date, to_date) {
    var param = "{'districtname':'" + districtname + "';'from_date':'" + from_date + "';'to_date':'" + to_date + "'}";
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetDistrictReportbydatePoints",

        data: "{'districtname':'" + $("#ddlDistrictd").val() + "', "
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);
        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();
    }

}


//GetTalukReportbydate(String TalukName, String FROM_DATE, String TO_DATE)
function GetTalukReportbydate(talukname, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetTalukReportbydate",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'hobliname' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',
              //rendertoolbar: function (toolbar) {
              //    var container = $("<div style='overflow: hidden; position:relative;margin:3px;'></div>");

              //    var exportButton = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/excel.png'/><span style='margin-left:4px;position:relative;top:2px'>Export to Excel</span></div>");
              //    exportButton.jqxButton({ width: '130' });
              //    container.append(exportButton);
              //    toolbar.append(container);
              //}
              columns: [
                         { text: 'HobliName', datafield: 'hobliname', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var total = aggregatedValue + parseInt(record['samplescollected']);
                                            return total;
                                        }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Taluk Report By Date",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'hobliname',
                    //  textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);
        $('#jqxChart').jqxChart(settings);
        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Taluk Report By Date',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'hobliname',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}

function GetTalukReportbydatePoints(talukname, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetTalukReportbydatePoints",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);
        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();
    }

}

//GetHobliReportbydate(String HobliName, String FROM_DATE, String TO_DATE)
function GetHobliReportbydate(talukname, hobliname, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetHobliReportbydate",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
               + "'hobliname':'" + $("#ddlHoblid").val() + "',"
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'villagename' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',
              //rendertoolbar: function (toolbar) {
              //    var container = $("<div style='overflow: hidden; position:relative;margin:3px;'></div>");

              //    var exportButton = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/excel.png'/><span style='margin-left:4px;position:relative;top:2px'>Export to Excel</span></div>");
              //    exportButton.jqxButton({ width: '130' });
              //    container.append(exportButton);
              //    toolbar.append(container);
              //}
              columns: [
                         { text: 'VillageName', datafield: 'villagename', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = aggregatedValue + parseInt(record['samplescollected']);
                                                return total;
                                            }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Hobli Report By Date",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'villagename',
                    //  textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };
        // setup the chart
        $('#jqxChart').jqxChart(settings);
        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Hobli Report By Date',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'villagename',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}
function GetHobliReportbydatePoints(talukname, hobliname, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetHobliReportbydatePoints",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
               + "'hobliname':'" + $("#ddlHoblid").val() + "',"
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);
        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();
    }

}
//GetVillageReportbydate(String VillageName, String FROM_DATE, String TO_DATE)
function GetVillageReportbydate(talukname, hobliname, villagename, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetVillageReportbydate",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
            + "'hobliname':'" + $("#ddlHoblid").val() + "',"
            + "'villagename':'" + $("#ddlVillaged").val() + "',"
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        var source = {
            datatype: "json",
            datafields: [
                { name: 'villagename' },
                { name: 'samplescollected' }
            ],
            localdata: myObject
        };

        // Preparing the data for use
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#JqGrid").jqxGrid(
          {
              pagesize: 5,
              source: dataAdapter,
              width: 650,
              sortable: true,
              pageable: true,
              autoheight: true,
              columnsresize: true,
              //filterable: true,
              //showfilterrow: true,
              showtoolbar: true,
              showstatusbar: true,
              showaggregates: true,

              rendertoolbar: function (toolbar) {
                  var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                  var exportButton = $("<div style='float: right; margin-right: 5px;'>    <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='images/excel.png' /><span style='margin-left: 4px; position: relative; top: -3px;'>Export to Excel</span></div>");
                  container.append(exportButton);
                  toolbar.append(container);
                  exportButton.jqxButton({ width: 150, height: 20 });
                  exportButton.click(function (event) {
                      $("#JqGrid").jqxGrid('exportdata', 'xls', 'Report');
                  });
              },
              selectionmode: 'checkbox',
              //rendertoolbar: function (toolbar) {
              //    var container = $("<div style='overflow: hidden; position:relative;margin:3px;'></div>");

              //    var exportButton = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/excel.png'/><span style='margin-left:4px;position:relative;top:2px'>Export to Excel</span></div>");
              //    exportButton.jqxButton({ width: '130' });
              //    container.append(exportButton);
              //    toolbar.append(container);
              //}
              columns: [
                         { text: 'VillageName', datafield: 'villagename', width: 'auto' },
                         {
                             text: 'Samples Collected', datafield: 'samplescollected', width: 'auto', cellsformat: 'n', aggregates: [{
                                 '<b>TOTAL</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = aggregatedValue + parseInt(record['samplescollected']);
                                                return total;
                                            }
                             }]
                         }
              ]

          });
        var themesetting = { theme: 'darkblue' };
        $("#JqGrid").jqxGrid(themesetting);
        var settings = {
            title: "Statistics Of Sample Collected",
            description: "Village Report By Date",
            showLegend: true,
            enableAnimations: true,
            padding: { left: 20, top: 5, right: 20, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            categoryAxis:
                {
                    dataField: 'villagename',
                    //  textRotationAngle: 45,
                    showGridLines: true,
                    flip: false
                },
            colorScheme: 'scheme01',
            seriesGroups:
                [
                    {
                        type: 'column',
                        orientation: 'vertical',
                        columnsGapPercent: 5,
                        valueAxis:
                        {
                            flip: false,
                            displayValueAxis: true,
                            description: 'Samples Collected'

                        },
                        series: [
                                { dataField: 'samplescollected', displayText: 'samplescollected' }
                        ]
                    }
                ]
        };

        // setup the chart
        $('#jqxpie').jqxChart(settings1);

        var settings1 = {
            enableAnimations: true,
            showLegend: true,
            showBorderLine: true,
            legendLayout: {
                left: 400,
                top: 150,
                width: 100,
                height: 400,
                flow: 'vertical'
            },
            padding: { left: 1, top: 10, right: 250, bottom: 0 },
            source: dataAdapter,
            colorScheme: 'scheme2',
            title: 'Statistics Of Sample Collected',
            description: 'Village Report By Date',
            seriesGroups: [{

                type: 'pie',
                showLabels: false,
                useGradient: false,
                series: [{
                    dataField: 'samplescollected',
                    displayText: 'villagename',
                    labelRadius: 170,
                    initialAngle: 15,
                    radius: 145,
                    centerOffset: 0

                }]
            }]
        };
        // setup the chart
        $('#jqxpie').jqxChart(settings1);

    }
    // $("#JqGrid").dialog('open');
}
function GetVillageReportbydatePoints(talukname, hobliname, villagename, from_date, to_date) {
    $.ajax({
        type: "POST",
        url: "Agriculture.asmx/GetVillageReportbydatePoints",
        data: "{'talukname':'" + $("#ddlTalukd").val() + "', "
            + "'hobliname':'" + $("#ddlHoblid").val() + "',"
            + "'villagename':'" + $("#ddlVillaged").val() + "',"
              + "'from_date':'" + $("#dFromDate").val() + "',"
              + "'to_date':'" + $("#dToDate").val() + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        //error: OnError

    });
    function OnSuccess(data, status) {
        var objpoints = JSON.parse(data.d);
        var ObjectIDs = [];

        for (var i = 0; i < objpoints.length; i++) {
            ObjectIDs.push(objpoints[i].objectid);
        }

        var gridquerystr = ObjectIDs.toString();

        console.log(gridquerystr);


        var querytext = "objectid  in (" + gridquerystr + ")";
        var queryTask = new esri.tasks.QueryTask('http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0');
        var query = new esri.tasks.Query();
        // var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
        symbol = new esri.symbol.SimpleMarkerSymbol();
        symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
        symbol.setSize(10);
        symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.outSpatialReference = { wkid: 102100 };
        // query.outSpatialReference = map.spatialReference;
        query.where = querytext;


        var graphic;
        queryTask.execute(query, addPointsToMap);

        //var symbol = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE).setSize(20).setColor(new dojo.Color([255, 255, 0, 0.5]));
        var symbol = new esri.symbol.PictureMarkerSymbol("images/green.png", 32, 32).setOffset(0, 15);
        function addPointsToMap(featureSet) {
            dojo.forEach(featureSet.features, function (feature) {
                {
                    map.graphics.add(feature.setSymbol(symbol));
                }
                // map.graphics.add(feature.setSymbol(symbol));
                var features = featureSet.features || [];
                var extent = esri.graphicsExtent(features);

                if (!extent && features.length == 1) {

                    var point = features[0];
                    extent = new esri.geometry.Extent(point.x - 1, point.y - 1, point.x + 1, point.y + 1, point.SpatialReference);
                }

                if (extent) {
                    // assumes the esri map object is stored in the globally-scoped variable 'map'
                    map.setExtent(extent)
                }

            });

        }

        map.graphics.clear();
    }

}


//        var settings = {
//            enableAnimations: true,
//            showLegend: true,
//            showBorderLine: true,
//            legendLayout: {
//                left: 320,
//                top: 50,
//                width: 100,
//                height: 400,
//                flow: 'vertical'
//            },
//            padding: { left: 1, top: 10, right: 250, bottom: 0 },
//            source: dataAdapter,
//            colorScheme: 'scheme2',
//            title: 'Statistics Of Sample Collected',
//            description: 'State Report',
//            seriesGroups: [{

//                type: 'pie',
//                showLabels: false,
//                useGradient: false,
//                series: [{
//                    dataField: 'samplescollected',
//                    displayText: 'districtname',
//                    labelRadius: 170,
//                    initialAngle: 15,
//                    radius: 100,
//                    centerOffset: 0

//                }]
//            }]
//        };
//        $('#jqxChart').jqxChart(settings);

//    }
//     // $("#JqGrid").dialog('open');
//}
function createDialogs() {

    $("#SearchDialogTabs").tabs({ selected: 0 });

    $("#SearchDialog").dialog({
        resizable: false,
        autoOpen: false,
        width: 300,
        height: 'auto',
        show: 'blind',
        hide: 'blind',
      //  position: { my: "left top+400", at: "left top+400" },
        buttons: {
            "Search": function () {

                var selected = $('#SearchDialogTabs').tabs('option', 'active');
                //var filter = "";

                if (selected == 0) {
                    var StateName = $('#ddlState').val();
                    var DistrictName = $('#ddlDistrict').val();
                    if ((StateName.length !== 0) && (DistrictName == '--Select District--')) {
                        GetStateReport($('#ddlState>option:selected').val());

                    }

                    var TalukName = $('#ddlTaluk').val();
                    var HobliName = $('#ddlHobli').val();
                    var VillageName = $('#ddlVillage').val();

                    if (($('#ddlDistrict').val() == '--Select District--')) {
                        // alert("Please Select District");
                        $("#SearchDialogTabs").tabs({ selected: 0 });
                        $("#SearchDialog").dialog('open');
                    }

                    else {

                        if ((DistrictName.length !== 0) && (TalukName == "--Select Taluk--")) {

                            GetDistrictReport($('#ddlDistrict').val());

                            showresults($('#ddlDistrict').val());

                        }


                        else if ((DistrictName.length !== 0) && (TalukName.length !== 0) && (HobliName === '--Select Hobli--')) {

                            GetTalukReport($('#ddlTaluk').val());
                            showTalukresults($('#ddlTaluk').val());

                        }



                        else if ((DistrictName.length != 0) && (TalukName.length != 0) && (HobliName.length != 0) && (VillageName === '--Select Village--')) {

                            GetHobliReport($('#ddlTaluk>option:selected').val(), $('#ddlHobli>option:selected').val());
                            showHobliresults($('#ddlTaluk>option:selected').val(), $('#ddlHobli>option:selected').val());
                        }


                        else {

                            GetVillageReport($('#ddlTaluk>option:selected').val(), $('#ddlHobli>option:selected').val(), $('#ddlVillage>option:selected').val());
                            showVillageresults($('#ddlTaluk>option:selected').val(), $('#ddlHobli>option:selected').val(), $('#ddlVillage>option:selected').val());
                        }

                    }
                }

                if (selected == 1) {
                    var fromdate = $('#dFromDate').val();
                    var todate = $('#dToDate').val();
                    var StateName = $('#ddlStated').val();
                    var DistrictName = $('#ddlDistrictd').val();
                    //if (("#dFromDate").empty()){
                    //    alert("please select date");
                    //}
                    if ((StateName.length !== 0) && (DistrictName == '--Select District--')) {
                        GetStateReportbydate($('#ddlStated>option:selected').val(), fromdate, todate);

                    }

                    var TalukName = $('#ddlTalukd').val();
                    var HobliName = $('#ddlHoblid').val();
                    var VillageName = $('#ddlVillaged').val();

                    if (($('#ddlDistrictd').val() == '--Select District--')) {
                        //  alert("Please Select District");
                        $("#SearchDialogTabs").tabs({ selected: 0 });
                        $("#SearchDialog").dialog('open');
                    }

                    else {

                        if ((DistrictName.length !== 0) && (TalukName == "--Select Taluk--")) {

                            GetDistrictReportbydate($('#ddlDistrictd').val(), fromdate, todate);
                            showDistrictresultsFromDatePoints($('#ddlDistrictd').val(), fromdate, todate);


                        }


                        else if ((DistrictName.length !== 0) && (TalukName.length !== 0) && (HobliName === '--Select Hobli--')) {


                            GetTalukReportbydate($('#ddlTalukd').val(), fromdate, todate);
                            GetTalukReportbydatePoints($('#ddlTalukd').val(), fromdate, todate);

                        }



                        else if ((DistrictName.length != 0) && (TalukName.length != 0) && (HobliName.length != 0) && (VillageName === '--Select Village--')) {

                            GetHobliReportbydate($('#ddlTalukd').val(), $('#ddlHoblid').val(), fromdate, todate);
                            GetHobliReportbydatePoints($('#ddlTalukd').val(), $('#ddlHoblid').val(), fromdate, todate);
                        }


                        else {

                            GetVillageReportbydate($('#ddlTalukd').val(), $('#ddlHoblid').val(), $('#ddlVillaged').val(), fromdate, todate);
                            GetVillageReportbydatePoints($('#ddlTalukd').val(), $('#ddlHoblid').val(), $('#ddlVillaged').val(), fromdate, todate);
                        }
                    }

                }

            },
            Cancel: function () {
                $(this).dialog("close");
                $("#SampleGrid").dialog('close');
            }
        }
    });
}

