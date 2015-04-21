jQuery(document).ready(function($) {

	function uptZone($this){

		console.log("update", $this.attr("name"));

		$.post('/api', {
			parent: {
				id 		: $this.prev().attr("id"),
				hash 	: $this.prev().attr("hash"),
				name 	: $this.prev().attr("name"),
				url 	: $this.prev().attr("url"),
				uri 	: $this.prev().attr("uri"),
			},
			zones : {

				id 		: $this.attr("id"),
				hash 	: $this.attr("hash"),
				name 	: $this.attr("name"),
				url 	: $this.attr("url"),
				uri 	: $this.prev().attr("uri"),

				top 	: $this.css('top'), 
				left 	: $this.css('top'),
				width : $this.width(),
				height: $this.height()
			}
		})
		.done(function( data ) {
			// console.log(data.data[0].q);
			console.log(data);
		});
	};
	
	var $slideshow = $("#slideshow");

	$( "#menu img" ).click(function() {
		var hash = $( this ).attr("hash");
		var scr = $( this ).attr("srcHD");
		var num = $slideshow.children().length;
		var cssId = hash+'-'+num;

		$('<div>', 
			{
				id    : cssId,
				hash 	: $( this ).attr("hash"),				
				name 	:	$( this ).attr("name"),
				url		: $( this ).attr("url"),
				uri		: $( this ).attr("uri")
			}
		)	
		.appendTo($slideshow)
		.addClass("zone")
		.css('background-image','url('+scr+')')
		.resizable({
			stop: function() {
				uptZone($(this));
			}
		})
		.draggable({
			drag: function( event, ui ) {
				$( this ).css('background-position', (-ui.position.left)+"px "+ (-ui.position.top+"px "));
			},
			stop: function() {
				uptZone($(this));
			}
		})
		.hover(
			function() { $( this ).not( ".full" ).removeClass( "disable" );}, 
			function() { $( this ).not( ".full" ).addClass( "disable" );}
		);
	});

	// set manual fullscreen
	$( "body" ).keypress(function( event ) {
		if ( event.which == 32 ) {
			event.preventDefault();
			$(".zone").remove(".disable");
			$(".zone").not( ".disable" ).addClass("full").resizable('destroy').draggable('destroy');
		}
	});
});