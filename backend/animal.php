<?php
require_once "./AnimalRepository.class.php";
$animals = new AnimalRepository();

session_start();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$response = new stdClass();
$postBody = json_decode(file_get_contents('php://input'));

if($uri[count($uri)-2] == "animal.php")
    $type = $uri[count($uri)-1];
else if($uri[count($uri)-3] == "animal.php")
    $type = $uri[count($uri)-2];
else
    $type = "problem";

if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) {
    switch ($type){
        case "getAllAnimals":
            $response->data = $animals->getAllAnimals();
            break;
        case "addAnimal":
            $animals->insert($postBody);
            break;
        case "updateAnimals":
            $animals->update($postBody);
            break;
    }
}
else {
    $response->message = "Not Logged in!";
}

echo json_encode($response);
?>