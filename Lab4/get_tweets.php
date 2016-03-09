<?php
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => '1068174990-LZmlJmpME3ScRXwP4UI9LuMKLV7TlJx3YT7QLpX',
    'oauth_access_token_secret' => 'fCK9NT4yw5thO7SOo45uSzMMkoAdlfnshtXEpGz03Vez7',
    'consumer_key' => 'TCaOuiccF049bY9okramtr2p9',
    'consumer_secret' =>  'Qzb9pHez2U3zYiLuB5AWpRzE6WlutcO2K2zuPkyL0wJvztO6FH'
);

$url = "https://api.twitter.com/1.1/search/tweets.json";
$requestMethod = "GET";

$query = '?q=';
if(isset($_GET['q']) && $_GET['q']!='' ) {

    $query .= $_GET['q'];

} else {
    $query .= 'something';
}

//echo $query;
$twitter = new TwitterAPIExchange($settings);
$results = $twitter->setGetfield($query)->buildOauth($url, $requestMethod)->performRequest();
echo $results;
?>
