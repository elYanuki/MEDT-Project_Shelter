<?php
    require_once "./UserRepository.class.php";
    $users = new UserRepository();

    session_start();

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );

    if($uri[count($uri)-2] == "user.php")
        $type = $uri[count($uri)-1];
    else if($uri[count($uri)-3] == "user.php")
        $type = $uri[count($uri)-2];
    else
        $type = "problem";

    $response = new stdClass();
    $postBody = json_decode(file_get_contents('php://input'));

    // LOGIN
    if ($type == "login") {
        if (isset($_GET["email"]) && isset($_GET["password"]) &&
            $users->checkCredentials(strtolower($_GET["email"]), $_GET["password"]))
        {
            $_SESSION["loggedIn"] = true;
            $_SESSION["userEmail"] = strtolower($_GET["email"]);
            $response->loggedIn = true;
        }
        else{
            $response->loggedIn = false;
        }
    }
    else if ($type == "create") {
        if (isset($postBody->email) && isset($postBody->name) && isset($postBody->password) && isset($postBody->adminPassword)) {
            $mail = strtolower($postBody->email);
            if(!$users->emailUsed($mail)) {
                $users->insert($postBody);
                $response->emailUsed = false;
                $response->message = "user created";

                if($users->checkCredentials($mail,$postBody->password)){
                    $_SESSION["loggedIn"] = true;
                    $_SESSION["userEmail"] = $mail;
                    $response -> loggedIn = true;
                }
            }
            else{
                $response->emailUsed = true;
            }
        }
    }
    else if($type == "logOut"){
        $_SESSION["loggedIn"] = false;
        $_SESSION["userEmail"] = null;
        $response -> loggedIn = false;
    }

    else if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"]) {
        $response->loggedIn = true;
        $response->name = $users->getName($_SESSION["userEmail"]);

        if($type == "getFilterData"){
            $response->data = array(
                "typeID" => $users->getAnimalTypes(),
                "breedID" => $users->getAnimalBreeds(),
                "animalTypesAndBreeds" => $users->getAnimalTypesAndBreeds(),
                "ownerID" => $users->getOwners(),
                "roomID" => $users->getRooms()
            );
        }

        if ($type == "adminlogin") {
            if (isset($_GET["password"]) && $users->checkAdminCredentials($_GET["password"], $_SESSION["userEmail"])){
                $_SESSION["adminLoggedIn"] = true;
                $response->adminLoggedIn = true;
            }
            else{
                $response->adminLoggedIn = false;
                $_SESSION["adminLoggedIn"] = false;
            }
        }
        else if ($type == "adminlogout") {
            $_SESSION["adminLoggedIn"] = false;
            $response->adminLoggedIn = false;
        }
    }
    else {
        $response->message = "Not Logged in!";
        $response->loggedIn = false;
        $response->adminLoggedIn = false;
    }

    echo json_encode($response);
?>