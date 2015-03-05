var MyApp = MyApp || {};

MyApp.RoomReservation = function () {

    var offset;

    var LoadList = function(data,id)
    {
        var jsonObject = JSON.parse(data.body);
        var roomsHTML = "";

        var results = jsonObject.d.results;

        if (results.length == 0) {
            roomsHTML = "<li class='no-rooms'>" + MyApp.language["noroom"] + "</li>";

        }
        else{
            for (var i = 0; i < results.length; i++) {
                roomsHTML = roomsHTML +
                    "<li content='" + results[i].Title + "' id='" + results[i].ID + "' class='room'><input type='hidden' id='colour" + results[i].ID + "' value='" + results[i].colour + "' /><div class='information'><span>" + results[i].Title + "</span><br /><br /><span>" + MyApp.language["description"] + ": " + results[i].description + "</span><br /><span>" + MyApp.language["capacity"] + ": " + results[i].roomcapacity + "</span></div></li>";
            }
        }

        var elementRoot = document.getElementById(id);

        elementRoot.innerHTML = roomsHTML;
    }

    var CreateList = function(basetemplate, description, listname)
    {
        var deferred = $.Deferred();

        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "POST",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists?@target='" + hostweburl + "'",
            body: "{ '__metadata': { 'type': 'SP.List' }, 'AllowContentTypes': true, 'BaseTemplate': " + basetemplate + ", 'ContentTypesEnabled': true, 'Description': '" + description + "', 'Title': '" + listname + "' }",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (data) {
                deferred.reject();
            }
        });


        return deferred.promise();
    }

    var CreateFieldList = function(listname, fieldname, fieldtype)
    {
        var deferred = $.Deferred();

        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "POST",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + listname + "')/fields?@target='" + hostweburl + "'",
            body: "{ '__metadata': { 'type': 'SP.Field' }, 'Title': '" + fieldname + "', 'FieldTypeKind': " + fieldtype + " }",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (data) {
                deferred.resolve();
            }
        });


        return deferred.promise();
    }

    var CreateFieldResourceList = function (listname) {
        var deferred = $.Deferred();
        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "POST",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + listname + "')/fields?@target='" + hostweburl + "'",
            body: "{ '__metadata': { 'type': 'SP.Field' }, 'Title': 'description', 'FieldTypeKind': 3 }",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                executor.executeAsync({
                    method: "POST",
                    url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + listname + "')/fields?@target='" + hostweburl + "'",
                    body: "{ '__metadata': { 'type': 'SP.Field' }, 'Title': 'roomcapacity', 'FieldTypeKind': 1 }",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose"
                    },
                    success: function (data) {
                        executor.executeAsync({
                            method: "POST",
                            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + listname + "')/fields?@target='" + hostweburl + "'",
                            body: "{ '__metadata': { 'type': 'SP.Field' }, 'Title': 'colour', 'Description': 'Please, use hex colour notation (#RRGGBB) to get it work correctly', 'FieldTypeKind': 2 }",
                            headers: {
                                "accept": "application/json;odata=verbose",
                                "content-type": "application/json;odata=verbose"
                            },
                            success: function (data) {
                                deferred.resolve();
                            },
                            error: function (data) {
                                deferred.reject();
                            }
                        });
                    },
                    error: function (data) {
                        deferred.reject();
                    }
                });
            },
            error: function (data) {
                deferred.reject();
            }
        });


        return deferred.promise();
    }

    var GetFreeRoom = function (locations,id) {

        var jsonObject = JSON.parse(locations);
        var results = jsonObject.d.results;
        var filter = "";

        var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("RoomList");

        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        var elements = results.length;

        for (var i = 0; i < elements; i++) {
            
            if (i != (elements - 1))
            {
                filter += "(Title ne '" + results[i].Location + "') and";
            }
            else
            {
                filter += "(Title ne '" + results[i].Location + "')";
            }
        }

        var completeFilter = "";

        if (filter != "")
            completeFilter = "$filter=(" + filter + ")&";

        executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "GET",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/GetByTitle('" + resourceList + "')/items?" + completeFilter + "@target='" + hostweburl + "'",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                LoadList(data, id);
            },
            error: function (data) {
            }
        });

    }

    var ExistList = function (listname) {

        var deferred = $.Deferred();

        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "GET",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/GetByTitle('" + listname + "')?@target='" + hostweburl + "'",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                deferred.resolve();
            },
            error: function (data) {
                deferred.reject();
            }
        });

        return deferred.promise();
    }

    var GetTimeOffset = function(){
        var deferred = $.Deferred();

        var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
        var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

        executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            method: "GET",
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/regionalsettings/timezone?@target='" + hostweburl + "'",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose"
            },
            success: function (data) {
                var jsonObject = JSON.parse(data.body);
                offset = jsonObject.d.Information.Bias;

                deferred.resolve();
            },
            error: function (data) {
                deferred.reject();
            }
        });

        return deferred.promise();
    }

    var ConvertToGetLocalTime = function (UTCdate) {

        var date = moment(UTCdate);

        if (date.utcOffset() > 0)
            date = date.subtract(offset, 'm');
        else
            date = date.add(((-1) * offset), 'm');

        return date.toISOString();
    }

    var ConvertToPostLocalTime = function (UTCdate) {

        var date = moment(UTCdate);

        if (date.utcOffset() > 0)
            date = date.add(offset, 'm');
        else
            date = date.subtract(((-1) * offset), 'm');

        return date.toISOString();
    }

    var SetCalendarWithEvent = function (array) {
        var jsonObject = JSON.parse(array);

        var arr = [];

        var results = jsonObject.d.results;
        for (var i = 0; i < results.length; i++) {

            arr.push({
                title: results[i].Title + " " + results[i].Location,
                start: ConvertToGetLocalTime(results[i].EventDate),
                end: ConvertToGetLocalTime(results[i].EndDate),
                color: results[i].Colour
            });
        }

        return arr;
    }

    return {
        Initialization:function(){
            GetTimeOffset();
        },
        Validation:function(){            

            var reservationList = MyApp.AppSPUtils.GetQueryStringParameter("CalendarList");
            var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("RoomList");

            $.when(ExistList(resourceList), ExistList(reservationList))
             .done(function () {

             })
             .fail(function () {
                 MyApp.AppSPUtils.RedirectApp("Install.aspx");
             });      
        },
        ValidReservation : function(subject,date,initHour,endHour,room)
        {
            var stringToReturn = "";

            if (subject == "") stringToReturn += MyApp.language["subjectneeded"] +"\n";
            if (date == "") stringToReturn += MyApp.language["dayneeded"] +"\n";
            if (initHour == "0") stringToReturn += MyApp.language["startneeded"] +"\n";
            if (endHour == "0") stringToReturn += MyApp.language["endneeded"] +"\n";
            if (room == "") stringToReturn += MyApp.language["roomneeded"] + "\n";

            return stringToReturn;
        },
        CreateList: function (returnID) {

            var reservationList = MyApp.AppSPUtils.GetQueryStringParameter("CalendarList");
            var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("RoomList");

            $.when(CreateList("106", "Calendar list to reservation", reservationList), CreateList("100", "Room available to reservation", resourceList))
             .done(function () {

                 $.when(CreateFieldList(reservationList, "Colour", "2"), CreateFieldResourceList(resourceList))
                  .done(function () {
                      $("#" + returnID).html(MyApp.language["successful"]);
                      $("#" + returnID).addClass("success");
                  })
                  .fail(function () {
                      $("#" + returnID).html(MyApp.language["errorfield"]);
                      $("#" + returnID).addClass("error");
                  });
             })
             .fail(function () {
                 $("#" + returnID).html(MyApp.language["errorlist"]);
                 $("#" + returnID).addClass("error");
             });
        },
        GetRooms: function (id) {

            var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("RoomList");

            var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
            var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

            executor = new SP.RequestExecutor(appweburl);

            executor.executeAsync({
                method: "GET",
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" + resourceList + "')/items?@target='" + hostweburl + "'",
                headers:{
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    LoadList(data,id)
                },
                error: function(data){
                }
            });
        },
        AddReservation: function (title, initdate, enddate, room, colour, id, success) {

            var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("CalendarList");

            var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
            var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

            initdate = ConvertToPostLocalTime(initdate);
            enddate = ConvertToPostLocalTime(enddate);

            executor = new SP.RequestExecutor(appweburl);

            executor.executeAsync({
                method: "POST",
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" + resourceList + "')/items?@target='" + hostweburl + "'",
                body: "{ '__metadata': { 'type': 'SP.Data." + resourceList + "ListItem' }, 'Title': '" + title + "', 'Location': '" + room + "', 'EventDate': '" + initdate + "', 'EndDate' : '" + enddate + "', 'Colour': '" + colour + "' }",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    $("#" + success).html(MyApp.language["done"]);
                    $("#" + success).addClass("success");
                    MyApp.RoomReservation.LoadCalendar(id);

                    setTimeout(function () { $("#" + success).html(""); }, 2000);
                    
                },
                error: function (data) {
                    $("#" + success).html(MyApp.language["fail"]);
                    $("#" + success).addClass("error");
                }
            });
        },
        GetAvailableRooms : function(initDate, endDate, id)
        {
            var reservationList = MyApp.AppSPUtils.GetQueryStringParameter("CalendarList");
            var resourceList = MyApp.AppSPUtils.GetQueryStringParameter("RoomList");

            var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
            var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

            executor = new SP.RequestExecutor(appweburl);

            executor.executeAsync({
                method: "GET",
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + reservationList + "')/items?$select=Location&$filter=(((EventDate le datetime'" + initDate + "') and (EndDate gt datetime'" + initDate + "')) or ((EventDate lt datetime'" + endDate + "') and (EndDate ge datetime'" + endDate + "')) or ((EventDate gt datetime'" + initDate + "') and (EndDate lt datetime'" + endDate + "')) or ((EventDate gt datetime'" + initDate + "') and (EndDate lt datetime'" + endDate + "')))&@target='" + hostweburl + "'",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    GetFreeRoom(data.body, id);
                },
                error: function (data) {
                }
            });
        },
        LoadCalendar: function (id) {

            var reservationList = MyApp.AppSPUtils.GetQueryStringParameter("CalendarList");

            var appweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPAppWebUrl");
            var hostweburl = MyApp.AppSPUtils.GetQueryStringParameter("SPHostUrl");

            executor = new SP.RequestExecutor(appweburl);

            executor.executeAsync({
                method: "GET",
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('" + reservationList + "')/items?@target='" + hostweburl + "'",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose"
                },
                success: function (data) {
                    $('#calendar').fullCalendar('removeEvents');
                    $('#calendar').fullCalendar('addEventSource', SetCalendarWithEvent(data.body));
                    $('#calendar').fullCalendar('rerenderEvents');
                },
                error: function (data) {
                }
            });
        }
    };
}();