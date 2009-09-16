//<![CDATA[
var url = urlencode ('http://feeds.delicious.com/v2/rss/mweiguo/%E9%9F%B3%E4%B9%90?count=15');
getXmlHttpRequest();
xmlhttp.open ('get', 'http://localhost/musicFeedViewer/feedapi.php?url='+url, true);
xmlhttp.onreadystatechange = function () {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
	eval ( "var t="+ xmlhttp.responseText );
	var str = "";
	for ( var i=0; i<t.length; i++ ){
	    str += "<div><div><strong>" + t[i].title + "</strong></div>";
	    //		str += "<div>" + (new Date.parse (t[i].pubDate)).toString('yyyy,MMMM,d, dddd') + "</div>";
	    str += "<div>" + t[i].description + "</div>";
	    str += '<embed width="290" height="40" src="http://www.u148.net/images/audio.swf?&amp;soundFile=' + t[i].link
		+ '&amp;playerID=75723&amp;loader=0x9FFFB8&amp;loop=no&amp;autostart=no" type="application/x-shockwave-flash" id="audioplayer75723"/>';
	}
	document.getElementById('music_content').innerHTML = str;

    }
}
xmlhttp.send (null);
//]]>