
$(function() {
	// the page and all of its elements has completely loaded
	$('#startbutton').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#chapter-one');
	});

	$('#gobutton-one').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#player-one');
	});
	
	$('#chapitresuivant2').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#chapter-two');
	});

	$('#gobutton-two').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#player-two');
	});
		
	$('#chapitresuivant3').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#chapter-trois');
	});

	$('#gobutton-trois').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#player-trois');
	});

	$('#gobutton-four').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#player-four');
	});

	$('#chapitresuivant4').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#chapter-four');
	});


	$('#chapitresuivant5').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#player-five');
	});

	$('#chapitresuivant6').click(function(){
		$(this).css('opacity', '1'); 
		scrollToID('#chapter-five');
	});

	// this will select the correct video player and set it to the correct time AS DISPLAYED IN THE URL
	var url = window.location.href; // here we get the URL
	var time = parseInt(getParameterByName('time', url)); // get the time value from the URL
	var playernameis = getParameterByName('player', url); // get the player ID from the URL
	console.log('dis moi tout url= ' + url + "\n player name =" + playernameis + " time=" + time ); // display everything

	// we have the ID, we have the time, we KNOW the page is loaded
	// now set the player to the right time
	var $selectedVideoPlayer = $('#'+playernameis+' video');
	if(time != NaN){
		$selectedVideoPlayer.attr('starttime', time);
	}


});


function getParameterByName(name, url, time) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



// this function scrolls to an element with an id
function scrollToID(myID) {
	
	var myElement = $(myID);
	var position = myElement.offset().top;
	var currentScroll = $(window).scrollTop();
	console.log("Current scroll is "+currentScroll);
	var distance = Math.abs(position - currentScroll);
	var scrollTime = distance * 2.5;

	$('html,body').animate({
	    scrollTop: position
	  }, scrollTime);
	
	
}