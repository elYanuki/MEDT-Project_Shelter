<?php
require_once "./FilterRepository.class.php";
$filter = new FliterRepository();

session_start();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$response = new stdClass();
$postBody = json_decode(file_get_contents('php://input'));

if($uri[count($uri)-2] == "filter.php")
    $type = $uri[count($uri)-1];
else if($uri[count($uri)-3] == "filter.php")
    $type = $uri[count($uri)-2];
else
    $type = "problem";

if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] && isset($_SESSION["adminLoggedIn"]) && $_SESSION["adminLoggedIn"]) {
    switch ($type){
        case "addRoom":
            $response->data = $filter->addRoom($_GET["name"]);
            $response->message = "adding";
            break;
        case "addOwner":
            $response->data = $filter->addOwner($_GET["name"]);
            break;
        case "addType":
            $response->data = $filter->createType($_GET["name"]);
            break;
        case "addBreed":
            $response->message = "adding brreed";
            $response->data = $filter->createBreed($_GET["name"], $_GET["parent"]);
            break;
    }
}
else {
    $response->message = "Not Logged in!";
}

echo json_encode($response);
?>