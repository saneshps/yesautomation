<?php
$servername = "localhost";
$database = "hcoyym1o_yatools";
$username = "root";
$password = "";

// Create connection
$db = new mysqli($servername, $username, $password, $database);

// Check connection
if ($db->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
