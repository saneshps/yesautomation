<?php
class ManageUser_Model extends Model {



    function __construct() {

        parent::__construct();

    }



 

    public function getUser($userId){

        return $this->db->selectone('SELECT * FROM admin 

            WHERE adminID = :adminID',array(':adminID'=>$userId));

    }
    public function getadmin(){
        $sql="select userName, email from admin";
        return $this->db->select($sql);
    }

    public function updateAdminUser($data, $id) {

        return $this->db->update('admin', $data, 'adminID = ' . $id);

    }
public function getlogin($id){

    return $this->db->selectone('SELECT * FROM login 

            WHERE id = :id',array(':id'=>$id));

}
public function updateloginuser($data, $id){
    return $this->db->update('login', $data, 'id = ' . $id);

}


}