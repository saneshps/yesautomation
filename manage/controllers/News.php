<?php
class News extends Controller {



    function __construct($name) {

        parent::__construct($name);
		
		parent::projects_enq();
		
        $this->seo();

    }



    public function index() {
      
	  // $this->view->active= "news"; 
	  $this->view->news = $this->model->news();
      $this->view->render('front/news/index',false,false);
      
	}
	
	 public function details($id) {
      
	   //$this->view->active= "news"; 
	  $this->view->details = $this->model->details($id);
	  $this->view->ournews = $this->model->ournews($id);
	  //$this->view->newsid = $this->model->newsid($id);
	  //$this->view->slider = $this->model->slider($id);
	  	  $this->view->newsid = $this->model->newsid($id);
	  	  //$this->view->recentnews = $this->model->recentnews($id);
	  	  //$this->view->newsByid = $this->model->newsByid($id);
      $this->view->render('front/news/news-details_test',false,false);
	 }
	  
 
	 
}