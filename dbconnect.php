<?php
$servername = "localhost";
$database = "hcoyym1o_yatools";
$username = "hcoyym1o_yauser";
$password = "TwR561g32W_n";

// Create connection
$db = new mysqli($servername, $username, $password, $database);

// Check connection
if ($db->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>