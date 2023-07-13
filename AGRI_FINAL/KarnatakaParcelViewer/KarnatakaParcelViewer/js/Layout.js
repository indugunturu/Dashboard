$(function () {
    //Layout
    $('body').layout({
        resizeWhileDragging: true,
        sizable: false,
        animatePaneSizing: true,
        spacing_open: 0,
        spacing_closed: 0,
        north__spacing_open: 0,
        north__minSize: 60,
        north__maxSize: 60
    });

    createdialogs();

    $('.buttonclass').hover(function () {
        // over
        $(this).removeClass("buttonClassAfterHover");
        $(this).addClass("buttonclassOnHover");
    }, function () {
        // out
        $(this).removeClass("buttonclassOnHover");
        $(this).addClass("buttonClassAfterHover");
    }
);

    $("#btnBasemap").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#BasemapsDialog").dialog("open");
    });


    $("#btnNavigation").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#NavigationTools").dialog("open");
    });

    $("#btnsearchbygraphicstools").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#SearchbyGraphicsTools").dialog("open");
    });

    $("#btnSearchtools").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#SearchDialog").dialog("open");
    });


    $("#btnLegend").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#LegendDialog").dialog("open");
    });

    $("#btnMeasure").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#MeasureDialog").dialog("open");
    });
    //$("#JqGrid").dialog({
    //    resizable: true,
    //    autoOpen: false,
    //    show: 'blind',
    //    width: 725,
    //    bottom:100,
    //    height: 'auto',
    //    position: { my: "center top+305", at: "center top+305", of: window }
    //});

    

    $("#btnGetAddress").click(function (e) {
        e.preventDefault();
        closedialogs();
        $("#GeocodingDialog").dialog("open");
    });

    function createdialogs() {

        $("#BasemapsDialog").dialog({
            width: 280,
            position: { my: "left top+300", at: "left top+300" },
            autoOpen: false
        });
        $("#MeasureDialog").dialog({
            width: 250,
            position: { my: "left top+300", at: "left top+300" },
            autoOpen: false
        });

        $("#SearchbyGraphicsTools").dialog({
            width: 200,
            height: 100,
            position: { my: "left bottom", at: "left bottom" },
            autoOpen: false
        });

        $("#NavigationTools").dialog({
            width: 300,
            height: 100,
            position: { my: "left top+350", at: "left top+350" },
            autoOpen: false
        });

        $("#SearchDialog").dialog({
            width: 300,
            height: 'auto',
            position: { my: "left top+250", at: "left top+250" },
            autoOpen: false
        });

        $("#LegendDialog").dialog({
            width: 200,
            height: 280,
            position: { my: "left top+280", at: "left top+280" },
            autoOpen: false
        });


        $("#GeocodingDialog").dialog({
            width: 400,
            position: { my: "right top", at: "right top" },
            autoOpen: false
        });



    }
    function closedialogs() {
        $(".ui-dialog-content").dialog("close");
    }
});