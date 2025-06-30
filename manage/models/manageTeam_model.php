<?php
class ManageTeam_Model extends Model {

    function __construct() {

        parent::__construct();
    }

    public function getadmin() {
        $sql = "select userName from admin";
        return $this->db->select($sql);
    }

    public function deal_photo($id) {
        $sql = $this->db->select("select vchr_image from tbl_deals where pk_int_deal_id=$id");
        /* echo "<pre>";
          print_r($sql); */
        return $sql;
    }

    public function addcategory($data) {
        $category_name = $data['category_name'];
        $orderno = $data['orderno'];
        return $this->db->select("insert  into tbl_category(order_no,vchr_category_name)values($orderno,'$category_name')");
    }

    public function view_category() {
        $sql = $this->db->select("select * from tbl_category order by order_no ASC");
        return $sql;
    }

    public function view_deals() {
        $sql = $this->db->select("select c.vchr_category_name,d.pk_int_deal_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_link,d.coupen_code from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id order by pk_int_deal_id Desc");
        return $sql;
    }
     public function view_deals11() {
          $date=date("Y/m/d");
        $sql = $this->db->select("select c.vchr_category_name,d.pk_int_deal_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_link,d.coupen_code from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id where expiry_date>='$date' order by pk_int_deal_id Desc");
        return $sql;
    }

    public function view_deals1($id) {
        $sql = $this->db->select("select c.vchr_category_name,d.pk_int_deal_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_link,d.coupen_code from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id where d.fk_category_id=$id");
        return $sql;
    }

    public function view_hotdeals1($id) {
        $sql = $this->db->select("select c.vchr_category_name,d.pk_int_deal_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_link,d.coupen_code from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id where d.fk_category_id=$id and d.deal_type=1");
        return $sql;
    }

    public function hot_deals() {
        $sql = "select c.vchr_category_name,d.pk_int_deal_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_link,d.coupen_code from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id  where deal_type=1 order by pk_int_deal_id ASC";
        return $this->db->select($sql);
    }

    public function editcategory($id) {
        $sql = "select * from tbl_category where pk_int_category_id=$id";
        $result = $this->db->select($sql);
        return $result;
    }

    public function updatesortno($data, $id) {
        $sortno = $data['sno'];
        $sql = "update tbl_deals set order_no=$sortno where pk_int_deal_id=$id";
        return $this->db->select($sql);
    }

    public function updatecatsortno($data, $id) {
        $sortno = $data['no'];
        $sql = "update tbl_category set order_no=$sortno where pk_int_category_id=$id";
        return $this->db->select($sql);
    }

    public function deletecategory($id) {

        $sql = "delete  from tbl_category where pk_int_category_id=$id";

        $result = $this->db->select($sql);
        $sql2 = "select * from tbl_deals where fk_category_id=$id";
        $result2 = $this->db->select($sql2);
        if ($result2) {
            $sql3 = "delete from tbl_deals where fk_category_id=$id";

            $result3 = $this->db->select($sql3);
            return $result;
        } else {
            return $result;
        }
        //
    }

    public function updatecat($data, $id) {

        $category_name = $data['category_name'];
        $orderno = $data['orderno'];

        $sql = "update tbl_category SET vchr_category_name='$category_name',order_no='$orderno' WHERE pk_int_category_id=$id";

        $sql = $this->db->select($sql);
        return $sql;
    }

    public function add_deals($data, $img) {

        $heading = $data['heading'];
        $category = $data['category'];
        $expiry = $data['expiry'];
        $date2 = date("Y/m/d", strtotime($expiry));
        $description = $data['description'];
        $discount = $data['discount'] . $data['test'];

        $coupen_code = $data['coupencode'];
        $link = $data['link'];
        $deal_type = $data['deal_type'];
        if (isset($data['free'])) {
            $free = 1;
        } else {
            $free = 0;
        }
        if ($deal_type == "") {
            $deal_type = 0;
        }


        return $this->db->insert("tbl_deals", array('fk_category_id' => $category, 'vchr_deal_heading' => $heading, 'vchr_deal_description' => $description, 'vchr_image' => $img, 'expiry_date' => $date2, 'int_discount' => $discount, 'deal_type' => $deal_type, 'deal_link' => $link, 'coupen_code' => $coupen_code, 'freeship' => $free));
    }

