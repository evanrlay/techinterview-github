/**
 * @author evan lay
 */

$(document).ready(function() {
    $.getJSON("https://api.github.com/events", function(result){
        $.each(result, function(i, field){
            var num = ("0" + (i+1)).slice(-2);
            var arr = field.repo.url.split("/");
            console.log(arr.toString());
            $("#eventList").append("<li id = 'li" + num + "'><p>" + num + ": " + field.actor.login + "<br>" + field.type + "<br>" +
            "Repo: " + "<a href= '" + field.repo.url + "'>" + arr[4] + "</a></p></li><br>");
            $('#li'+num).append("<p div data-role='collapsible' id = 'p" + num + "' class = 'moreInfo'> Time Created: " + field.created_at +"</p>");
        });
    });
    
     $(document).on('click', 'li', function () {;
        var num = this.id.substr(2,3);
        $('#p' + num).toggle();
    });
    
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
     $(document).on('touchend', 'li', function () {;
        var num = this.id.substr(2,3);
        $('#p' + num).toggle();
    });
     }
});

