<?php

// require database class
require_once "./Database.class.php";

class FliterRepository
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

    function addOwner($name){
        try {
            $sql = "INSERT INTO owner (name, shelter_email) 
            VALUES ('{$name}', '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    function addRoom($name){
        try {
            $sql = "INSERT INTO room (name, shelter_email) 
            VALUES ('{$name}', '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    function createType($name){
        try {
            $sql = "INSERT INTO animal_type (name, shelter_email) 
            VALUES ('{$name}', '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    function deleteType($name){
        try {
            $sql = "delete from animal_type where name = '{$name}' and shelter_email = '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    function createBreed($name, $parentID){
        try {
            $sql = "INSERT INTO animal_breed (name, animal_type_ID, shelter_email) 
            VALUES ('{$name}', '{$parentID}', '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }

    function deleteBreed($name, $parentID){
        try {
            $sql = "delete from animal_type where name = '{$name}' and animal_type_ID = '{$parentID}' and shelter_email = '{$_SESSION['userEmail']}')";
            return mysqli_query($this->connection, $sql);
        } catch (mysqli_sql_exception $err) {
            echo "SQL error occured: " . $err->getMessage();
        }
    }
}
