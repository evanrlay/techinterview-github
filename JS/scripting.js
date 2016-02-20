/**
 * @author evan lay
 */
$(window).load(function() 
{
	$.getJSON("https://api.github.com/events", function(result){
        $.each(result, function(i, field){
            $("#eventList").append("<p>" + (i+1) + ": " + field.actor.login + "<br>" + field.type + "<br>" + field.repo.url + "<p>");
        });
    });
});

