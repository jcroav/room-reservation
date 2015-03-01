<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<WebPartPages:AllowFraming ID="AllowFraming1" runat="server" />

<link href="../Content/App.css" rel="stylesheet" />
<script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
<script type="text/javascript" src="/_layouts/15/sp.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.UI.Controls.js"></script>
<script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
<script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
<script src="../Scripts/Utils.js"></script>
<script src="../Scripts/RoomReservation.js"></script>

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
    <h1>Information Message</h1>

    <p>The Calendar and Resources lists don't exist.</p>

    <p>Do you want to create now?. Push "Create" Button</p>

    <button id="AddList">Create</button>

    <span id="Result"></span>

</div>

<script>
    $(document).ready(function () {

        MyApp.AppSPUtils.RenderAppNav("Room Reservation");

        $("#AddList").click(function () {
            var result = MyApp.RoomReservation.CreateList("Result");
        });
    })
</script>