    public function add_deals1($data) {

        $heading = $data['heading'];
        $category = $data['category'];
        $expiry = $data['expiry'];
//             echo $expiry=date('y-m-d',$expiry);exit;
        $date2 = date("Y/m/d", strtotime($expiry));
        $description = $data['description'];
        $discount = $data['discount'] . $data['test'];
        $coupen_code = $data['coupencode'];
        $link = $data['link'];
        $deal_type = $data['deal_type'];
        $link_site = $data['link_site'];
        if (isset($data['free'])) {
            $free = 1;
        } else {
            $free = 0;
        }
        if ($deal_type == "") {
            $deal_type = 0;
        }


        return $this->db->insert("tbl_deals", array('fk_category_id' => $category, 'vchr_deal_heading' => $heading, 'vchr_deal_description' => $description, 'vchr_image' => $link_site, 'expiry_date' => $date2, 'int_discount' => $discount, 'deal_type' => $deal_type, 'deal_link' => $link, 'coupen_code' => $coupen_code, 'freeship' => $free));
    }

    public function editdeal($id) {
        $sql = "select c.vchr_category_name,d.pk_int_deal_id,d.fk_category_id,d.vchr_deal_heading,d.vchr_deal_description,d.vchr_image,d.expiry_date,d.int_discount,d.deal_type,d.deal_link,d.coupen_code,d.freeship from tbl_category c join tbl_deals d on c.pk_int_category_id=d.fk_category_id  where d.pk_int_deal_id=$id";
        return $this->db->select($sql);
    }

    public function update_deal($data, $img, $id) {


        /* echo "deal";
          echo "<pre>";
          print_r($data);exit; */
        $id = $data['hidden'];
        $category = $data['category'];
        $heading = $data['heading'];
        $description = $data['description'];
        $expiry = $data['expiry'];
        $date2 = date("Y/m/d", strtotime($expiry));
        $discount = $data['discount'];
        $coupen_code = $data['coupencode'];
        $deal_type = $data['deal_type'];
        $orderno = $data['orderno'];
        $link = $data['link'];
        $free = $data['free'];
        if (isset($data['free'])) {
            $free = 1;
        } else {
            $free = 0;
        }
        if ($deal_type == "") {
            $deal_type = 0;
        }
        $Valres['fk_category_id'] = $category;
        $Valres['vchr_deal_heading'] = $heading;
        $Valres['vchr_deal_description'] = $description;
        $Valres['expiry_date'] = $date2;
        $Valres['deal_type'] = $deal_type;
        $Valres['int_discount'] = $discount;
        $Valres['deal_link'] = $link;
        $Valres['coupen_code'] = $coupen_code;
        $Valres['freeship'] = $free;
        $Valres['vchr_image'] = $img;

        $this->db->update('tbl_deals', $Valres, 'pk_int_deal_id=' . $id);
//        $sql = "update tbl_deals SET fk_category_id=$category,vchr_deal_heading='$heading',vchr_deal_description='$description',vchr_image='$img',expiry_date='$date2',int_discount='$discount',deal_type='$deal_type',deal_link='$link',coupen_code='$coupen_code',freeship='$free' where pk_int_deal_id=$id";
//        return $this->db->select($sql);
    }

    public function update_deal1($data, $id) {


        /* echo "deal1"; 
          echo "<pre>";
          print_r($data);exit; */
        $id = $data['hidden'];
        $category = $data['category'];
        $heading = $data['heading'];
        $description = $data['description'];
        $expiry = $data['expiry'];
        $date2 = date("Y/m/d", strtotime($expiry));
        $discount = $data['discount'] . $data['test'];
        $deal_type = $data['deal_type'];
        $link_site = $data['link_site'];
        $coupen_code = $data['coupencode'];
        $link = $data['link'];
        $free = $data['free'];
        if (isset($data['free'])) {
            $free = 1;
        } else {
            $free = 0;
        }
        if ($deal_type == "") {
            $deal_type = 0;
        }
        $Valres['fk_category_id'] = $category;
        $Valres['vchr_deal_heading'] = $heading;
        $Valres['vchr_deal_description'] = $description;
        $Valres['expiry_date'] = $date2;
        $Valres['deal_type'] = $deal_type;
        $Valres['int_discount'] = $discount;
        $Valres['deal_link'] = $link;
        $Valres['coupen_code'] = $coupen_code;
        $Valres['freeship'] = $free;
         $Valres['vchr_image'] = $link_site;
        $this->db->update('tbl_deals', $Valres, 'pk_int_deal_id=' . $id);

//        $sql1 = $this->db->select("update tbl_deals SET fk_category_id=$category,vchr_deal_heading='$heading',vchr_deal_description='$description',vchr_image='$link_site',expiry_date='$date2',int_discount='$discount',deal_type=$deal_type,deal_link='$link',coupen_code='$coupen_code',freeship='$free' WHERE pk_int_deal_id=$id");
//        return $sql1;
    }

