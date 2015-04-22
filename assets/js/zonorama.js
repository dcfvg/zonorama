jQuery(document).ready(function($) {

	function uptZones($this){

		console.log("update", $this.attr("name"));

		var image  = $(".full").last();
		console.log(image);
		var parent = {
			id 		: image.attr("id"),
			hash 	: image.attr("hash"),
			name 	: image.attr("name"),
			src 	: image.attr("src"),
			url 	: image.attr("url"),
			uri 	: image.attr("uri")
		}
		var zones = [];
		$.each($(".zone").not( ".full" ), function() {

			var zone = {
				id 		: $(this).attr("id"),
				hash 	: $(this).attr("hash"),
				name 	: $(this).attr("name"),
				url 	: $(this).attr("url"),
				src 	: $(this).attr("src"),
				uri 	: $(this).prev().attr("uri"),

				top 	: $(this).css('top'), 
				left 	: $(this).css('left'),
				width : $(this).width(),
				height: $(this).height()
			}
			zones.push(zone);

		});
		$.post('/api', 
			{	op : "writeZones",
				q :
				{
					parent: parent,
					zones : zones
				}
			}
		)
		.done(function( data ) {
			//console.log(data.data[0].q);
			console.log(data);
		});
	};
	function addZones($this){

		console.log($this);
		// ask for zones 
		$.post('/api', 
			{	op : "getZones",
				q : {
					parent: {
						id 		: $this.attr("id"),
						hash 	: $this.attr("hash"),
						name 	: $this.attr("name"),
						url 	: $this.attr("url"),
						uri 	: $this.attr("uri"),
					}
				}
			}
		)
		.done(function( data ) {
			$.each(data, function() {

				var num = $slideshow.children().length;
				var cssId = this.hash+'-'+num;
				// create zones
				$('<div>', 
					{
						hash 	: this.hash,				
						name 	:	this.name,
						url		: this.url,
						uri		: this.uri,
						src   : this.src,
						id    : cssId
					}
				)
				.addClass("zone disable")
				.css('background-image','url('+this.src+')')
				.css('position', 'absolute')
				.css('width', this.width)
				.css('height', this.height)
				.css('top', this.top)
				.css('left', this.left)
				.appendTo($slideshow)
				.hover(
					function() { $( this ).not( ".full" ).removeClass( "disable" );}, 
					function() { $( this ).not( ".full" ).addClass( "disable" );}
				);
				
				$(".user #"+cssId) // NOT SAFE		
				.resizable({
					stop: function() {
						uptZones($(this));
					}
				})
				.draggable({
					stop: function() {
						uptZones($(this));
					}
				})

				$("body:not(.user) #"+cssId).click(function() {
					nextImage();
				}) 

			});
		});
	};

	function setEditMode(){
		$( "#menu img" ).click(function() {

			var hash = $( this ).attr("hash");
			var src = $( this ).attr("srcHD");
			var num = $slideshow.children().length;
			var cssId = hash+'-'+num;

			$('<div>', 
				{
					id    : cssId,
					hash 	: $( this ).attr("hash"),				
					name 	:	$( this ).attr("name"),
					url		: $( this ).attr("url"),
					uri		: $( this ).attr("uri"),
					src		: src
				}
			)	
			.appendTo($slideshow)
			.addClass("zone")
			.css('background-image','url('+src+')')
			.resizable({
				stop: function() {
					uptZones($(this));
				}
			})
			.draggable({
				stop: function() {
					uptZones($(this));
				}
			})
			.hover(
				function() { $( this ).not( ".full" ).removeClass( "disable" );}, 
				function() { $( this ).not( ".full" ).addClass( "disable" );}
			);
		});
	};

	function nextImage(){

			$(".disable").remove();
			$(".zone").addClass("full")
			$(".ui-resizable").resizable('destroy').draggable('destroy');
			setTimeout(function() {
				addZones($(".full").last());
			}, 500);
	}

	$.each($("body").not( ".user" ).find(".parent"), function() {
		addZones($(this));
	})

	var $slideshow = $("#slideshow");
	setEditMode();

	// next image
	$( "body" ).keypress(function( event ) {
		if ( event.which == 32 ) {
			event.preventDefault();
			nextImage();
		}
	});
});