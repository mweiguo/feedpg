<?php
//$includepath = ini_get('include_path');
//$includepath .= ";C:/php-5.2.8-Win32/PEAR";
$includepath = ini_get('include_path');
$includepath .= ":/home/mweiguo/php";

ini_set ( 'include_path', $includepath);

require_once "XML/Feed/Parser.php";

function parseFeed2josn ( $l ) {
  $newentries = array();
  $data = @file_get_contents($l);
  if ( $data == false )
    return $newentries;

  $feed = new XML_Feed_Parser($data);
  $newentries['title'] = $feed->title;
  $newentries['description'] = $feed->description;
  foreach ( $feed as $entry ) {
    $tmp = array();
    $tmp['title'] = $entry->title;
    $tmp['pubDate'] = $entry->pubDate;
    $tmp['description']  = $entry->description;
    $tmp['link']  = $entry->link;
    $newentries['items'][] = $tmp;
  }
  return json_encode( $newentries );
}

function openxml ( $l ) {
  $data = @file_get_contents($l);
  if ( $data != false )
    return $data;
}

if ( array_key_exists ( 'url', $_GET ) )
  echo parseFeed2josn ( $_GET['url'] );
else if ( array_key_exists ( 'urlraw', $_GET ) )
  echo openxml ( $_GET['url'] );
?>