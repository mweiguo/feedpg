//<![CDATA[
//var baseurl = 'http://localhost/feedpg/feedapi.php';
var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var urls = ['http://feeds.delicious.com/v2/rss/mweiguo/%E9%9F%B3%E4%B9%90?count=30'];
var playerlist = [];
var curidx = -1;

function onStateChangedOutter ( xhr ) {
    return function () {
	if ( xhr.readyState == 4 && (xhr.status == 200 ) ) {
	    eval ( "var t="+ xhr.responseText );
	    for ( var i=0; i<t.items.length; i++ ){
		playerlist.push ("player"+i);
		var div = document.createElement ("div");
		div.innerHTML = "<div><div><strong>" + t.items[i].title + "</strong></div><div>" + t.items[i].description + "</div>"
		    + '<object id="player' + i + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="400" height="50">'
		    + '<param name="movie" value="http://mweiguo.heliohost.org/sap.swf">'
		    + '<param name="FlashVars" value="id=player' + i + '&mp3path=' + t.items[i].link + '">'
		    + '<embed name="player' + i + '" src="http://mweiguo.heliohost.org/sap.swf" width="400" height="50" '
		    + 'FlashVars="id=player' + i + '&mp3path=' + t.items[i].link + '">'
		    + '</embed></object>';
		document.getElementById('output_content').appendChild ( div );
	    }
	}
    };
}

// all the code begin here
for ( var i=0; i<urls.length; i++ ) {
    var xmlhttp = getXmlHttpRequest();
    if ( xmlhttp ) {
	xmlhttp.onreadystatechange = onStateChangedOutter ( xmlhttp );
	xmlhttp.open ('get', baseurl + "?url=" + urlencode(urls[i]), true);
	xmlhttp.send ( null );
    }
}

function sap_loadioerror( id ) {
    alert ( "sap_loadioerror : " + id );
}

function sap_startplay( id ) {
//    alert ( "sap_startplay : " + id );
    if ( -1 != curidx ) {
	if ( playerlist[curidx] == id )
	    return;
    }
    var idx = indexof_array ( playerlist, id );
    if ( -1 == idx ) {
	idx = playerlist.length;
	playerlist.push ( id );
    }

    // stop current player
    if ( -1 != curidx )
	getFlash ( playerlist[curidx] ).toggle();
    curidx = idx;
}

function sap_loadtimeout( id ) {
    alert ( "sap_loadtimeout : " + id );
}

function sap_playover( id ) {
//    alert ( "sap_playover : " + id );
    curidx++;
    if ( curidx == playerlist.length )
	curidx = 0;

//    alert ( curidx );
    if ( -1 != curidx )
	getFlash ( playerlist[curidx] ).toggle();
}

//]]>