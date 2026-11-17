<?php
class Index extends Controller {



    function __construct($name) {

        parent::__construct($name);
		parent::projects_enq();
		
        $this->seo();

    }



    public function index() {
      
	  $this->view->home = $this->model->home();
      $this->view->render('front/home/index',false,false);
      
	 
	
    

        
        
    }


 

}