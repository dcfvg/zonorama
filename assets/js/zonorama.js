jQuery(document).ready(function($) {
	console.log("start");
	

	var $container = $("#container");

	$( "#menu img" ).click(function() {

		var id = $( this ).attr("id");
		var scr = $( this ).attr("src");
		var num = $container.children().length;
		var cssId = id+'-'+num;

		$container.append('<div id="'+cssId+'"></div>');
		$container.find("#"+cssId )
			.addClass("zone")
			.css('background-image','url('+scr+')')
			.resizable({containment: "#container"})
			.draggable({
		  	drag: function( event, ui ) {
		  		$( this ).css('background-position', (-ui.position.left)+"px "+ (-ui.position.top+"px "));
		  	}
			})
			.hover(
			  function() {
			    $( this ).not( ".full" ).removeClass( "disable" );
			  }, function() {
			    $( this ).not( ".full" ).addClass( "disable" );
			  }
			);

	});
	// set manul fullscreen
	$( "body" ).keypress(function( event ) {
		console.log(event.which);
	  if ( event.which == 32 ) {
	    event.preventDefault();
			$(".zone").remove(".disable");
	    $(".zone").not( ".disable" ).addClass("full").resizable('destroy').draggable('destroy');
	  }
	});


});