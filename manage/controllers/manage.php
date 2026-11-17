<?php
ob_start();

/**

 * Description

 *

 * @author Niyas <niyast@live.com>

 */

class Manage extends Controller {



    function __construct($name) {

        parent::__construct($name);

        $this->seo();

    }







    public function index() {

      

        $this->checkLogin();

       




        $this->view->css[] = CSS . 'bootstrap.css';
         
        $this->view->css[] = CSS . 'layout.css';

		 $this->view->js[] = JS . 'jquery.js';

        $this->view->js[] = JS . 'bootstrap.js';

        $this->view->js[] = URL . 'public/ckeditor/ckeditor.js';


     

         

        
        $this->view->pathFlow = array('Dashboard');

        $this->view->renderAdmin('manage/index',false);

        $this->view->title = SITE;

        $this->view->metaKeywords = '';

        $this->view->metaDescription = '';

    }
	
	
	public function includeJs($folder, $file) {
	}

    public function checkLogin() {

        $adminId = Session::get(ADMIN_ID);

        //echo $adminId;exit;

      

        if ($adminId) {

            $token = Session::get(ADMINTOKEN);

           // echo $token;exit;

            $user = $this->model->checkAdminLogin($adminId, $token);

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

    

    public function logout() {

        Session::destroy();

        header('location:' . MANAGE . 'login');

    }
     public function logout_arabic() {

        Session::destroy();

        header('location:' . ARABIC );

    }


    public function login() {

   //     echo 'fsd';exit;

        if (isset($_POST['subLogin'])) {

            $user = $this->model->checkLogin($_POST);

            if (isset($user['salt'])) {

                Session::set(ADMIN_ID, $user['adminId']);

                Session::set(ADMINTOKEN, Hash::create('sha256', $user['salt'] . 'mfm'

                                . $user['userName'], HASH_TOKEN_KEY));

                header('location:' . MANAGE);

            } else {

                Session::remove(ADMIN_ID);

                Session::remove(ADMINTOKEN);

            }

        }

        $this->view->css[] = CSS . 'ie.css';

        $this->view->css[] = CSS . 'layout.css';

        $this->view->js[] = JS . 'hideshow.js';

        $this->view->renderAdmin('manage/login', false);

    }
    
    /////////////////// FORGOT PASSWORD ////////////////////////////////////////

    public function forgot_password(){
        
        
        if(isset($_POST['frgtp'])){
            
            
	    
            $user = $this->model->forgot_password($_POST);
            if(!empty($user)){
              $actual_mail=$user['email']; 
              //echo '<pre>';print_r($user);exit;
                $d = $user['adminID'];
                $sts = $this->model->update_password($d);
				$name=$sts['pass'];
                   //echo $name; exit;
                    if( $sts['status']==true){

                  $message='
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#ffffff " align="center">
<tbody><tr>
<td>
    
   <table width="520" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff " align="center">
   
   
    <tbody><tr valign="top">
   <td align="center" style="padding-top:30px"><a href="http://www.adoxsolutions.in/projects/spraylock_/" height="40" width="180" border="0" alt="Atlassian" style="display:block;color:#4c9ac9 " align="middle" class="CToWUd"><img style="width: 100%;" src="http://www.adoxsolutions.in/projects/spraylock_/public/front/images/logo.jpg"/></a>
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
            
        Your New Password: '.$name.'</a>      
        
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
               Copyright by Spray Lock 2017
   </td>
   </tr>

   </tbody></table>
   
</td>
</tr>
</tbody></table>
';


        $emai = new PHPMailer();
$emai->From      = 'noreply@adoxsolutions.in';
$emai->FromName  = 'SprayLock-Admin';
$emai->Subject   = 'Password';
$emai->Body      = $message;
$emai->AddAddress( $actual_mail );


  
   if( $emai->Send()){
     echo "<script>alert('New Password is Send to Your Mail')</script>";}



		   
                        
                    }else{
                        
                           echo'<script>alert("Failed to reset password please try again");</script>';    
                    }
            }else{
                
                echo '<script>alert("Please enter a valid email");</script>';
                
            }
            
            
        }
        $this->view->renderAdmin('manage/forgot',false);
    }

}
?>