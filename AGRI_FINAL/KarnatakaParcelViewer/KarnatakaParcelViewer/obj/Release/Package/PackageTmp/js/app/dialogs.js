
$(function () {

    createDialogs();

    $(document).on('click', '#btnBasemap', function (e) {
        e.preventDefault();
        CloseDialogs();
        $("#BasemapGallery-content").dialog('open');
    });

    //Show Basemaps
    $(document).on('click', '#imagerybasemap', function (e) {
        //gmap.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        CreateBasemapsGallery.startup();
    });

    //$(document).on('click', '#osmBasemap', function (e) {
    //    gmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    //});

    //$(document).on('click', '#topoBasemap', function (e) {
    //    gmap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    //});









    // Close Jquery Dialogs
    var CloseDialogs = function () {
        $(".ui-dialog-content").dialog("close");
    };





    function createDialogs() {




        $("#BasemapGallery-content").dialog({
            resizable: false,
            autoOpen: false,
            show: 'blind',
            hide: 'blind',
            width: 330,
            position: { my: "right top", at: "right top", of: window }
        });



    }



    /*------------------------------------*/
    // BASE MAP TOGGLE FUNCTIONS
    /*------------------------------------*/

    basemapItems: [{
        uniqueID: 'str',
        title: 'Streetmap',
        thumbnail: userConfig.StreetImagePath,
        services: [{ url: userConfig.World_Street_Map }]
    },
   {
       uniqueID: 'top',
       title: 'Topographic',
       thumbnail: userConfig.TopographicImagePath,
       services: [{ url: userConfig.USA_Topo_Map }]
   },
   {
       uniqueID: 'sat',
       title: 'Satellite',
       thumbnail: userConfig.SattiliteImagePath,
       services: [{ url: userConfig.World_Imagery }]
   }]

    function CreateBasemapsGallery() {

        if (basemapItems) {
            var html = '<table><tr>';
            for (i = 0; i < basemapItems.length; ++i) {
                for (j = 0; j < basemapItems[i].services.length; j++) {
                    Baselayer = new esri.layers.ArcGISTiledMapServiceLayer(basemapItems[i].services[j].url, { id: basemapItems[i].uniqueID + j, visible: false });
                    map.addLayer(Baselayer);
                }

                html += '<td><div data-basemap-id="' + i + '" class="baseMap">';
                html += '<div class="baseImage"><img width="100" height="67" src="' + basemapItems[i].thumbnail + '" /></div>';
                html += '<div class="baseTitle">' + basemapItems[i].title + '</div></div></td>';

            }
            html += '<td> <div data-basemap-id="3" class="baseMap">  <div class="baseImage"><img width="100" height="67" src="images/basemap/NoBasemap.jpg" </div>  <div class="baseTitle"> White Background </div></div> </td>';
            html += "</tr><table>";
            $('#BasemapGallery-content').html(html);
            basemapID = 0;
            setBasemapList(0);
        }
    }


    function hideBasemapLayerTmp(layertmp) {
        if (layertmp) {
            if (layertmp.visible === true) {
                layertmp.hide();
            }
        }
    }
    /*------------------------------------*/
    // HIDE BASEMAP LAYER
    /*------------------------------------*/
    function hideBasemapLayer(i) {
        var layertmp;
        var j;

        for (j = 0; j < basemapItems[i].services.length; j++) {
            layertmp = map.getLayer(basemapItems[i].uniqueID + j);
            hideBasemapLayerTmp(layertmp);
        }

    }

    /*------------------------------------*/
    // HIDE ALL BASEMAP LAYERS
    /*------------------------------------*/

    function hideAllBasemaps() {
        var i;
        for (i = 0; i < basemapItems.length; ++i) {
            hideBasemapLayer(i);
        }
    }

    /*------------------------------------*/
    // SHOW BASEMAP LAYER TEMP
    /*------------------------------------*/

    function showBasemapLayerTmp(layer) {
        if (layer) {

            layer.show();
        }
    }
    /*------------------------------------*/
    // SHOW BASEMAP LAYER
    /*------------------------------------*/
    function showBasemapLayer(i) {
        var layer;
        var j;
        for (j = 0; j < basemapItems[i].services.length; j++) {
            layer = map.getLayer(basemapItems[i].uniqueID + j);
            showBasemapLayerTmp(layer);
        }
        baseMap = basemapItems[i].uniqueID;
    }
    /*------------------------------------*/
    // CHANGE BASEMAP
    /*------------------------------------*/
    function changeBaseMap(i) {
        hideAllBasemaps();
        showBasemapLayer(i);
    }
    /*------------------------------------*/
    // SETS BASEMAP AND LIST
    /*------------------------------------*/
    function setBasemapList(i) {
        changeBaseMap(i);
    }


});