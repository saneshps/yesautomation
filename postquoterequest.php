<?php
include_once('functions.php'); 

if(empty($_REQUEST)){
    
    echo json_encode(array('message' => 'Fields are empty', 'status' => 'error'));
    exit;
}

$userid = insertUser($_REQUEST);

$customerid = insertCustomer($_REQUEST, $userid);

$quotereqid = quoteRequest($_REQUEST, $customerid);

$questions = quoteQuestions($_REQUEST, $quotereqid);

$mail = sendNotification($_REQUEST);

//echo json_encode(array('message' => 'Quote Generation Request sent successfully.', 'status' => 'success'));
echo $mail;
exit;
?>