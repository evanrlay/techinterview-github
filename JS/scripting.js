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
            $('#eventList').append("<p id = 'p" + num + "' class = 'moreInfo'> Time Created: " + field.created_at +"</p>");
        });
    });
    
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