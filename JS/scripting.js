/**
 * @author evan lay
 */

$(document).ready(function() {
    $.getJSON("https://api.github.com/events", function(result){
        $.each(result, function(i, field){
            var num = ("0" + (i+1)).slice(-2);
            var arr = field.repo.url.split("/");
            $("#eventList").append("<li id = 'li" + num + "'><img src = '" + field.actor.avatar_url + "' alt = User Avatar'><p>" + "User: " + 
            field.actor.login + "<br>Event: " + field.type + "<br>" + "Repo: " + "<a href= '" + field.repo.url + "'>" + arr[4] + "</a></p></li>");
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

$(document).on("click", "button", function(){
    location.reload(true);
});

var dragging = false;

$("body").on("touchmove", function(){
 dragging = true;
});

$("body").on("touchstart", function(){
dragging = false;
});

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