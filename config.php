<?php
//$con = mysql_connect("localhost", "root", "") or die('error');
//mysql_select_db("unclefoody", $con);
//$host='localhost';
//$user='riyasm_nbc';
//$password='m%IuRsZ84TP?';
//$db='riyasm_nbc';
//$con = mysql_connect($host, $user, $password) or die('error');
//mysql_select_db($db, $con);
?>

<?php


define('URL', 'http://yesautomation.ae/manage/');
define("ABS_PATH", $_SERVER['DOCUMENT_ROOT'] . "/manage/");
define('UPLOADS', URL . 'public/uploads/');



//$con = mysql_connect("localhost", "root", "") or die('error');
//mysql_select_db("unclefoody", $con);
$host='localhost';
$user='hcoyym1o_yesauto';
$db='hcoyym1o_yesautomation';
$password='~)eD81mTlFD2';
$con = mysqli_connect($host,$user,$password,$db) or die('error');
//mysqli_select_db($db, $con);


if(!$con){
     die("connection failed:".mysqli_connect_error());

  }
?>
