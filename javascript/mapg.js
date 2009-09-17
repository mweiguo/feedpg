//<![CDATA[
var maps = new Object();
function loadMap( n, l ) {
    if ( !maps.hasOwnProperty (n) ) {
	maps[n] = new GGeoXml ( l );
	map.addOverlay (maps[n]);
	GEvent.addListener ( maps[n], 'load', function () {
				 map.setCenter ( this.getDefaultCenter(), map.getBoundsZoomLevel ( this.getDefaultBounds() ) );
			     });
    } else 
	map.setCenter ( maps[n].getDefaultCenter(), map.getBoundsZoomLevel ( maps[n].getDefaultBounds() ) );

    document.getElementById ( 'cb'+n ).checked = true;

}


var baseurl = 'http://localhost/feedpg/feedapi.php';
//var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var url = urlencode ('http://feeds.delicious.com/v2/rss/mweiguo/%E5%9C%B0%E5%9B%BE%E6%B5%8B%E8%AF%95?count=15');
url = baseurl + "?url=" + url;

var xmlhttp = false;
getXmlHttpRequest();
function outter( title, link ) {
    function inner ( ) {
	if ( this.checked ) {
	    if ( maps.hasOwnProperty(title) ) {
		if ( maps[title].isHidden() ) maps[title].show();
	    } else {
		loadMap ( title, link );
	    }
	} else {
	    if ( !maps[title].isHidden() ) maps[title].hide();
	}
    }
    return inner;
}

xmlhttp.onreadystatechange = function () {

    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
	eval ( "var t="+ xmlhttp.responseText );
	var str = "";
	for ( var i=0; i<t.length; i++ ){
	    str += "<div><div><input type='checkbox' id='cb" + t[i].title + "'/><a href=\"javascript:loadMap('" + 
		t[i].title + "','"+ t[i].link + "')\">" + t[i].title + "</a></div>";
	    str += "<div>" + t[i].description + "</div>";
	}
	document.getElementById('output_content').innerHTML += str;

	for ( i=0; i<t.length; i++ )
	    document.getElementById ( 'cb'+ t[i].title ).onclick = outter ( t[i].title, t[i].link );
    }
}

xmlhttp.open ('get', url, true);
xmlhttp.send (null);
var map = new GMap2(document.getElementById('map_canvas'));
map.setCenter  ( new GLatLng(34.2586, 108.891), 11 );
map.addControl ( new GSmallZoomControl3D());
map.addControl ( new GScaleControl());
map.addControl ( new GMenuMapTypeControl());

//]]>
