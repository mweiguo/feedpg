//<![CDATA[
var baseurl = 'http://localhost/feedpg/feedapi.php';
//var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var url = urlencode ('http://api.flickr.com/services/feeds/photos_faves.gne?nsid=35332246@N07&lang=en-us&format=rss_200');
url = baseurl + "?url=" + url;

var xmlhttp = false;
getXmlHttpRequest();
xmlhttp.onreadystatechange = function () {
    if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
	eval ( "var t="+ xmlhttp.responseText );
	var str = "";
	for ( var i=0; i<t.length; i++ ){
	    str += "<div><div><a href="+ t[i].link + ">" + t[i].title + "</a></div>";
	    str += "<div>" + t[i].description + "</div>";
	}
	document.getElementById('output_content').innerHTML += str;
    }
}

xmlhttp.open ('get', url, true);
xmlhttp.send (null);
//]]>
