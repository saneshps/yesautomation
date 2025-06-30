<?php
if (isset($_POST['Submit'])) {
    $variable1 = $_REQUEST['pn'];
    $variable2 = $_REQUEST['mobile'];
    $variable3 = $_REQUEST['email'];

    $header = 'MIME-Version: 1.0' . "\r\n";
    $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $header .= 'From: sales@yesautomation.ae' . " " .
        'X-Mailer: PHP/' . phpversion();


    $to = "sales@yesautomation.ae";
    $subject = "Express Interests - " . $variable1;
    $msg = "You have received an express interest of the product " . $variable1;


    $message = '<div style="background:#e5e5e5; padding:2% 6%">
        <div style="padding:15px; background:#e7e7e7;text-align: center;  border-bottom:solid 5px #9dc33b">
        <div><img src="https://www.yesautomation.ae/images/logo.png"  alt="Yesautomation" /></div>
        </div>
        <div style="margin-top: -6%;">
        <div style="padding:15px 15px 35px 15px; background:white;text-align: center; ">
        <h1>Express Interests of ' . $variable1 . '</h1>
        <div style="padding-bottom:5px; height: 30px;">
        <div > E-Mail:  <a style="color:#999">' . $variable2 . '</a></div>
        </div>

        <div style="padding-bottom:5px; height: 30px;">
        <div > Phone:  <a style="color:#999">' . $variable3 . '</a></div>
        </div>

        <div style="padding-bottom:5px; height: 30px;">
        <div > Subject:  <a style="color:#999">' . $subject . '</a></div>        
        </div>

        <div style="padding-bottom:5px; height: 30px;">
        <div> Message:  <a style="color:#999">' . $msg . '</a></div>        
        </div>
        </div>';

    mail(
        $to,
        $subject,
        $message,
        $header
    );
    header("location: index.php");
}
