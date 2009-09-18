//<![CDATA[
var maps = new Object();
var finishedLoad = 0;
//var baseurl = 'http://localhost/feedpg/feedapi.php';
var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var urls = new Array('http://feeds.delicious.com/v2/rss/mweiguo/%E8%A5%BF%E5%AE%89%E7%AF%AE%E7%90%83%E5%9C%BA%E6%89%80?count=15'
		     , 'http://feeds.delicious.com/v2/rss/mweiguo/%E5%9C%B0%E5%9B%BE%E6%B5%8B%E8%AF%95?count=15');

function loadMap( n ) {
    if ( !maps.hasOwnProperty (n) ) {
	var tmp = [];
	finishedLoad = 0;
	for ( var i=0; i<maps["org_" + n].items.length; i++ ) {
	    var t = new GGeoXml ( maps["org_" + n].items[i].link );
	    tmp.push ( t );
	    map.addOverlay ( t );
	    GEvent.addListener ( t, 'load', function () {
				     map.setCenter ( this.getDefaultCenter(), map.getBoundsZoomLevel ( this.getDefaultBounds() ) );
				     finishedLoad ++;
				     if ( finishedLoad == maps["org_" + n].items.length)
					 setMapZoomLevel ( n );
				 });
	}
	maps[n] = tmp;
    } else {
	for ( var i=0; i<maps[n].length; i++ ) {
	    if ( maps[n][i].isHidden() ) 
		maps[n][i].show();
	}
	setMapZoomLevel ( n );
    }

    // set zoom level
    document.getElementById ( 'cb'+n ).checked = true;
}

function setMapZoomLevel ( n ) {
    var nb = null;
    for ( var i=0; i<maps[n].length; i++ ) {
	var t = maps[n][i].getDefaultBounds();
	if ( null == nb )
	    nb = t;
	nb.extend ( t.getSouthWest() );
	nb.extend ( t.getNorthEast() );
    }
    map.setCenter ( nb.getCenter(), map.getBoundsZoomLevel ( nb )-1 );
    
}

function outter( title) {
    function inner () {
	if ( this.checked ) {
	    if ( maps.hasOwnProperty(title) ) {
		for ( var i=0; i<maps[title].length; i++)
		    if ( maps[title][i].isHidden() )
			maps[title][i].show();
	    } else {
		loadMap ( title );
	    }
	} else {
	    for ( var i=0; i<maps[title].length; i++ )
		if ( !maps[title][i].isHidden() )
		    maps[title][i].hide();
	}
    }
    return inner;
}

function onStateChangedOutter ( xhr ) {
    return function () {
	if ( this.readyState == 4 && this.status == 200 ) {
	    //alert ( 'onStateChanged' );
	    eval ( "var t="+ this.responseText );
	    t.title = t.title.substring ( t.title.lastIndexOf ( "/" )+1 );
	    var div = document.createElement ("div");
	    div.innerHTML = "<input type='checkbox' id='cb" + t.title + "'/>" 
		+ "<a href=\"javascript:loadMap('" + t.title + "')\";>" + t.title + "</a>";
	    document.getElementById('output_content').appendChild ( div );
	    GEvent.addDomListener ( document.getElementById ( 'cb'+ t.title ), 'click', outter ( t.title ) );
	    maps["org_" + t.title] = t;
	}
    };
}

// load map
var map = new GMap2(document.getElementById('map_canvas'));
map.setCenter  ( new GLatLng(34.2586, 108.891), 11 );
map.addControl ( new GSmallZoomControl3D());
map.addControl ( new GScaleControl());
map.addControl ( new GMenuMapTypeControl());

// all the code begin here
for ( var i=0; i<urls.length; i++ ) {
    var xmlhttp = getXmlHttpRequest();
    if ( xmlhttp ) {
	xmlhttp.open ('get', baseurl + "?url=" + urlencode(urls[i]), true);
	xmlhttp.onreadystatechange = onStateChangedOutter ( xmlhttp );
	xmlhttp.send (null);
    }
}
//]]>
