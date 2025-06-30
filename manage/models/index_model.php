<?php
class Index_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function home() {
		
        return $this->db->select('SELECT * from banner order by id');
    }

    
}

?>