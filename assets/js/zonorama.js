jQuery(document).ready(function($) {

	function uptZones($this){ // write new zones map into caption file

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
	function getZones($this){ // get zones from caption file

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
				var zone = this;
				createZone(zone);
			});
		});
	};
	function createZone(zone){
		var num = $slideshow.children().length;
		var cssId = zone.hash+'-'+num;
		// create zones
		$('<div>', 
			{
				hash 	: zone.hash,				
				name 	:	zone.name,
				url		: zone.url,
				uri		: zone.uri,
				src   : zone.src,
				id    : cssId
			}
		)
		.addClass("zone disable")
		.css('background-image','url('+zone.src+')')
		.css('position', 'absolute')
		.css('width', zone.width)
		.css('height', zone.height)
		.css('top', zone.top)
		.css('left', zone.left)
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
	}
	function setEditMode(){ // enable editor tools
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
	function nextImage(){ // go to the next image
		$(".disable").remove();
		$(".zone").addClass("full")
		$(".ui-resizable").resizable('destroy').draggable('destroy');
		setTimeout(function() {
			getZones($(".full").last());
		}, 500);
	};

	function genGraphviz(){
		console.log("// gen-graph");

		var links = "";

		$.each($( "#menu img" ), function() {
				var $this = $(this);

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
						var zone = this;
						
						links = links + '"' + $this.attr("name") + '" [image="' + $this.attr("name") + '", label=""]; '
						links = links + '"' + $this.attr("name") + '"->"' + zone.name + '";	';

					});
				});
		});

		setTimeout(function(){
		console.log('digraph { label="\n\n'+ $("h4").text()+'";rankdir = "BT"; node[style="", shape="none", color=royalblue]; edge[color=royalblue]; layout=dot; size="33.1,46.8" '+links+'}');

		}, 3000);


	};
	function init() {
		// get zone for the current image on page load
		$.each($("body").not( ".user" ).find(".parent"), function() {
			getZones($(this));
		});
		// setup editor bar
		setEditMode();
		// genGraphviz();
	}

	var $slideshow = $("#slideshow");
	init();

	// next image
	$( "body" ).keypress(function( event ) {

		// console.log(event.which);
		if ( event.which == 32 ) { // space is for next image
			event.preventDefault();
			nextImage();
		}
		if ( event.which == 103 ) { // g is for dot/graphiz
			event.preventDefault();
			genGraphviz();
		}
	});
});