'use strict';

MyApp.RoomReservation.Validation();

// Este código se ejecuta cuando el DOM está preparado y crea un objeto de contexto necesario para poder usar el modelo de objetos de SharePoint
$(document).ready(function () {

    $.when(MyApp.AppSPUtils.RenderLanguage())
    .done(function () {
        MyApp.AppSPUtils.RenderAppNav(MyApp.language['appname']);

        MyApp.RoomReservation.Initialization();
        MyApp.RoomReservation.GetRooms("Rooms");

        $(".body-element").css("display", "block");

        $("#calendar").fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            lang: MyApp.language['fullcalendarlang'],
            editable: false,
            firstDay: 1,
            weekNumbers: true,
            eventLimit: true
        });

        MyApp.RoomReservation.LoadCalendar("calendar");

        $("#reservationDay").datepicker({
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            minDate: 0,
            monthNames: [MyApp.language["January"], MyApp.language["February"], MyApp.language["March"], MyApp.language["April"], MyApp.language["May"], MyApp.language["June"], MyApp.language["July"], MyApp.language["August"], MyApp.language["September"], MyApp.language["October"], MyApp.language["November"], MyApp.language["December"]],
            dayNamesMin: [MyApp.language["Su"], MyApp.language["Mo"], MyApp.language["Tu"], MyApp.language["We"], MyApp.language["Th"], MyApp.language["Fr"], MyApp.language["Sa"]],
            beforeShowDay: $.datepicker.noWeekends,
            onSelect: function () {
                var initHour = $("#startHour").val();
                var endHour = $("#endHour").val();

                if (initHour == "0")
                    initHour = "09:00";

                if (endHour == "0")
                    endHour = "09:00";

                var initDate = $(this).val().split('/').reverse().join('-') + "T" + initHour + ":00";
                var endDate = $(this).val().split('/').reverse().join('-') + "T" + endHour + ":00";

                MyApp.RoomReservation.GetAvailableRooms(initDate, endDate, "Rooms");
            }
        });
    })
    
    $("#doReservation").click(function () {

        var subject = $("#reservationInformation").val();
        var room = $("#titleRoomSelected").val();
        var date = $("#reservationDay").val();
        var initHour = $("#startHour").val();
        var endHour = $("#endHour").val();
        var colour = $("#colourRoomSelected").val();

        var result = MyApp.RoomReservation.ValidReservation(subject,date,initHour,endHour,room);

        if (result == "")
        {
            var initDate = date.split('/').reverse().join('-') + "T" + initHour + ":00Z";
            var endDate = date.split('/').reverse().join('-') + "T" + endHour + ":00Z";

            MyApp.RoomReservation.AddReservation(subject, initDate, endDate, room, colour, "calendar", "informationResult");

            $("#reservationInformation").val("");
            $("#titleRoomSelected").val("");
            $("#reservationDay").val("");
            $("#startHour").val("0");
            $("#endHour").val("0");
            $("#colourRoomSelected").val("");
            $("#roomSelected").html("Room Selected: -None-")
            $("li.room").removeClass("selected");
        }
        else
            alert(result);

    });

    $("#startHour").change(function () {

        var date = $("#reservationDay").val();

        if (date != "") {
            var initHour = $(this).val();
            var endHour = $("#endHour").val();

            if (initHour == "0")
                initHour = "09:00";

            if (endHour == "0")
                endHour = "21:00";

            var initDate = date.split('/').reverse().join('-') + "T" + initHour + ":00";
            var endDate = date.split('/').reverse().join('-') + "T" + endHour + ":00";

            MyApp.RoomReservation.GetAvailableRooms(initDate, endDate, "Rooms");
        }

    })

    $("#endHour").change(function () {

        var date = $("#reservationDay").val();

        if (date != "") {
            var initHour = $("#startHour").val();
            var endHour = $(this).val();

            if (initHour == "0")
                initHour = "09:00";

            if (endHour == "0")
                endHour = "21:00";

            var initDate = date.split('/').reverse().join('-') + "T" + initHour + ":00";
            var endDate = date.split('/').reverse().join('-') + "T" + endHour + ":00";

            MyApp.RoomReservation.GetAvailableRooms(initDate, endDate, "Rooms");
        }
    })

    $("#allDayOption").click(function () {
        
        var date = $("#reservationDay").val();

            var date = $("#reservationDay").val();
            var initDate = date.split('/').reverse().join('-');
            var endDate = date.split('/').reverse().join('-');

            if ($(this).is(':checked')) {

                $("#startHour").val("09:00");
                $("#endHour").val("21:00");

                $("#startHour").attr("disabled", "disabled");
                $("#endHour").attr("disabled", "disabled");

                if (date != "") {
                    initDate = initDate + "T09:00:00";
                    endDate = endDate + "T21:00:00";

                    MyApp.RoomReservation.GetAvailableRooms(initDate, endDate, "Rooms");
                }
            }
            else
            {
                $("#startHour").val("0");
                $("#endHour").val("0");

                $("#startHour").removeAttr("disabled");
                $("#endHour").removeAttr("disabled");


                if (date != "") {
                    initDate = initDate + "T09:00:00";
                    endDate = endDate + "T09:00:00";


                    MyApp.RoomReservation.GetAvailableRooms(initDate, endDate, "Rooms");
                }
            }
    });

    $("ul").on("click", "li.room", function () {

        $("li.room").removeClass("selected");
        $(this).addClass("selected");

        $("#roomSelected").html(MyApp.language["selected"] + ": " + $(this).attr("content"));
        $("#titleRoomSelected").val($(this).attr("content"));
        $("#colourRoomSelected").val($("#colour" + $(this).attr("id")).val());
    })
});



