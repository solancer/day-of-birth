function MWJ_findSelect( oName, oDoc ) { //get a reference to the select box using its name
	if( !oDoc ) { oDoc = window.document; }
	for( var x = 0; x < oDoc.forms.length; x++ ) { if( oDoc.forms[x][oName] ) { return oDoc.forms[x][oName]; } }
	for( var x = 0; document.layers && x < oDoc.layers.length; x++ ) { //scan layers ...
		var theOb = MWJ_findObj( oName, oDoc.layers[x].document ); if( theOb ) { return theOb; } }
	return null;
}
function dateChange( d, m, y ) {
	d = MWJ_findSelect( d ), m = MWJ_findSelect( m ), y = MWJ_findSelect( y );
	//work out if it is a leap year
	var IsLeap = parseInt( y.options[y.selectedIndex].value );
	IsLeap = !( IsLeap % 4 ) && ( ( IsLeap % 100 ) || !( IsLeap % 400 ) );
	//find the number of days in that month
	IsLeap = [31,(IsLeap?29:28),31,30,31,30,31,31,30,31,30,31][m.selectedIndex];
	//store the current day - reduce it if the new month does not have enough days
	var storedDate = ( d.selectedIndex > IsLeap - 1 ) ? ( IsLeap - 1 ) : d.selectedIndex;
	while( d.options.length ) { d.options[0] = null; } //empty days box then refill with correct number of days
	for( var x = 0; x < IsLeap; x++ ) { d.options[x] = new Option( x + 1, x + 1 ); }
	d.options[storedDate].selected = true; //select the number that was selected before
	if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+d.name+'\' ).options['+storedDate+'].selected = true;',0); }
}
function setToday( d, m, y ) {
	d = MWJ_findSelect( d ), m = MWJ_findSelect( m ), y = MWJ_findSelect( y );
	var now = new Date(); var nowY = ( now.getYear() % 100 ) + ( ( ( now.getYear() % 100 ) < 39 ) ? 2000 : 1900 );
	//if the relevant year exists in the box, select it
	for( var x = 0; x < y.options.length; x++ ) { if( y.options[x].value == '' + nowY + '' ) { y.options[x].selected = true; if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options['+x+'].selected = true;',0); } } }
	//select the correct month, redo the days list to get the correct number, then select the relevant day
	m.options[now.getMonth()].selected = true; dateChange( d.name, m.name, y.name ); d.options[now.getDate()-1].selected = true;
	if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+d.name+'\' ).options['+(now.getDate()-1)+'].selected = true;',0); }
}
function checkMore( y, curBot, curTop, min, max ) {
	var range = curTop - curBot;
	if( typeof( y.nowBot ) == 'undefined' ) { y.nowBot = curBot; y.nowTop = curTop; }
	if( y.options[y.selectedIndex].value == 'MWJ_DOWN' ) { //they have selected 'lower'
		while( y.options.length ) { y.options[0] = null; } //empty the select box
		y.nowBot -= range + 1; y.nowTop = range + y.nowBot; //make note of the start and end values
		//adjust the values as necessary if we will overstep the min value. If not, refill with the
		//new option for 'lower'
		if( min < y.nowBot ) { y.options[0] = new Option('Lower ...','MWJ_DOWN'); } else { y.nowBot = min; }
		for( var x = y.nowBot; x <= y.nowTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
		y.options[y.options.length] = new Option('Higher ...','MWJ_UP');
		y.options[y.options.length - 2].selected = true; //select the nearest number
		if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options['+(y.options.length - 2)+'].selected = true;',0); }
	} else if( y.options[y.selectedIndex].value == 'MWJ_UP' ) { //A/A except upwards
		while( y.options.length ) { y.options[0] = null; }
		y.nowTop += range + 1; y.nowBot = y.nowTop - range;
		y.options[0] = new Option('Lower ...','MWJ_DOWN');
		if( y.nowTop > max ) { y.nowTop = max; }
		for( var x = y.nowBot; x <= y.nowTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
		if( max > y.nowTop ) { y.options[y.options.length] = new Option('Higher ...','MWJ_UP'); }
		y.options[1].selected = true;
		if( window.opera && document.importNode ) { window.setTimeout('MWJ_findSelect( \''+y.name+'\' ).options[1].selected = true;',0); }
	}
}
function reFill( y, oBot, oTop, oDown, oUp ) {
	y = MWJ_findSelect( y ); y.nowBot = oBot; y.nowTop = oTop;
	//empty and refill the select box using the range of numbers specified
	while( y.options.length ) { y.options[0] = null; }
	if( oDown ) { y.options[0] = new Option('Lower ...','MWJ_DOWN'); }
	for( var x = oBot; x <= oTop; x++ ) { y.options[y.options.length] = new Option(x,x); }
	if( oUp ) { y.options[y.options.length] = new Option('Higher ...','MWJ_UP'); }
}



 $("#s2").on("change",dateChange('day','month','year'));
  $("#s1").on("change",dateChange('day','month','year'));
