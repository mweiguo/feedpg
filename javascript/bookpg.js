//<![CDATA[
//var baseurl = 'http://localhost/feedpg/feedapi.php';
var baseurl = 'http://mweiguo.heliohost.org/blog/feedpg/feedapi.php';
var urls = new Array('http://feeds.delicious.com/v2/rss/mweiguo/%E4%B9%A6%E7%B1%8D?count=30');

function onStateChanged () {
    if ( this.readyState == 4 && this.status == 200 ) {
	eval ( "var t=" + this.responseText );
	alert (this.responseText);
	for ( var i=0; i<t.items.length; i++ ){
	    t.items[i].description = t.items[i].description.replace (/&#039;/g, "'");
	    t.items[i].description = t.items[i].description.replace (/&quot;/g, "\"");

	    var div = document.createElement('div');
	    div.innerHTML = "<div><a href="+ t.items[i].link + ">" + t.items[i].title + "</a></div>";
	    eval ( "var bookdesc = " + t.items[i].description );
	    if ( 'img' in bookdesc )
		div.innerHTML += "<img src='" + bookdesc.img + "'/>";
	    if ( 'desc' in bookdesc )
		div.innerHTML += "<div>" + bookdesc.desc + "</div>";

	    document.getElementById('output_content').appendChild ( div );
	}
    }
}

for ( var i=0; i<urls.length; i++ ) {
    var xmlhttp = getXmlHttpRequest();
    if ( xmlhttp ) {
	xmlhttp.open ('get', baseurl + "?url=" + urlencode(urls[i]), true);
	xmlhttp.onreadystatechange = onStateChanged;
	xmlhttp.send ( null );
    }
}
//]]>
