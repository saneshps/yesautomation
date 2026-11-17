<?php
include_once('dbconnect.php');

// get cities
function getEmirates()
{
    global $db;

    // Cities
    $csql = "SELECT * FROM ya_cities WHERE 1 = 1";
    $cresult = $db->query($csql);

    $emirates = [];
    if ($cresult->num_rows > 0) {
        // output data of each row
        while ($row = $cresult->fetch_assoc()) {
            $emirates[$row['short_code']] = $row['name'];
        }
    }
    return $emirates;
}

// Get questions
function getQuestions($modal)
{
    global $db;

    $sql = "SELECT c.*, q.id as quesid, q.question FROM ya_categories as c
            LEFT JOIN ya_questions as q ON q.category_id = c.id            
            WHERE c.name LIKE '" . $modal . "'";
    $result = $db->query($sql);

    $product = [];
    if ($result->num_rows > 0) {
        // output data of each row
        $questions = [];
        while ($row = $result->fetch_assoc()) {
            if (empty($product)) {
                $product = ['category_id'   => $row['id']];
            }
            $questions[$row['quesid']] = $row['question'];
        }
        if (!empty($questions)) {
            $product['questions'] = $questions;
        }
    }

    return $product;
}

// User Insert
function insertUser($request)
{
    global $db;

    $name = $request['name'];
    $email = $request['email'];
    $password = password_hash("password", PASSWORD_BCRYPT);
    $created = date("Y-m-d h:i:s");

    $user = [];
    $sql = "SELECT * FROM `ya_users` WHERE `email` = '" . $email . "'";
    if ($result = $db->query($sql)) {
        $user = $result->fetch_object();
    }
    $userid = 0;
    if (empty($user)) { // not exists

        $insql = "INSERT INTO `ya_users`( `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) 
    VALUES ('$name', '$email', null, '$password', null, '$created', '$created')";

        if ($db->query($insql) === TRUE) {
            $userid = $db->insert_id;
        } else {
            die($db->error);
        }
    } else { // exists
        $userid = $user->id;
    }

    return $userid;
}

// Customer Insert
function insertCustomer($request, $userid)
{
    global $db;

    $company = $request['company'];
    $phone   = $request['phone'];
    $city    = $request['city'];
    $created = date("Y-m-d h:i:s");

    $customer = [];
    $sql = "SELECT * FROM `ya_customers` WHERE `company` LIKE '$company' AND `user_id` =" . $userid;
    if ($result = $db->query($sql)) {
        $customer = $result->fetch_object();
    }

    $customerid = 0;
    if (empty($customer)) { // not exists
        $insql = "INSERT INTO `ya_customers`(`company`, `user_id`, `phone`, `city`, `status`, `created_at`, `updated_at`) 
        VALUES ('$company', '$userid', '$phone', '$city', 1, '$created', '$created')";

        if ($db->query($insql) === TRUE) {
            $customerid = $db->insert_id;
        }
    } else { // exists
        $customerid = $customer->id;
    }

    return $customerid;
}

// Request Quotation
function quoteRequest($request, $customerid)
{

    global $db;

    $category       = $request['category_id'];
    $delivery       = $request['delivery_method'];
    $technician     = (isset($request['is_technician']) == true) ? 1 : 0;
    $remarks        = $request['remarks'];
    $rentalfrom     = $request['rental_from'];
    $rentalto       = $request['rental_to'];
    $durationfrom   = $request['duration_from'];
    $durationto     = $request['duration_to'];
    $created        = date("Y-m-d h:i:s");

    $quotereqid = 0;
    $insql = "INSERT INTO `ya_quote_requests`(`customer_id`, 
  `category_id`, `rental_start`,`rental_end`, `delivery_method`, `is_technician`, `tech_from`, `tech_to`,`remarks`, `status`, `created_at`, `updated_at`) 
    VALUES ($customerid, $category, '$rentalfrom', '$rentalto' , '$delivery', $technician, '$durationfrom', '$durationto', '$remarks',1,'$created','$created')";

    if ($db->query($insql) === TRUE) {
        $quotereqid = $db->insert_id;
    }

    return $quotereqid;
}

// Quote questions
function quoteQuestions($request, $quotereqid)
{
    global $db;

    $ques = [];
    if (isset($request['answers']) && !empty($request['answers'])) {
        foreach ($request['answers'] as $qid => $answer) {
            $insql = "INSERT INTO `ya_quote_questions`(`quote_req_id`, `question_id`, `answer`) 
            VALUES ($quotereqid, $qid, '$answer')";

            if ($db->query($insql) === TRUE) {
                $ques[] = $db->insert_id;
            }
        }
    }
    return $ques;
}

// send notification mail to the team
function sendNotification($request)
{
    global $db;

    // $sql = "SELECT * FROM ya_settings WHERE option_name ='email_copy_to' ";
    // $row = $db->query($sql);

    // if (!$row) {
    //     echo 'Could not run query: ';
    //     exit;
    // }

    // $settings = $row->fetch();
    // $to = $settings->option_value;
    $to = "sales@yesautomation.ae";

    // $qry = "SELECT * FROM ya_categories WHERE id =".$request['category_id'];
    // $catRow = $db->query($qry);

    // if (!$catRow) {
    //     echo 'Could not run query: ';
    //     exit;
    // }    
    // $cat = $catRow->fetch();
    // $category = $cat->name;

    $category = '';
    $subject = "Notification for new quote";

    $message = "<b>Dear Team,</b>";
    $message .= "<p>There is one enquiry from " . $request['company'] . " for a product " . $category . "</p>";

    $header = "From:" . $request['email'] . " \r\n";
    //$header .= "Cc:afgh@somedomain.com \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";

    $retval = mail($to, $subject, $message, $header);

    if ($retval == true) {
        return "Message sent successfully...";
    } else {
        return "Message could not be sent...";
    }
}
