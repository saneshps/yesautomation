<?php
ob_start();


/**

 * Description of Controller

 *

 * @author niyas

 */

class Controller {



    function __construct() {

        $this->view = new View();

        Session::init();

    //    $this->createSession();

//        $this->gethdrdtl();

 //       $this->checkLoginStatus();

//        $this->getftrdtl();

//        error_reporting(E_ALL);

//        ini_set("display_errors", 'On');

    }



    public function loadModel($name) {



        $path = 'models/' . $name . '_model.php';



        if (file_exists($path)) {

            require 'models/' . $name . '_model.php';



            $modelName = $name . '_Model';

            $this->model = new $modelName();

        }

    }



    public function checkAdminLogin() {

        $adminId = Session::get(ADMIN_ID);

        if ($adminId) {

            $token = Session::get(ADMINTOKEN);

            //echo $token;

            $mdl = new Model();

            $user = $mdl->getAdmin($adminId, $token);

            // print_r($user);exit;

            if (!$user) {

                header('location:' . MANAGE . 'login');

                exit;

            } else {

                $this->view->userName = $user['userName'];

            }

        } else {

            header('location:' . MANAGE . 'login');

            exit;

        }

    }



    public function seo() {

        $this->view->title = SITE;

        $this->view->metaKeywords = '';

        $this->view->metaDescription = '';

        if (isset($this->view->brands))

            foreach ($this->view->brands as $brand) {

                $this->view->metaKeywords.=',' . $brand['brandName'] . ' compressor parts';

                $this->view->metaDescription.=',' . $brand['brandName'] . ' compressor parts';

                if (isset($this->view->topcategories))

                    foreach ($this->view->topcategories as $topcategory) {

                        if ($brand['brandId'] == $topcategory['brandId']) {

                            $this->view->metaKeywords.=',' . $brand['brandName'] . ' ' . $topcategory['categoryName'];

                            $this->view->metaDescription.=',' . $brand['brandName'] . ' ' . $topcategory['categoryName'];

                        }

                    }

            }

    }



    public function checkLoginStatus($reurl = null) {

        $userId = Session::get(USER_ID);

        $token = Session::get(TOKEN);

        $ter = new Model();

        $userData = $ter->getUser($userId);

        if ($token == Hash::create('sha256', $userData['userName']

                        . $userData['password'], HASH_TOKEN_KEY)) {

            $this->view->userName = $userData['userName'];

            $this->view->userId = $userData['userId'];

            $result = array('status' => 'active');

        } else {

            Session::remove(USER_ID);

            Session::remove(TOKEN);

            $this->view->userId = null;

            $this->view->userName = null;

            $result = array('status' => 'inactive');

            if ($reurl) {

                header('location:' . MEMBER . 'login?reurl=' . $reurl);

            }

        }

    }



    public function includeJs($folder, $file) {

        $path = 'views/' . $folder . '/js/' . $file . '.js';

        if (file_exists($path)) {

            $this->view->js[] = URL . 'views/' . $folder . '/js/' . $file . '.js';

        }

    }



  



