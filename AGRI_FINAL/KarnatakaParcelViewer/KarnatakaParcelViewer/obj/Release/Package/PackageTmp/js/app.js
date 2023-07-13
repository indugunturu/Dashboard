var map;
var toc;
var findTask, findParams;
var mapserviceurl = "http://164.100.133.131/arcgisserver/rest/services/CRD/CRD1/MapServer";
$(function () {
//var graphic = new graphic;
require([
    "dojo/ready",
    "dojo",
    "dojo/parser",
    "dojo/dom",
    "dojo/on",
    "esri/map",
    "esri/dijit/HomeButton",
    "esri/dijit/Measurement",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/dijit/Scalebar",
    "esri/dijit/BasemapGallery",
    "esri/toolbars/navigation",
    "esri/dijit/OverviewMap",
    "esri/geometry/Extent",
    "esri/SpatialReference",
    "esri/geometry/webMercatorUtils",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "esri/toolbars/draw",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/geometry/Point",
    "esri/graphic",
    "esri/Color",
    "agsjs/dijit/TOC",
    "esri/InfoTemplate",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/dijit/Popup",
    "dijit/registry",
    "esri/tasks/FindTask",
    "esri/tasks/FindParameters",
    "dojo/dom-construct",
    "esri/tasks/locator",
    "dojo/_base/array",
    "dojo/domReady!"],
    function (ready, dojo, parser, dom, on, Map, HomeButton, Measurement, ArcGISDynamicMapServiceLayer,
        FeatureLayer, GraphicsLayer, Scalebar, BasemapGallery, Navigation, OverviewMap, Extent, SpatialReference,
        webMercatorUtils, Query, QueryTask, DrawToolbar, SimpleLineSymbol, SimpleFillSymbol,
        PictureMarkerSymbol, SimpleMarkerSymbol, SimpleRenderer, Point, graphic, Color, TOC, InfoTemplate, IdentifyTask,
        IdentifyParameters, Popup, registry, FindTask, FindParameters,domConstruct, Locator, arrayUtils) {
        parser.parse();
        createDialogs();

       // var d = registry.byId("ddlDistrict").value;

        var identifyTask, identifyParams;
        var intialextent = new Extent(7778597.959975056, 1564947.1810059766, 9217107.340624947, 2133123.2518000016, new SpatialReference({ wkid: 102100 }));

        //Intialize the map,Basemap wkid : 102100 ,Center point,Zoom Level
        map = new Map("divMap", {
            basemap: "satellite",
            center: [75, 14],
            zoom: 6,
            extent: intialextent,
            logo: false,
            fitExtent: true,
            slider: true
        });

        // Define Layers

        var operationalLayer = new ArcGISDynamicMapServiceLayer(mapserviceurl);
        var pointFeatureLayer = new FeatureLayer("http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/FeatureServer/0");

        var samplelocations = new GraphicsLayer({ id: "Samplelocations" });

        var samplelocationsSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([239, 107, 0]), 1), new Color([239, 107, 0]));


        var samplelocationrenderer = new SimpleRenderer(samplelocations);
        samplelocations.setRenderer(samplelocationrenderer);


        var home = new HomeButton({
            map: map
        }, "HomeButton");
        home.startup();

        //******************************************TABLE OF CONTENT****************************************************************    




        map.on('layers-add-result', function (evt) {
            try {

                var toc = new TOC({
                    map: map,
                    layerInfos: [{
                        layer: pointFeatureLayer,
                        title: "My Feature"
                    }, {
                        layer: operationalLayer,
                        title: "Dynamic Map"
                    }]
                }, "tocDiv");
                toc.startup();

                toc.on("load", function () {
                    console.log("TOC loaded");
                });
            }
            catch (e) {
                console.error(e.message);
            }

        });
        map.addLayers([operationalLayer, pointFeatureLayer, samplelocations]);

        //******************************************** SWITCH BASEMAP********************************************************************************************

        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapGallery");
        basemapGallery.on("load", function () {

            basemapGallery.remove('basemap_1');
            basemapGallery.remove('basemap_2');
            basemapGallery.remove('basemap_3');
            basemapGallery.remove('basemap_4');
            basemapGallery.remove('basemap_5');
            basemapGallery.remove('basemap_8');
        });

        basemapGallery.startup();


        //*******************************************SCALEBAR & MEASUREMENT ******************************************************************************


        var Scalebar = new Scalebar({
            map: map,
            scalebarUnit: 'metric',
            scalebarStyle: 'line'
        });

        var measurement = new Measurement({
            map: map
        }, measurementDiv);
        measurement.startup();

        //*****************************************************************************************************************



        map.on("mouse-move", showcoordiantes);
        map.on("mouse-drag", showcoordiantes);


        //overview tools
        var OverviewMap = new OverviewMap({
            map: map,
            attachTo: "bottom-right",
            color: " #D84E13",
            opacity: .40
        });

        OverviewMap.startup();

        function showcoordiantes(evt) {
            var p = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
            $("#latlong").html("Lat,Long : " + p.y.toFixed(4) + "," + p.x.toFixed(4));

        }


        $("#ClearGraphics").click(function (e) {
            e.preventDefault();
            // drawtools.deactivate();
            map.infoWindow.hide();
            map.setMapCursor("default");
            map.graphics.clear();
        });


        //****************************************NAVIGATION TOOLS**************************************************************************

        var navToolbar = new Navigation(map);

        //zoom In
        $("#ZoomInTool").click(function (e) {
            e.preventDefault();
            map.setMapCursor("url('images/cursors/zoomin.cur'), auto");
            navToolbar.activate(Navigation.ZOOM_IN);
        });

        //ZoomOut
        $("#ZoomOutTool").click(function (e) {
            e.preventDefault();
            map.setMapCursor("url('images/cursors/zoomout.cur'), auto");
            navToolbar.activate(Navigation.ZOOM_OUT);
        });

        //Pan
        $("#panTool").click(function (e) {
            e.preventDefault();
            map.setMapCursor("url('images/cursors/pan.cur'), auto");
            navToolbar.activate(Navigation.PAN);
        });

        //FullExtent
        $("#zoomfullext").click(function (e) {
            e.preventDefault();
            map.setMapCursor("default");
            navToolbar.deactivate();
            // navToolbar.zoomToFullExtent();
            map.setExtent(intialextent, true);
        });

        //Zoom to previous     
        $("#zoomtoPrevExtent").click(function (e) {
            e.preventDefault();
            map.setMapCursor("default");
            navToolbar.deactivate();
            navToolbar.zoomToPrevExtent();
        });
        //Zoom to Next    
        $("#zoomtoNextExtent").click(function (e) {
            e.preventDefault();
            map.setMapCursor("default");
            navToolbar.deactivate();
            navToolbar.zoomToNextExtent();
        });

        //*************************************IDENTIFIER*************************************************

        map.on("load", mapReady);

        var parcelsURL = "http://164.100.133.131/arcgisserver/rest/services/CRD/CRD2/MapServer";
        //map.addLayer(new ArcGISDynamicMapServiceLayer(parcelsURL,
        //  { opacity: 20 }));

        function mapReady() {
            map.on("click", executeIdentifyTask);
            //create identify tasks and setup parameters 
            identifyTask = new IdentifyTask(parcelsURL);

            identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [0];
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = map.width;
            identifyParams.height = map.height;
        }

        function executeIdentifyTask(event) {
            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = map.extent;

            var deferred = identifyTask
              .execute(identifyParams)
              .addCallback(function (response) {
                  // response is an array of identify result objects
                  // Let's return an array of features.
                  return arrayUtils.map(response, function (result) {
                      var feature = result.feature;
                      var layerName = result.layerName;

                      feature.attributes.layerName = layerName;
                      if (layerName === 'GridPoint') {
                          var taxParcelTemplate = new InfoTemplate("",
                            "XX: ${XX} <br/> YY: ${YY} <br/> Sample Point Number: ${Sample Point Number} <br/> Point Collected: ${Point Collected} <br/>  Major Rabi Crops: ${ Major Rabi Crops} <br/> Major Summer Crop: ${Major Summer Crop} <br/> Soil Type: ${Soil Type} <br/> Major Kharif Crops: ${Major Kharif Crops}");
                          feature.setInfoTemplate(taxParcelTemplate);
                      }
                      //else if (layerName === 'Grid') {
                      //    console.log(feature.attributes.objectid);
                      //    var buildingFootprintTemplate = new InfoTemplate("",
                      //      "OBJECTID: ${OBJECTID}");
                      //    feature.setInfoTemplate(buildingFootprintTemplate);
                      //}

                      return feature;
                  });
              });

            map.infoWindow.setFeatures([deferred]);
            map.infoWindow.show(event.mapPoint);
        }

        Getstate();
        Getalldistricts();



    });
});


