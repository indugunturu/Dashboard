$(function () {

    GetDivisionDetails();

    $("#formDivisionDetails").dialog({
        modal: true,
        resizable: false,
        height: 'auto',
        width: '500',
        autoOpen: false,
        buttons: [
         {
             id: "btnSaveDivisionDetails",
             text: "Add",
             click: function () {
                 var statusobj = $("#formDivisionDetails").data('bootstrapValidator');
                 var status = statusobj.validate();              

                 if (status.isValid() == false) {
                     $("#errordialog").dialog('open');
                 } else {
                     var param = {
                         DivisionName: $("#txtDivisionName").val(),
                         DivisionArea: $("#txtDivisionArea").val(),
                         GrossArea: $("#txtGrossArea").val()
                     };

                     InsertDivisionDetails(param);
                 }
             }
         },
        {
            id: "btnResetDivisionDetails",
            text: "Reset",
            click: function () {
                $("#formDivisionDetails").dialog("close");
            }
        },
         {
             id: "btnclosedivisiondialog",
             text: "Close",
             click: function () {
                 $("#formDivisionDetails").dialog("close");
             }
         }]
    });

    $("#errordialog").dialog({
        modal: true,
        resizable: false,
        height: 'auto',
        width: '500',
        autoOpen: false,
        buttons: [
         {
             text: "Close",
             click: function () {
                 $(this).dialog("close");
             }
         }]
    });

    $("#formDivisionDetails").bootstrapValidator({
        container: '#errordialog',
        submitButtons: '#btnSaveDivisionDetails',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            divisionname: {
                validators: {
                    notEmpty: {
                        message: '<li>Please enter Division Name.</li>'
                    }
                }
            },
            divisionarea: {
                validators: {
                    notEmpty: {
                        message: '<li>Please enter Division Area.</li>'
                    },
                    regexp: {
                        regexp: /^\d+\.?\d*$/,
                        message: '<li>Invalid Data format.</li>'
                    },
                }
            },
            grossarea: {
                validators: {
                    notEmpty: {
                        message: '<li>Please enter Gross Area.</li>'
                    }, regexp: {
                        regexp: /^\d+\.?\d*$/,
                        message: '<li>Invalid Data format.</li>'
                    }
                }

            }
        }

    });


    ////Insert Division Details
    //$("#btnSaveDivisionDetails").click(function (e) {
    //    e.preventDefault();

       
    //});

});


function GetDivisionDetails() {

    $.ajax({
        type: "POST",
        url: "Masterdetails.asmx/GetDivisionDetails",
        data: {},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError
    });

    function OnSuccess(data, status) {
        //Converts String to JSON String
        var myObject = JSON.parse(data.d);

        var source = {
            datatype: "json",
            datafields: [
                { name: 'Division_Code', type: 'int' },
                { name: 'Division_Name', type: 'string' },
                { name: 'Division_Area', type: 'number' },
                { name: 'Gross_Area', type: 'number' },
                { name: 'isActive' }
            ],
            localdata: myObject  // Calling jSON 
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#GridDivisionDetails").jqxGrid({
            width: 850,
            source: dataAdapter,
            columnsresize: true,
            pagesizeoptions: ['25', '50', '100'],
            sortable: true,
            pageable: true,
            autoheight: true,
            columnsresize: true,
            filterable: true,
            showfilterrow: true,
            showtoolbar: true,
            selectionmode: 'checkbox',
            rendertoolbar: function (toolbar) {
                //add 
                var container = $("<div style='overflow: hidden; position: relative; margin: 3px;'></div>");
                var exportButton = $("<div style='float: right; margin-right: 20px;'> <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='./images/excel.png' /> <span style='margin-left: 4px; position: relative; top: 2px;'>Export to Excel</span></div>");
                exportButton.jqxButton({ width: '140' });
                container.append(exportButton);

                var AddDivisionDetailsButton = $("<div style='float: right; margin-right: 20px;'> <img style='position: relative; margin-top: 2px; width: 16px; height: 16px;' src='./images/Add-icon.png' /> <span style='margin-left: 4px; position: relative; top: 2px;'>Add Division Details</span></div>");
                AddDivisionDetailsButton.jqxButton({ width: '170' });
                container.append(AddDivisionDetailsButton);

                AddDivisionDetailsButton.click(function (e) {
                    e.preventDefault();
                    $("#formDivisionDetails").dialog('open');
                });

                //PrintdetailsButton.click(function (event) {
                //    var selectedrowindex = $("#GridASIDetails").jqxGrid('getselectedrowindex');
                //    if (selectedrowindex != -1) {
                //        var datarow = $("#GridASIDetails").jqxGrid('getrowdata', selectedrowindex);
                //        if (datarow.ASIID != "") {
                //            var ASIID = datarow.ASIID;
                //            top.location = "./PrintASIForm.aspx?ASIID=" + ASIID;
                //        }
                //    }
                //});



                toolbar.append(container);
            },
            columns: [
                { text: 'Division Code', datafield: 'Division_Code', width: 'auto' },
                { text: 'Division Name', datafield: 'Division_Name', width: 'auto' },
                { text: 'Division Area', datafield: 'Division_Area', width: 'auto' },
                { text: 'Gross Area', datafield: 'Gross_Area', width: 'auto' },
                { text: 'isActive', datafield: 'isActive' }
            ]
        });
    }
}

function InsertDivisionDetails(param) {
    $.ajax({
        type: "POST",
        url: "Masterdetails.asmx/InsertDivisionDetails",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess,
        error: OnError
    });

    function OnSuccess(data, status) {
        var myObject = JSON.parse(data.d);
        if (parseInt(myObject[0].DivisionID) > 0) {
            alert("Added Division Details.");
            top.location = "./DivisionDetails.aspx";
        }
        else if (parseInt(myObject[0].DivisionID) == -1) {
            alert("Division Details are already in the database.");
        } else {
            alert("Unable to add Division Details.");
        }
    }
}


function OnError(request, status, error) {
    alert(request.statusText);
}