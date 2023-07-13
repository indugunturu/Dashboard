$(function () {


    $("#btnlogin").click(function (e) {
        e.preventDefault();
        param = {
            email: $("#username").val(),
            paword: $("#password").val()

        }
        GetUserDetailsByEmailandPassword(param);
    });


    //$("#btnCreateUser").click(function (e) {
    //    e.preventDefault();
    //    //firstname,lastname,email,paword,contactnumber,designation,department,mudazone
    //    //isauthorized, isadmin, isactive, islocked
    //    param = {
    //        firstname: $("#firstname").val(),
    //        lastname: $("#lastname").val(),
    //        email: $("#email").val(),
    //        paword: $("#password").val(),
    //        contactnumber: $("#contactno").val(),
    //        designation: $("#designation").val(),
    //        department: $("#ContentPlaceHolder1_ddlSection").val(),
    //        mudazone: $("#ContentPlaceHolder1_ddlZone").val(),
    //        isauthorized: { 'isauthorized': '" + false + "' },
    //        isadmin: { 'isadmin': '" + false + "' },
    //        isactive: { 'isactive': '" + true + "' },
    //        islocked: { 'islocked': '" + false + "' }

    //    }

    //    InsertUserDetails(param);
    //});


    //function InsertUserDetails(param) {
    //    $.ajax({
    //        type: "POST",
    //        url: "muda.asmx/InsertUserDetails",
    //        data: JSON.stringify(param),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: OnSuccess,
    //        error: OnError

    //    });

    //    function OnSuccess(data, status) {

    //        var myObject = JSON.parse(data.d);
    //        alert("Added User Details");
    //        top.location = "./Registration.aspx";
    //    }


    //}

    function OnError(request, status, error) {
        alert(request.statusText);

    }



    function GetUserDetailsByEmailandPassword(param) {
        $.ajax({
            type: "POST",
            url: "muda.asmx/GetUserDetailsByEmailandPassword",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError

        });

        function OnSuccess(data, status) {

            var myObject = JSON.parse(data.d);
            alert(myObject);

            if (myObject[0].isauthorized == true && myObject[0].isadmin == true) {
               
                top.location = "./UserDetails.aspx";
            }

            else {
                alert("Invalid Email and Password");
            }

        }


    }

});