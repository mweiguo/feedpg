//<![CDATA[
//var baseurl = 'http://localhost/feedpg/feedapi.php';
var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var urls = ['http://api.flickr.com/services/feeds/photos_faves.gne?nsid=35332246@N07&lang=en-us&format=rss_200'];

function onStateChanged () {
    if ( this.readyState == 4 && this.status == 200 ) {
	eval ( "var t="+ this.responseText );
	for ( var i=0; i<t.items.length; i++ ){
	    var div = document.createElement("div");
	    div.innerHTML = "<div><a href="+ t.items[i].link + ">" + t.items[i].title + "</a></div>"
		+ "<div>" + t.items[i].description + "</div>";
	    document.getElementById('output_content').appendChild ( div );
	}
    }
}

for ( var i=0; i<urls.length; i++ ) {
    var xmlhttp = getXmlHttpRequest();
    if ( xmlhttp ) {
	xmlhttp.open ('get', baseurl + "?url=" + urlencode(urls[i]), true);
	xmlhttp.onreadystatechange = onStateChanged;
	xmlhttp.send (null);
    }
}
//]]>
