


// this will make the spacebar work with play/pause
$(window).keypress(function (e) {
	if (e.key === ' ' || e.key === 'Spacebar') {
		// ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
		e.preventDefault();
		togglePlaying();
	}
})

$(window).resize(function(){
	autoResizeVideo();		
});


/// VIDEO PLAYER CLASS

function VideoPlayer( id, fileURL ){
	var firstTime = true;
	var self = this;

	// our class variables
	this.id = id;
	this.video = null;
	this.$playButton = null;
	this.$pauseButton = null;
	this.$container = $('#'+id);
	this.subtitles = new Array();
	this.isScrubbing = false;
	this.startTime = 0;
	
	this.$container.addClass('vp-container');
	console.log("new container is: "+this.$container);
	
	this.$videocontainer = $('<div class="vp-video-container" ></div>');
	var $video = $('<video>\
			<source src="'+fileURL+'" type="video/mp4">\
		</video>');
		
	$gui = $('<div class="vp-videogui-container">\
			<div class="vp-videogui">\
				<div class="vp-videotext">\
					<span class="vp-titleplayer"></span><br/>\
					<span class="vp-subtitle"></span>\
				</div>\
				\
				<div class="vp-scrollbar">\
					<div class="vp-time">00:00</div>\
					<div class="vp-scrubber">\
						<div class="vp-background">\
							<div class="vp-cursor"></div>\
						</div>\
					</div>\
					<div class="vp-duration">00:00</div>\
				</div>\
				\
				<div class="vp-controls">\
					<div class="vp-control"></div>\
					<div class="vp-control">\
						<div class="vp-play vp-button"><img src="./media/images/play2.png" width="20" height="20"/></div>\
						<div class="vp-pause vp-button"><img src="./media/images/pause.png" width="20" height="20"/></div>\
					</div>\
					<div class="vp-control"></div>\
				</div>\
			</div>\
		</div>');
		
		
	this.$container.append(this.$videocontainer);
	this.$videocontainer.append($video);
	this.video = $video[0];
	this.$container.append($gui);
	this.$playButton = this.$container.find('.vp-play');
	this.$pauseButton = this.$container.find('.vp-pause');
	self.$videoTitle = this.$container.find('.vp-titleplayer');
	self.$cursor = this.$container.find('.vp-cursor');
	self.$scrubber = this.$container.find('.vp-videogui .vp-scrubber');
	self.$videotext = this.$container.find('.vp-videogui .vp-videotext .vp-subtitle');
	
	this.$playButton.click(function(){
		console.log("toggle video "+self.id);
		self.togglePlaying();
	});
	this.$pauseButton.click(function(){
		console.log("toggle video "+self.id);
		self.togglePlaying();
	});
	
	this.setTitle = function( newTitle){
		self.$videoTitle.html(newTitle);
	}
	this.printSubtitles = function(){
		for( var i = 0; i < self.subtitles.length; i++){
			console.log(i + " " +self.subtitles[i].time+" : "+self.subtitles[i].text);
		}
	}
	this.togglePlaying = function(){
		if (self.video.paused) {
			self.video.play();
			self.$playButton.hide();
			self.$pauseButton.show();
		}else{
			self.video.pause();
			self.$playButton.show();
			self.$pauseButton.hide();
			console.log('paused at '+self.video.currentTime);
		}
	}
	

	this.play = function(){
		self.video.play();
	}
	this.pause = function(){
		self.video.pause();
	}
	
	this.updateVideoText = function( seconds){
		var newText = '';
		for(var i = 0; i < self.subtitles.length; i++){
			if(self.subtitles[i].time <= seconds){
				newText = self.subtitles[i].text;
			}else{
				break;
			}
		}
		self.$videotext.html(newText);
	}
	
	// this function is called every time the video shows a new frame
	this.video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var percent = self.video.currentTime/ self.video.duration;
		var newPosition = percent*100; //$scrubber.
		
		self.$cursor.css('left', newPosition+'%');
		self.$container.find('.vp-videogui .vp-time').html(formatTime(self.video.currentTime));
		self.$container.find('.vp-videogui .vp-duration').html(formatTime(self.video.duration));
		self.updateVideoText(self.video.currentTime);
		
		
	});

	this.video.oncanplay = function() {
		console.log(self.id + " can start playing video and duration is "+ self.video.duration);
		var startTime = $(self.video).attr('starttime');
		if(startTime != undefined && firstTime){
			console.log("The requested start time is " + startTime);
			self.video.currentTime = parseInt(startTime);
			firstTime = false;
		}
	};
	
	// this function is called when you move the mouse over the scrubber
	this.$scrubber.click(function(event){
		var percent = (event.pageX - self.$scrubber.offset().left) / self.$scrubber.width();
		self.video.currentTime = percent * self.video.duration;
	});
	
	// this function is called when you press the mousebutton over the scrubber
	this.$scrubber.mousedown(function(event){
		self.isScrubbing = true;
		event.preventDefault();

	});
	// this function is called when you release a mousebutton over the scrubber
	$(window).mouseup(function(){
		self.isScrubbing = false;
	});
	// this function is called when you release a mousebutton over the scrubber
	
	// this function is called when you move the mouse over the scrubber
	$(window).mousemove(function(event){
		
		if(self.isScrubbing){
			var percent = (event.pageX - self.$scrubber.offset().left) / self.$scrubber.width();
			//console.log(percent);
			percent = Math.max(0, Math.min(1,percent));
			event.preventDefault();
			self.video.currentTime = percent * self.video.duration;
		}
	});
	
	
	this.updateVideoText(0);
}


////////

function autoResizeVideo(){
	var w = $(window).width();
	var h = $(window).height();
	var xscale = w / 1920;
	var yscale = h / 1080;
	var scale = 1;
	if( xscale > yscale){
		scale = xscale;
	}else{
		scale = yscale;
	}
	/*
	$('.vp-container').css({
		'width':w+'px', 
		'height':h+'px'
		});
	*/
	$('video').css({
		'width':(scale*1920)+'px', 
		'height':(scale*1080)+'px'
		});
	
	
}






$(function(){
	autoResizeVideo();	
});




// make our time value look pretty like this: 00:00
function formatTime( seconds){
	var isecs = Math.round(seconds);
	var minutes = Math.floor( isecs / 60);
	if(minutes < 10){
		minutes = '0'+minutes;
	}
	var isecs = Math.floor(isecs % 60);
	if(isecs < 10){
		isecs = '0'+isecs;
	}
	
	return ''+minutes+':'+isecs;
}