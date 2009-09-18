//<![CDATA[
//var baseurl = 'http://localhost/feedpg/feedapi.php';
var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var urls = ['http://feeds.delicious.com/v2/rss/mweiguo/%E9%9F%B3%E4%B9%90?count=15'];

function onStateChanged () {
    if ( this.readyState == 4 && this.status == 200 ) {
	eval ( "var t="+ this.responseText );
	for ( var i=0; i<t.items.length; i++ ){
	    var div = document.createElement ("div");
	    div.innerHTML = "<div><div><strong>" + t.items[i].title + "</strong></div><div>" + t.items[i].description + "</div>"
		+ '<embed width="290" height="40" src="http://www.u148.net/images/audio.swf?&amp;soundFile=' + t.items[i].link
		+ '&amp;playerID=75723&amp;loader=0x9FFFB8&amp;loop=no&amp;autostart=no" type="application/x-shockwave-flash" id="audioplayer75723"/>';
	    document.getElementById('output_content').appendChild ( div );
	}
    }
}

// all the code begin here
for ( var i=0; i<urls.length; i++ ) {
    var xmlhttp = getXmlHttpRequest();
    if ( xmlhttp ) {
	xmlhttp.open ('get', baseurl + "?url=" + urlencode(urls[i]), true);
	xmlhttp.onreadystatechange = onStateChanged;
	xmlhttp.send ( null );
    }
}
//]]>