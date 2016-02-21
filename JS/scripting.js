/**
 * @author evan lay
 */

$(document).ready(function() {
    $.getJSON("https://api.github.com/events", function(result){
        $.each(result, function(i, field){
            var num = ("0" + (i+1)).slice(-2);
            $("#eventList").append("<li id = 'li" + num + "'><p>" + num + ": " + field.actor.login + "<br>" + field.type + "<br>" +
            "<a href= '" + field.repo.url + "'>" + field.repo.url + "</a></p></li><br>");
            $('#li'+num).append("<p id = 'p" + num + "' class = 'moreInfo'> Time Created: " + field.created_at +"</p>");
        });
    });
    
     $(document).on('click', 'li', function () {;
        var num = this.id.substr(2,3);
        $('#p' + num).toggle();
    });
});

