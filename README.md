# room-reservation

RoomReservation is a SharePoint Hosted Application created to allow a simple and friendly room reservation system. This app is really simple. You will need two list to work with it: A custom list where you are going to save the rooms and a calendar list where the reservations will be saved.

Firstly, after installing the app, automatically will be checked if both lists exist. If the answer is no, the app will redirect you to a page to create them, after that, you will be able to use RoomReservation correctly.

The first thing that you should do after creating the lists is to add all the rooms you want to put available to users. You can do this with the resources list created. You have to write: the room name, a short description about it, the capacity and finally you must to give the colour that you want to use to recognize these room in the calendar.

![alt tag](https://github.com/jcroav/room-reservation/blob/master/Images/AddingResources.png)

Finally, the app is really easy. While you complete the date and hour information for your reservation, available rooms will change to show you rooms that you can choose because they are free.

![alt tag](https://github.com/jcroav/room-reservation/blob/master/Images/Roomreservationapplication.png)

# Development skills

The main goal to create this app is to learn about the new SharePoint App Model. For this purpose, I decided only use API REST call to access to SharePoint Information.

I have tried to start using the new remote provisioning model to develop with SharePoint. To do this, lists and custom fields have been created from the object client model through API REST too.

# Next Steps

During the next weeks, I would like to follow with the development of this app. The main fields where I want to work are:

<ul>
<li>I will try to improve UX</li>
<li>I will try to improve the responsive desing</li>
<li>Show information about your reservations done</li>
</ul>

Please, if you want to improve or contribute with this app, feel enough confortable to modify and work with the code
