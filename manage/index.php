<?php
require 'config.php';
function __autoload($class) {
    if (file_exists(LIBS . $class . ".php")) {
        require LIBS . $class . ".php";
    }
}
require_once "PEAR/PEAR/Mail.php";
$app = new Bootstrap();
?>