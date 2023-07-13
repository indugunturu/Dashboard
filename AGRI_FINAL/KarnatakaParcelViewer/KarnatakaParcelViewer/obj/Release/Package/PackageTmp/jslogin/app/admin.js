$(function () {
    GeUserDetails();


    $("#formUserDetails").dialog({
        modal: true,
        resizable: false,
        height: 'auto',
        width: '500',
        autoOpen: false,
        buttons: [
            {
                id: "btnSave",
                text: "Update",
                click: function () {
                    $("#formUserDetails").dialog("close");
                }

            },
             {
                 id: "btnCancel",
                 text: "Cancel",
                 click: function () {
                     $("#formUserDetails").dialog("close");
                 }

             },
        ]

    });


    function GeUserDetails() {

        $.ajax({
            type: "POST",
            url: "muda.asmx/GetUserDetails",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError

        });

        function OnSuccess(data, status) {
            var myObject = JSON.parse(data.d);

            var source =
           {
               datatype: "json",
               datafields: [
                   { name: 'userid', type: 'int' },
                    { name: 'firstname', type: 'string' },
                    { name: 'email', type: 'string' },
                     { name: 'paword', type: 'string' },
                    { name: 'department', type: 'string' },
                    { name: 'isauthorized' },
                    { name: 'isadmin' },
                    { name: 'isactive' },
                    { name: 'islocked', type: 'int' }
               ],
               localdata: myObject
           };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#GridUserDetails").jqxGrid(
                {
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
                        var container = $("<div style='overflow: hidden; position:relative; margin:3px;'></div>");

                        var DeleteUserDetails = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/delete.png'/><span style='margin-left:4px;position:relative;top:2px'>Delete UserDetails</span></div>");
                        DeleteUserDetails.jqxButton({ width: '160' });
                        container.append(DeleteUserDetails);
                        toolbar.append(container);


                        var EditUserDetails = $("<div style='float:right;margin-right:20px;'><img style='position:relative;margin-top:2px;width:16px;height:16px' src='./images/edit.png'/><span style='margin-left:4px;position:relative;top:2px'>Edit UserDetails</span></div>");
                        EditUserDetails.jqxButton({ width: '130' });
                        container.append(EditUserDetails);
                        toolbar.append(container);

                        //$("#formDivisionDetails").dialog('open')

                        EditUserDetails.click(function (e) {
                            e.preventDefault();
                         
                            $("#formUserDetails").dialog('open');
                           

                        });
                    },
                    columns: [
                        { text: 'UserId', datafield: 'userid', width: 'auto' },
                        { text: 'FirstName', datafield: 'firstname', width: 'auto' },
                        { text: 'Email-id', datafield: 'email', width: 'auto' },
                        { text: 'Password', datafield: 'paword', width: 'auto' },
                        { text: 'Department', datafield: 'department', width: 'auto' },
                        { text: 'isAuthorized', datafield: 'isauthorized', width: 'auto' },
                        { text: 'isAdmin', datafield: 'isadmin', width: 'auto' },
                        { text: 'isActive', datafield: 'isactive', width: 'auto' },
                        { text: 'isLocked', datafield: 'islocked', width: 'auto' },

                    ]
                })

           
        }
        function OnError(request, status, error) {
            alert(request.statusText);

        }


    }

});