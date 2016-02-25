/**
 * @author evan lay
 */


/*Retrieve data from https://api.github.com/events and display it in list format
Get information for moreInfo portion of html*/
$(document).ready(function() {
    $.getJSON("https://api.github.com/events", function(result){
        $.each(result, function(i, field){
           //Displayed info for each event
            var num = ("0" + (i+1)).slice(-2);
            var arr = field.repo.url.split("/");
            $("#eventList").append("<li id = 'li" + num + "'><img src = '" + field.actor.avatar_url + "' alt = User Avatar'><p>" + "User: " + 
            field.actor.login + "<br>Event: " + field.type + "<br>" + "Repo: " + "<a href= '" + field.repo.url + "'>" + arr[4] + "</a></p></li>");
           
           //Additional info for expanded area 
            var info = "";
            var added = false;
            if(field.payload.commits != undefined){
                if(field.payload.commits[0] != undefined)
                {
                    var added = true;
                    info += ('Message on commit: ' + field.payload.commits[0].message + '<br>');
                }
            }
            
             if(field.payload.comment != undefined){
                var added = true;
                info += ('Comment: ' + field.payload.comment.body + '<br>');
            }
            
             if(field.payload.description != undefined){
                var added = true;
                info += ('Event Description: ' + field.payload.description + '<br>');
            }   
            
            if(field.payload.issue != undefined){
                var added = true;
                info += ('Issue: ' + field.payload.issue.title  + '<br>');
            }
            
            if(added == false){
                info = 'For more information about this event, click the repo URL.'
            }
            
            var date = new Date(field.created_at);
            $('#eventList').append("<p id = 'p" + num + "' class = 'moreInfo'> Time Created: " + date + '<br>' + info + "</p>");
        
        });
    });
    
});

//refresh button
$(document).on("click", "button", function(){
    location.reload(true);
});

//prevent tap feature while scrolling
var dragging = false;

$("body").on("touchmove", function(){
 dragging = true;
});

$("body").on("touchstart", function(){
dragging = false;
});


//use touch event for devices, click event for desktops
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     $(document).on('touchend', 'li', function () {
        if (dragging)
         return;
        var num = this.id.substr(2,3);
        $('#p' + num).slideToggle(400);
    });
}
else
{
    $(document).on('click', 'li', function () {
    var num = this.id.substr(2,3);
    $('#p' + num).slideToggle(500);
    });
}