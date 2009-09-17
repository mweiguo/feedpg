//<![CDATA[
var baseurl = 'http://localhost/feedpg/feedapi.php';
//var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var url = urlencode ('http://feeds.delicious.com/v2/rss/mweiguo/%E9%9F%B3%E4%B9%90?count=15');
url = baseurl + "?url=" + url;

var xmlhttp = false;
getXmlHttpRequest();
xmlhttp.onreadystatechange = function () {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
	alert ( xmlhttp.responseText );
	eval ( "var t="+ xmlhttp.responseText );
	var str = "";
	for ( var i=0; i<t.length; i++ ){
	    str += "<div><div><strong>" + t[i].title + "</strong></div>";
	    //		str += "<div>" + (new Date.parse (t[i].pubDate)).toString('yyyy,MMMM,d, dddd') + "</div>";
	    str += "<div>" + t[i].description + "</div>";
	    str += '<embed width="290" height="40" src="http://www.u148.net/images/audio.swf?&amp;soundFile=' + t[i].link
		+ '&amp;playerID=75723&amp;loader=0x9FFFB8&amp;loop=no&amp;autostart=no" type="application/x-shockwave-flash" id="audioplayer75723"/>';
	}
	document.getElementById('output_content').innerHTML += str;

    }
}

xmlhttp.open ('get', url, true);
xmlhttp.send (null);
//]]>