$(document).ready(function () {

  
    $("#ddlDistrict").change(function () {
        var selectedItem = $("#ContentPlaceHolder1_ddlDistrict").val();
        var ddlTaluk = $("#ContentPlaceHolder1_ddlTaluk");
        //var statesProgress = $("#states-loading-progress");
        //alert(selectedItem);
        //statesProgress.show();
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
        GetHobliDetailsbyTaluk(selectedItem,selectedItem1);

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
        GetVillagedetailsbyHobli(selectedItem,selectedItem1,selectedItem2);

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
            $("#ddlState").empty();
            $("#ddlState").append('<option value="">--Select State--</option>');
            for (var i = 0; i < obj.length; i++) {
                $("#ddlState").append('<option value="' + obj[i].statename + '">' + obj[i].statename + '</option>');
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
                $("#ddlDistrict").empty();
                $("#ddlDistrict").append('<option value="">--Select District--</option>');
                for (var i = 0; i < obj.length; i++) {
                    $("#ddlDistrict").append('<option value="' + obj[i].districtname + '">' + obj[i].districtname + '</option>');
                }
            }
            alert(statename);
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
                $("#ddlTaluk").empty();
                $("#ddlTaluk").append('<option value="">--Select Taluk--</option>');
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
        function GetHobliDetailsbyTaluk(districtname,talukname) {
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
                $("#ddlHobli").append('<option value="">--Select Hobli--</option>');
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
        function GetVillagedetailsbyHobli(districtname,talukname,hobliname) {
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
                $("#ddlVillage").append('<option value="">--Select Village--</option>');
                for (var i = 0; i < obj.length; i++) {
                    $("#ddlVillage").append('<option value="' + obj[i].villagename + '">' + obj[i].villagename + '</option>');
                    //alert(obj[taluknamekan]);
                }
            }
            function OnError(request, status, error) {
                alert(request.statusText);
            }
        }


   

});