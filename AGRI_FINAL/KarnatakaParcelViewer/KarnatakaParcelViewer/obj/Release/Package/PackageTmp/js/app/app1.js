$(document).ready(function () {
   

    $("#ddlDistrictd").change(function () {
        var selectedItem = $("#ddlDistrictd").val();
        var ddlTalukd = $("#ddlTalukd");
        //var statesProgress = $("#states-loading-progress");
        //alert(selectedItem);
        //statesProgress.show();
        $("#ddlHoblid").empty();
        $("#ddlVillaged").empty();
        Getalltaluksbydistrict(selectedItem);

    });
    $("#ddlTalukd").change(function () {
        var selectedItem = $("#ddlDistrictd").val();
        var selectedItem1 = $("#ddlTalukd").val();
        var ddlDistrictd = $("#ddlDistrictd");
        var ddlTalukd = $("#ddlTalukd");
        //var statesProgress = $("#states-loading-progress");
        //alert(selectedItem);
        //statesProgress.show();
        $("#ddlVillaged").empty();
        GetHobliDetailsbyTaluk(selectedItem, selectedItem1);

    });

    $("#ddlHoblid").change(function () {
        var selectedItem = $("#ddlDistrictd").val();
        var selectedItem1 = $("#ddlTalukd").val();
        var selectedItem2 = $("#ddlHoblid").val();
        var ddlDistrictd = $("#ddlDistrictd");
        var ddlTalukd = $("#ddlTalukd");
        var ddlTalukd = $("#ddlTalukd");
        var ddlVillaged = $("#ddlVillaged");
        //var statesProgress = $("#states-loading-progress");
        //alert(selectedItem);
        //statesProgress.show();
        GetVillagedetailsbyHobli(selectedItem, selectedItem1, selectedItem2);

    });

    Getstate();
      //Getstate()
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
            $("#ddlStated").empty();
            $("#ddlStated").append('<option value="">--Select State--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlStated").append('<option value="' + obj[i].statename + '">' + obj[i].statename + '</option>');
            }
        }
        function OnError(request, status, error) {
            alert(request.statusText);
        }
    }


    //Getalldistricts();
    Getalldistricts();

    function Getalldistricts() {
        $.ajax({
            type: "POST",
            url: "Agriculture.asmx/Getalldistricts",
            data: "{}",
            contentType: "application/json; character=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

        function OnSuccess(data, status) {
            var obj = JSON.parse(data.d);
            $("#ddlDistrictd").empty();
            $("#ddlDistrictd").append('<option value="--Select District--">--Select District--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlDistrictd").append('<option value="' + obj[i].districtname + '">' + obj[i].districtname + '</option>');
            }
        }
        function OnError(request, status, error) {
            alert(request.statusText);
        }
    }

    //Getalltaluksbydistrict(DistrictName)

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
            $("#ddlTalukd").empty();
            $("#ddlTalukd").append('<option value="--Select Taluk--">--Select Taluk--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlTalukd").append('<option value="' + obj[i].talukname + '">' + obj[i].talukname + '</option>');
                //alert(obj[taluknamekan]);
            }
        }
        function OnError(request, status, error) {
            alert(request.statusText);
            alert(talukname);
        }
    }
    //GetHobliDetailsbyTaluk(TalukName)
    function GetHobliDetailsbyTaluk(districtname, talukname) {
        $.ajax({
            type: "POST",
            url: "Agriculture.asmx/GetHobliDetailsbyTaluk",
            data: "{'districtname':'" + districtname + "', "
             + "'talukname':'" + talukname + "'}",
            contentType: "application/json; character=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError

        });

        function OnSuccess(data, status) {
            var obj = JSON.parse(data.d);
            $("#ddlHoblid").empty();
            $("#ddlHoblid").append('<option value="--Select Hobli--">--Select Hobli--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlHoblid").append('<option value="' + obj[i].hobliname + '">' + obj[i].hobliname + '</option>');
                //alert(obj[taluknamekan]);
            }
        }
        function OnError(request, status, error) {
            alert(request.statusText);
        }
    }

    //GetVillagedetailsbyHobli(HobliName)
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
            $("#ddlVillaged").empty();
            $("#ddlVillaged").append('<option value="--Select Village--">--Select Village--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlVillaged").append('<option value="' + obj[i].villagename + '">' + obj[i].villagename + '</option>');
                //alert(obj[taluknamekan]);
            }
        }
        function OnError(request, status, error) {
            alert(request.statusText);
        }
    }



});