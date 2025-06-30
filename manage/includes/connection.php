<?php
//$con = mysql_connect("localhost", "root", "") or die('error');

//mysql_select_db("shop2_amaze", $con);

$host='localhost';

$user='root';

$password='';

$db='yesmechinary';

$con = mysql_connect($host, $user, $password) or die('error');

mysql_select_db($db, $con) or die('error');

//$con = mysql_connect("localhost", "bestdeal_db1", "R4pT4l_x)#og") or die('error');



        error_reporting(E_ALL);

        ini_set("display_errors", 'On');

?>