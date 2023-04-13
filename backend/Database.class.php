

<?php
class Database
{
    private static $dbserver = "localhost";
    private static $dbname = "shelter";
    private static $dbusername = "shelter";
    private static $dbpassword = "shelterdb";
    function getDataSource()
    {
        try {
            //self refers to static properties in the class 
            $connection = new mysqli(self::$dbserver, self::$dbusername, self::$dbpassword, self::$dbname);
            if (!$connection) {
                die("Database unreachable: " . mysqli_connect_errno());
            } else {
                return $connection;
            }
        } catch (mysqli_sql_exception $err) {
            echo $err;
        }
    }
    function isReachable()
    {
        if (mysqli_ping($this->getDataSource())) {
            return true;
        } else {
            return false;
        }
    }
}
