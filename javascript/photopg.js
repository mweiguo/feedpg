//<![CDATA[
var url = urlencode ('http://api.flickr.com/services/feeds/photos_faves.gne?nsid=35332246@N07&lang=en-us&format=rss_200');
getXmlHttpRequest();
xmlhttp.open ('get', 'http://localhost/feedpg/feedapi.php?url='+url, true);
xmlhttp.onreadystatechange = function () {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
	alert ( xmlhttp.responseText );
	eval ( "var t="+ xmlhttp.responseText );
	var str = "";
	for ( var i=0; i<t.length; i++ ){
	    str += "<div><div><a href="+ t[i].link + ">" + t[i].title + "</a></div>";
	    str += "<div>" + t[i].description + "</div>";
	}
	document.getElementById('photo_content').innerHTML = str;

    }
}
xmlhttp.send (null);
//]]>