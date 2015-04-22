<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: true
files:
	sortable: true
	fields:
		caption:
			label: caption
			type:  text
		year:
			label: Année
			type: date
			format: YYYY
			width: 1/2
			default: today
		zones:
			label: Zones (ne pas modifier)
			type: text
			width: 1/2
fields:
	title:
		label: Titre
		type:  text
		width: 1/2
	text:
		label: Description
		type:  textarea
		width: 1/2
		placeholder: Facultatif