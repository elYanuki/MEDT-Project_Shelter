<?php

// require database class
require_once "./Database.class.php";

class AnimalRepository
{
    private $connection;
    function __construct(){
        $database = new Database();
        try {
            $this->connection = $database->getDataSource();
        } catch (mysqli_sql_exception $err) {
            echo $err;
            
            exit;
        }
    }
    function insert($animal){
        try {
            $sql = "INSERT INTO animal (name, shelter_email, typeID, breedID, gender, acquiryDate, ownerID, roomID) 
            VALUES ('{$animal->name}', '{$_SESSION['userEmail']}', '{$animal->typeID}', '{$animal->breedID}', '{$animal->gender}', now(), '0', '{$animal->roomID}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    //getters & setters
    function getConnection()
    {
        return $this->connection;
    }

    function getAllAnimals(){
        $sql = "
        select a.ID, a.name, a.note, a.typeID, a.breedID, a.image, a.gender, a.birthdate, a.acquiryDate, a.ownerID, a.roomID, a.foodType, a.foodTime, at.name as type_name, ab.name as breed_name, o.name as owner_name, r.name as room_name
from animal a
         left outer join animal_type at on a.typeID = at.ID
         left outer join animal_breed ab on a.breedID = ab.ID
         left outer join owner o on a.ownerID = o.ID
         left outer join room r on a.roomID = r.ID
        where a.shelter_email = '{$_SESSION['userEmail']}';";
        try {
            $result = $this->connection->query($sql);

            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }

            return $rows;
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }
}
