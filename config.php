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


$isLocal = in_array($_SERVER['SERVER_ADDR'] ?? '', array('127.0.0.1', '::1'), true);
$projectPath = str_replace('\\', '/', __DIR__);
$documentRoot = rtrim(str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']), '/');
$localBase = substr($projectPath, strlen($documentRoot));
define('URL', $isLocal ? $localBase . '/manage/' : 'http://yesautomation.ae/manage/');
define("ABS_PATH", __DIR__ . "/manage/");
define('UPLOADS', URL . 'public/uploads/');



//$con = mysql_connect("localhost", "root", "") or die('error');
//mysql_select_db("unclefoody", $con);
$host='localhost';
$user='hcoyym1o_yesauto';
$db='hcoyym1o_yesautomation';
$password='~)eD81mTlFD2';
if ($isLocal) {
    $user = getenv('YESAUTOMATION_DB_USER') ?: 'root';
    $password = getenv('YESAUTOMATION_DB_PASSWORD') ?: '';
    $db = getenv('YESAUTOMATION_DB_NAME') ?: 'yesautomation_db';
}
$con = mysqli_connect($host,$user,$password,$db) or die('error');
//mysqli_select_db($db, $con);


if(!$con){
     die("connection failed:".mysqli_connect_error());

  }
?>