    public function createSession() {

        $sessionId = Session::get(SESSION_ID);

        if (!$sessionId) {

            Session::set(SESSION_ID, Hash::create('sha256', time() . 'mfm' . rand(1000, 9999), HASH_SALT_KEY));

        }

        $try = new Model();

      //  $this->view->count = $try->getSessionCount();

    }
	
	
	public function projects_enq(){
        
       
       if(isset($_POST['projectsenquiry'])){

		$name=htmlentities($_POST['name']);
		
		$email=htmlentities($_POST['email']);
		
		$products=htmlentities($_POST['products']);
		

		$phone=htmlentities($_POST['phone']);

		$msg=htmlentities($_POST['msg']);
		 //print_r($_POST); exit;
		$actual_mail='preshbin666@outlook.com';
		//sales@alkhudair-sa.com
		$value= array('name' => $name, 'email' => $email,'products' => $products,  'phone' => $phone,'msg' => $msg);

                  $message='
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff " align="center">
<tbody><tr>
<td>
    
   <table width="520" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff " align="center">
   
   
    <tbody><tr valign="top">
   <td align="center" style="padding-top:30px"><a href="http://www.selex-uk.com/" height="40" width="180" border="0" alt="Atlassian" style="display:block;color:#4c9ac9 " align="middle" class="CToWUd"><img src="http://selex-uk.com/public/front/images/logo.png"/></a>
   </td>
   </tr>
   
   
   <tr>
   <td style="color:#cccccc ;padding-top:30px" valign="top">
       <hr color="cccccc" size="1">
   </td>
   </tr>
    <tr style="text-alignleft;">
    <td valign="top" style="padding-top:30px;font-family:Helvetica neue,Helvetica,Arial,Verdana,sans-serif;color:#205081 ;font-size:16px;line-height:10px;text-align:left;" align="middle">
        <a style="text-decoration:none;color:#666666 ;" target="_blank">
            
        Name: '.$name.'</a>      
        
    </td>
    </tr>
    <tr>
    <td valign="top" style="padding-top:30px;font-family:Helvetica neue,Helvetica,Arial,Verdana,sans-serif;color:#205081 ;font-size:16px;line-height:10px;text-align:left;" align="middle">
        <a style="text-decoration:none;color:#666666 ;" target="_blank">
            
        Category: '.$products.'</a>      
        
    </td>
    </tr>
   <tr  style="text-align:left;">
    <td valign="top" style="padding-top:30px;font-family:Helvetica neue,Helvetica,Arial,Verdana,sans-serif;color:#205081 ;font-size:16px;line-height:10px;text-align:left;" align="middle">
        <a style="text-decoration:none;color:#666666 ;" target="_blank">
            
        Mail: '.$email.'</a>      
        
    </td>
    </tr>
    
          
    <tr  style="text-align:left;">
    <td valign="top" style="padding-top:30px;font-family:Helvetica neue,Helvetica,Arial,Verdana,sans-serif;color:#205081 ;font-size:16px;line-height:10px;text-align:left;" align="middle">
        <a style="text-decoration:none;color:#666666 ;" target="_blank">
            
        Phone: '.$phone.'</a>      
        
    </td>
    </tr>

     <tr  style="text-align:left;">
    <td valign="top" style="padding-top:30px;font-family:Helvetica neue,Helvetica,Arial,Verdana,sans-serif;color:#205081 ;font-size:16px;line-height:10px;text-align:left;" align="middle">
        <a style="text-decoration:none;color:#666666 ;" target="_blank">
            
        Message: '.$msg.'</a>      
        
    </td>
    </tr>
    


   
        </tbody></table>
    </td>
    </tr>
    


   </tbody></table>
</td>
</tr>

   
<tr>
<td>
   <table width="520" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff " align="center">        
   <tbody><tr>
   <td style="color:#cccccc " valign="top">
       <hr color="cccccc" size="1">
   </td>
   </tr>          
   <tr>

   </tr>
   <tr>
   <td valign="top" style="font-family:Helvetica,Helvetica neue,Arial,Verdana,sans-serif;color:#707070 ;font-size:12px;line-height:18px;text-align:center;font-weight:none" align="center">
               Copyright by Al-Khudair 2017
   </td>
   </tr>

   </tbody></table>
   
</td>
</tr>
</tbody></table>
';

		


$emai = new PHPMailer();
$emai->From      = 'noreply@Al-Khudair.com';
$emai->FromName  = 'Al-Khudair-Admin';
$emai->Subject   = 'Project Enquiry';
$emai->Body      = $message;
$emai->AddAddress($actual_mail);


  
   if( $emai->Send()){
		echo "<script>alert('Mail Sent Successfully')</script>";}
  
                    else{
                       echo "<script>alert('Mail Sending Failed')</script>"; 
                               
                    }
	   }
            
            
        }
       
    



 

}



