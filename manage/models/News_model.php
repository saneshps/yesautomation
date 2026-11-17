<?php
class News_Model extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function news() {
		
        return $this->db->select('SELECT news.id as newid,news.Title,news.tstamp,news.Description,news_image.id,news_image.nid,news_image.file from news join news_image ON news.id=news_image.nid group by news.id order by news.tstamp');
    }
	
	public function details($id) {
		
        return $this->db->select("SELECT news.id as newid,news.Title,news.tstamp,news.Description,news_image.id,news_image.nid,news_image.file from news join news_image ON news.id=news_image.nid where news.id='$id'  group by news.id order by news.tstamp");
    }
	

	/*public function newsByid($id) {



        return $this->db->select("select news.id as newid, news_image.id, news.Title,news.Description,news_image.file from news join news ON news.news_image = news_image.id where news.news_image='$id'");



    }*/
	
    public function ournews($id) {
		
        return $this->db->select("SELECT news.id as newid,news.Title,news.tstamp,news.Description,news_image.id,news_image.nid,news_image.file from news join news_image ON news.id=news_image.nid  where news.id!=$id group by  news.id order by news.tstamp");
    }
	
	
	
	public function detail($id) {
		
        return $this->db->select("SELECT news.id as newid,news.Title,news.tstamp,news.Description,news_image.id,news_image.nid,news_image.file from news join news_image ON news.id=news_image.nid where news.id='$id'  group by news.id order by news.tstamp");
    }
	 public function newsid($id) {
		
        return $this->db->select("SELECT news.id,news_image.id,news_image.file,news.Title,news.Description,news.tstamp,news_image.nid from news join news_image ON news.id=news_image.nid where news.id=$id group by news_image.nid order by news.tstamp");
    }
	
      /*public function recentnews($id) {
		
        return $this->db->select("SELECT news.id,news_image.id as newid,news_image.file,news.Title,news.Description,news_image.nid from news join news_image ON news.id=news_image.nid where news.id!='$id' group by news.id desc  limit 4");
    }*/
}
?>