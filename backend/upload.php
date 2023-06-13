
    <?php
    global $conn;
    session_start();
    require_once "./Database.class.php";

    $database = new Database();
    try {
        $conn = $database->getDataSource();
    } catch (mysqli_sql_exception $err) {
        echo $err;
        exit;
    }

    if (isset($_FILES["image"]["name"])) {
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

        if (checkImageFile($_FILES["image"])) {
            $ID = $_GET["ID"];

            $target_file = $target_dir . "animalimage-" . $ID . ".jpg";
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                echo "upload successfull";
            }
        } else {
            echo "Sorry, your file was not uploaded.";
        }
    }

    function checkImageFile($imageFile) {
        $target_dir = "../uploads/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

        // optional
        if (isset($_POST["submit"])) {
            $check = getimagesize($_FILES["image"]["tmp_name"]);
            return $check;
        }

        if ($imageFile["size"] > 1000000) {
            echo "Sorry, your file is too large.";
            return false;
        }

        if ($imageFileType != "jpg" && $imageFileType != "JPG" &&
            $imageFileType != "jpeg" && $imageFileType != "JPEG") {
            echo "Sorry, only JPG, JPEG, jpg & jpeg files are allowed.";
            return false;
        }

        return true;
    }
