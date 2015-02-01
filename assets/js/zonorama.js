jQuery(document).ready(function($) {

	var $slideshow = $("#slideshow");

	$( "#menu img" ).click(function() {
		var id = $( this ).attr("id");
		var scr = $( this ).attr("src");
		var num = $slideshow.children().length;
		var cssId = id+'-'+num;

		$slideshow.append('<div id="'+cssId+'"></div>');
		$slideshow.find("#"+cssId )
			.addClass("zone")
			.css('background-image','url('+scr+')')
			.resizable()
			.draggable({
		  	drag: function( event, ui ) {
		  		$( this ).css('background-position', (-ui.position.left)+"px "+ (-ui.position.top+"px "));
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