    public function update_deal2($data) {


        $id = $data['hidden'];
        /* echo "deal2";
          echo "<pre>";
          print_r($data);exit; */
        $category = $data['category'];
        $heading = $data['heading'];
        $description = $data['description'];

        $expiry = $data['expiry'];
        $date2 = date("Y/m/d", strtotime($expiry));
        $discount = $data['discount'] . $data['test'];
        $deal_type = $data['deal_type'];

        $coupen_code = $data['coupencode'];
        $link = $data['link'];
        $free = $data['free'];
        if (isset($data['free'])) {
            $free = 1;
        } else {
            $free = 0;
        }
        if ($deal_type == "") {
            $deal_type = 0;
        }
        $Valres['fk_category_id'] = $category;
        $Valres['vchr_deal_heading'] = $heading;
        $Valres['vchr_deal_description'] = $description;
        $Valres['expiry_date'] = $date2;
        $Valres['deal_type'] = $deal_type;
        $Valres['int_discount'] = $discount;
        $Valres['deal_link'] = $link;
        $Valres['coupen_code'] = $coupen_code;
        $Valres['freeship'] = $free;
        $this->db->update('tbl_deals', $Valres, 'pk_int_deal_id=' . $id);







//        $sql1 = "update tbl_deals SET fk_category_id=$category,vchr_deal_heading='$heading',vchr_deal_description='$description',expiry_date='$date2',int_discount='$discount',deal_type=$deal_type,deal_link='$link',coupen_code='$coupen_code',freeship='$free' WHERE pk_int_deal_id=$id";
////                $sql="UPDATE `bestdeal_db1`.`tbl_deals` SET `vchr_deal_description` = $description WHERE `tbl_deals`.`pk_int_deal_id` = 187";
////                  echo $sql;exit;
//        $result = $this->db->select($sql1);
//        return $result;
    }

    public function deletedeal($id) {
        return $this->db->select("delete from tbl_deals where pk_int_deal_id=$id");
    }

    public function deletehotdeal($id) {
        return $this->db->select("delete from tbl_deals where pk_int_deal_id=$id");
    }

    public function getupdatesort($data) {
        $id = $data['id'];
        $sort = $data['id1'];
        $sql = "update tbl_category set order_no=$sort where pk_int_category_id=$id";

        $result = $this->db->select($sql);
        return $result;
    }

    public function add_adds($data) {
        $link = $data['amazone_link'];
        return $this->db->insert('adds', array('link' => $link));
    }

    public function getadd() {
        $sql = "select * from adds order by id desc";
        $result = $this->db->select($sql);
        return $result;
    }

    public function getadds($id) {
        $sql = $this->db->select("select * from adds where id=$id");
        return $sql;
    }

    public function getupdate($data) {
        $link = $data['amazone_link'];
        $id = $data['hidden'];
        $sql = "update adds set link='$link' where id=$id";
        $result = $this->db->select($sql);
        return $result;
    }

    public function getdelateads($id) {

        $sql = $this->db->select("delete from adds where id=$id");
        return $sql;
    }

    public function getexpred() {

        $date = new DateTime('now', new DateTimeZone('Asia/Kolkata'));
        $d = $date->format('Y-m-d');


        $sql = $this->db->select("select * from tbl_deals where expiry_date < '$d'");
        return $sql;
    }

    public function getdelateselectd($data) {

        foreach ($data['checkbox'] as $check) {
            $sql = $this->db->select("delete from tbl_deals where pk_int_deal_id=$check");
        }
        return $sql;
    }

    function getexpdate($id) {

        $d = date("Y-m-d");
        $result = $this->db->select("SELECT DATEDIFF('$id','$d') AS days");
        return $result;
    }

    public function getsubs() {
        $sql = $this->db->select("select * from tbl_newsletter where sub=1");
        return $sql;
    }
    public function getemails()
    {
        return $this->db->select("select * from tbl_newsletter where sub=1 order by pk_int_letter_id desc");
      
                
    }
    public function deletemail($id)
    {
        return $this->db->select("delete from tbl_newsletter where pk_int_letter_id=$id");
    }

}
?>