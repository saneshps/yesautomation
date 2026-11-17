<?php

/**
 * Description 
 *
 * @author Niyas <niyast@live.com>
 */
class Model {

    function __construct() {
        $this->db = new Database(DB_TYPE, DB_HOST, DB_NAME, DB_USER, DB_PASS);
    }

    public function getUser($userId) {
        return $this->db->selectOne('SELECT userId,userName,email,password,status
            FROM user 
            WHERE userId = :userId 
            AND status = 1', array(':userId' => $userId));
    }

    public function getAdmin($id, $token) {
        $user = $this->db->selectOne('SELECT userName,salt FROM admin
            WHERE adminId = :adminId', array(
            ':adminId' => $id));
        if ($token == Hash::create('sha256', $user['salt'] . 'mfm'
                        . $user['userName'], HASH_TOKEN_KEY)) {
            return $user;
        } else {
            return false;
        }
    }

    public function getTitle($table, $field, $cond, $value) {
        $result = $this->db->select('
            SELECT ' . $field . ' FROM ' . $table . '
            WHERE ' . $cond . ' = :value 
            ', array(
            ':value' => $value
        ));
        return $result[0][$field];
    }

    public function getModels() {
        return $this->db->select('SELECT * 
            FROM model
            WHERE status = :status
            ORDER BY modelName', array(':status' => 1));
    }

    public function getPrdcts() {
        return $this->db->select('SELECT *
            FROM  products
            WHERE status = :status
            ORDER BY prdctId', array(':status' => 1));
    }

    public function getCategry() {
        return $this->db->select('SELECT *
            FROM category
            WHERE status = :status
            ORDER BY categoryName', array(':status' => 1));
    }

    public function getCategory() {
        return $this->db->select('SELECT categories.*,model.brandId 
            FROM categories
            INNER JOIN product
            ON product.categoryId = categories.categoryId
            INNER JOIN model 
            ON product.modelId = model.modelId
            GROUP BY categories.categoryId
            ORDER BY categories.categoryName');
    }

    public function getProdcts() {
        return $this->db->select('SELECT *
            FROM  products
            WHERE status = :status
            ORDER BY prdctId', array(':status' => 1));
    }

    public function getgctrgy($productId) {
        return $this->db->select('SELECT categories.*,products.*
        FROM  categories
        INNER JOIN products
        ON categories.productId = products.prdctId
        where categories.productId =:productId',array(':productId'=>$productId));
    }
    
    public function getFtrProdcts() {
        return $this->db->select('SELECT *
            FROM  products
            WHERE status = :status
            ORDER BY prdctId limit 6', array(':status' => 1));
    }
    
    public function getftrsrvce(){
        return $this->db->select('SELECT * 
            FROM services 
            WHERE status = :status
            ORDER BY serviceId limit 6', array(':status' => 1));
    }

    public function recentEvents() {
        return $this->db->select('SELECT * FROM events WHERE status = :status ORDER BY time DESC LIMIT 10', array(':status' => 1));
    }

    public function getSessionCount() {
//        return $this->db->selectOne('SELECT count(id) as count FROM cartSession WHERE sessionId = :sessionId', array(
//                    ':sessionId' => Session::get(SESSION_ID)));
        return $this->db->selectOne('SELECT sum(count) as count FROM cartsession WHERE sessionId = :sessionId', array(
                    ':sessionId' => Session::get(SESSION_ID)));
    }

    public function getTechGuides() {
        return $this->db->select('SELECT techGuideId,title FROM techguide WHERE status = 1');
    }

    public function getRandomTestimonial() {
        return $this->db->selectOne('SELECT * FROM testimonial WHERE status = 1 ORDER BY RAND()');
    }

}