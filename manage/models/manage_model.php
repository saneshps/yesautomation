<?php
class Manage_Model extends Model {



    public function __construct() {

        parent::__construct();

    }



    public function checkLogin($data) {

     

       

//        echo '<pre>';

//                print_r($data);exit;

//        echo Hash::create('sha256', md5($data['password'] . 'mfm'), HASH_PASSWORD_KEY);exit;

        return $this->db->selectOne('SELECT adminId,userName,salt FROM admin

            WHERE userName = :userName AND password = :password', array(

                    ':userName' => $data['userName'],

                    ':password' => Hash::create('sha256', md5($data['password'] . 'mfm'), HASH_PASSWORD_KEY)));

    }



    public function checkAdminLogin($id, $token) {

        $user = $this->db->selectOne('SELECT adminId,userName,salt FROM admin

            WHERE adminId = :adminId', array(

            ':adminId' => $id));

        if ($token == Hash::create('sha256', $user['salt'] . 'mfm'

                        . $user['userName'], HASH_TOKEN_KEY)) {

            return $user;

        } else {

            return false;

        }

    }



   //////////////////////// FORGOT PASSWORD ////////////////////////////////////
  
   public function forgot_password($data){
       
       $em = htmlentities($data['email']);
       
       return $this->db->selectOne('select * from admin where email=:email',array(':email'=>$em));
       
   } 
    public function update_password($data){
        
        $id = $data;
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*_";
        $password = substr( str_shuffle( $chars ), 0, 8 );
        $nwp = Hash::create('sha256', md5($password. 'mfm'),HASH_PASSWORD_KEY);
        $Valres['Password'] = $nwp;
        return array('pass'=>$password,'status'=>$this->db->update('admin', $Valres, "adminID='$id'"));
    }
    

}