<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<WebPartPages:AllowFraming ID="AllowFraming1" runat="server" />

<meta http-equiv="X-UA-Compatible" content="IE=9" />

<link href="../Content/jquery-ui.min.css" rel="stylesheet" />
<link href="../Content/fullcalendar.css" rel="stylesheet" />
<link href="../Content/App.css" rel="stylesheet" />
<link href="../Content/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css">

<script type="text/javascript" src="//ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
<script src="../Scripts/lib/moment.min.js"></script>
<script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
<script src="../Scripts/jquery-ui-1.10.4.custom.min.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.Runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.UI.Controls.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
<script src="../Scripts/fullcalendar.min.js"></script>
<script src="../Scripts/lang-all.js"></script>
<script src="../Scripts/Utils.js"></script>
<script src="../Scripts/RoomReservation.js"></script>
<script src="../Scripts/App.js"></script>


<style>

	body {
		padding: 0;
		font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
		font-size: 14px;
	}

	#calendar {
		max-width: 900px;
		margin: 0 auto;
	}

</style>

<div id="chrome_ctrl_placeholder"></div>

<div class="body-element">
    <div class="container col-sm-6 reservation-box">
        <div class="form-group col-sm-12">
            <label for="reservationInformation" class="col-sm-4 control-label" data-language="reservationinformation">Reservation Information</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="reservationInformation" data-language="setreservationinformation" placeholder="Give us the subject of your booking">
            </div>
        </div>
        <div class="form-group col-sm-12">
            <label for="reservationDay" class="col-sm-4 control-label" data-language="reservationday">Reservation Day:</label>
            <div class="col-sm-8">
                <input type="datetime" class="form-control" id="reservationDay" data-language="setreservationday" placeholder="Set the reservation day here!">
            </div>
        </div>
        <div class="form-group col-sm-12">
            <label for="startHour" class="col-sm-4 control-label" data-language="starthour">Start Hour:</label>
            <div class="col-sm-8">
                <select id="startHour" class="form-control">
                    <option value="0" data-language="selectstarthour">- Select the start hour -</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-12">
            <label for="endHour" class="col-sm-4 control-label" data-language="endhour">End Hour:</label>
            <div class="col-sm-8">
                <select id="endHour" class="form-control">
                    <option value="0" data-language="selectendhour">- Select the end hour -</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                </select>
            </div>
        </div>
        <div class="form-group col-sm-12">
            <label for="allDayOption" class="col-sm-4 control-label" data-language="alldayreservation">All Day Reservation</label>
            <input type="checkbox" id="allDayOption" aria-label="...">
        </div>
        <div class="row col-sm-12">
            <label for="roomAvailable" class="col-sm-12 control-label room-reservation-label-title" data-language="roomsavailable">Rooms Available</label>
        </div>
        <div class="row  col-sm-12">
            <ul id="Rooms" class="room-list"></ul>
            <span id="roomSelected" class="col-sm-12 control-label room-reservation-label" data-language="nonselected">Room Selected: -None-</span>
            <input type="hidden" id="titleRoomSelected" />
            <input type="hidden" id="colourRoomSelected" />
        </div>
        <div class="row  col-sm-12">
            <button id="doReservation" class="btn btn-info room-reservation-button" data-language="doreservation">Do Reservation!</button>
        </div>
        <div class="row  col-sm-12">
           <span id="informationResult" class="col-sm-12 room-reservation-label"></span>
        </div>
    </div>


    <div class="container col-sm-6">
        <div id="calendar"></div>
    </div>

</div>
