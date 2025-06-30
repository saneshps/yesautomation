<?php
class News_manage extends Controller {



    function __construct($name) {



        parent::__construct($name);



        $this->checkAdminLogin();



        $this->view->css[] = CSS . 'bootstrap.css';



        $this->view->css[] = CSS . 'layout.css';



        $this->view->js[] = JS . 'bootstrap.js';



        $this->view->js[] = URL . 'public/ckeditor/ckeditor.js';





        $this->view->title = SITE;



        $this->view->metaKeywords = '';



        $this->view->metaDescription = '';

    }

    

    ////////////////////// ADD NEWS ////////////////////////////////////////////



    public function add() { 
	     
        
        if (isset($_POST['submitn'])) {
			
			
					$title=$_POST['title'];
					$description=$_POST['description'];
					$pro=$this->model->insertnews($_POST);
					
					
					if($pro)
					{
					
					
			       if(isset($_FILES['file'])){

                            $name_array = $_FILES['file']['name'];
                            $tmp_array = $_FILES['file']['tmp_name'];
                            $type_array = $_FILES['file']['type'];
                            $size_array = $_FILES['file']['size'];
                            $error_array = $_FILES['file']['error'];

                            if(!empty($tmp_array)){
                                $i = 0;
                                foreach($tmp_array as $tmp=>$file){
                                    if($error_array[$tmp] ==0){
                                        $file_name = $this->upload_images($file,$type_array[$tmp]);     
                                        $this->model->insertimages($file_name,$pro);
                                    }

                                }
                            }
                            
					}
					}
        }
		
		
        $this->view->getnews = $this->model->getnews();
         $this->view->getnewsimgss = $this->model->getnewsimgss();
    
        //  echo "<pre>";print_r($this->view->getnewsimgss);exit;
		
		$getnewsnotemptyfile = array();
		foreach($this->view->getnews as $key=>$value){
			$pd_id  = $value['id'];
			$reslt = $this->model->getnewsnotemptyfile($pd_id);
			if($reslt){
			
			$value['file']=$reslt[0]['file'];
			
			}
			$getnewsnotemptyfile[$key]=$value;
		} 
		$this->view->getnews = $getnewsnotemptyfile;
		
		
	
        $this->view->renderAdmin('news/add'); 
    }

    ///////////////// HELPER FUNCTIONS /////////////////////////////////////////

    

    function resize($newWidth, $targetFile, $originalFile) {



        $info = getimagesize($originalFile);

        $mime = $info['mime'];



        switch ($mime) {

            case 'image/jpeg':

                $image_create_func = 'imagecreatefromjpeg';

                $image_save_func = 'imagejpeg';

                $new_image_ext = 'jpg';

                break;



            case 'image/png':

                $image_create_func = 'imagecreatefrompng';

                $image_save_func = 'imagepng';

                $new_image_ext = 'png';

                break;



            case 'image/gif':

                $image_create_func = 'imagecreatefromgif';

                $image_save_func = 'imagegif';

                $new_image_ext = 'gif';

                break;



            default:

                throw new Exception('Unknown image type.');

        }



        $img = $image_create_func($originalFile);

        list($width, $height) = getimagesize($originalFile);



        $newHeight = ($height / $width) * $newWidth;

        $tmp = imagecreatetruecolor($newWidth, $newHeight);

        imagecopyresampled($tmp, $img, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);



        if (file_exists($targetFile)) {

            unlink($targetFile);

        }

        $image_save_func($tmp, "$targetFile");

    }

    

    

    /////////////////////// NEWS EDIT  /////////////////////////////////////////

    

    

       public function editnews($id)
        {    
        
            $this->view->getnews=$this->model->getnewsByid($id);
			$this->view->getallimages=$this->model->getallimages($id);
            $this->view->renderAdmin('news/news_edit');
        }
        public function updatenews()
        {	

        	if (isset($_POST['submitn'])) {
			        //print_r($_POST);exit("hello");exit("khggh");
					//print_r($_POST);exit("sadsad");
					$title=$_POST['title'];
					$description=$_POST['description'];
					$pro = $this->model->getupdatenews($_POST);
					//echo $pro; exit;
					//print_r($pro);exit("hello");
					if($pro==true)
					{
					
					
			       if(isset($_FILES['file'])){
						
                            $name_array = $_FILES['file']['name'];
                            $tmp_array = $_FILES['file']['tmp_name'];
                            $type_array = $_FILES['file']['type'];
                            $size_array = $_FILES['file']['size'];
                            $error_array = $_FILES['file']['error'];

                            if(!empty($tmp_array)){
								
                                $i = 0;
                                foreach($tmp_array as $tmp=>$file){
                                    if($error_array[$tmp] ==0){
                                        $file_name = $this->upload_images($file,$type_array[$tmp]); 
					                    $imageeditup = $this->model->updateimages($file_name,$_POST['hidden']);
                                        
										
																			
                                    }

                                }
                            }
                            
					}
					
					}
        }
		
		
             
			 $this->view->getnews = $this->model->getnews();
			 header('Location:'.NEWS.'add');
            
        }
		
		
	       public function deletenews($id)
        {
            $this->view->try = $this->model->getnewsimg($id);
           
		foreach( $this->view->try as $img){
			
		      
			
			$path = $target_path = ABS_PATH . 'public/uploads/news/' . $img['file'];
			$path1 = $target_path2 = ABS_PATH . 'public/uploads/news/thumb_news/' . $img['file'];
		
			
				if (is_file($path)) 
				{
				   unlink($path);
				   if (is_file($path1)) 
					{
					   unlink($path1);
					}
                }
		}
			
			
			$delpro=$this->model->getdeleteimgnews($id);
		if(empty($delpro)){
			$this->model->getdeleteimgnews_image($id);
		}
			header('Location:' .URL.'News_manage/add');
        }
		
		
	
		public function deleteimageonly()
        {
			if(isset($_POST['src'])&& isset($_POST['id'])){
			//print_r($_POST);exit;
            //$this->view->try = $this->model->getproductsimgonly($id); 
           
			//$img = $this->view->try[0]['file'];
			$path = $target_path = ABS_PATH . 'public/uploads/news/' . $_POST['src'];
			$path1 = $target_path2 = ABS_PATH . 'public/uploads/news/thumb_news/' .$_POST['src'] ;
			
			
				if (is_file($path)) 
				{
				    unlink($path);
					   if(is_file($path1)) 
					{
					   unlink($path1);
					}
				}
			
			
				$this->model->getdeleteimgonly($_POST['id']);
				//echo'hai';
					
				
				
			
			
					 
			
        }
	}


    
    

    //////////// CHANGE STATUS /////////////////////////////////////////////////

    

    public function status(){

       

        $out = false;

        if(isset($_POST['id']) && isset($_POST['chkbxval'])){

            

           

            

           

            $ch  = $_POST['chkbxval'];

            $id = $_POST['id'];

            if($ch==1){

                

                   $arr = array("nw_status"=>'1','id'=>$id);

                   

                   $res =  $this->model->update_status($arr);

            }else{

                

                $arr = array("nw_status"=>'0','id'=>$id);

                $res =  $this->model->update_status($arr);

            } 

         

            if($res){

                $out = true;

            }else{

                $out = false;

            }

        }

        

        echo $out;

        

    }

	////////////////////  Image rotation /////////////////////////////////////////
	public function Rotatepng()
    {
    	//print_r($_POST);exit;
    	 $img_name=$_POST['img_name'];
    	 $degree=$_POST['degree'];
    	 $path=$_POST['path'];
    	 $path1 = $target_path2 = ABS_PATH.'public/uploads/news/' . $img_name;
    	
    	 $this->Rotatetopng($path1,$degree,$path1);

    
    }
public function Rotatetopng($filename = '',$angle = 0,$savename = false)
    {
    	
        // Your original file
        $original   =   imagecreatefrompng($filename);
        // Rotate
        $rotated    =   imagerotate($original, $angle, 0);
        // If you have no destination, save to browser
        if($savename == false) {
                header('Content-Type: image/png');
                imagepng($rotated);
            }
        else
            // Save to a directory with a new filename
            imagepng($rotated,$savename);

        // Standard destroy command
        imagedestroy($rotated);
    }
    public function RotateJpg()
    {
    	//print_r($_POST);exit;
    	 $img_name=$_POST['img_name'];
    	 $degree=$_POST['degree'];
    	 $path=$_POST['path'];
    	 $path1 = $target_path2 = ABS_PATH.'public/uploads/news/' . $img_name;
    	
    	 $this->RotateJpeg($path1,$degree,$path1);

    
    }
   public function RotateJpeg($filename = '',$angle = 0,$savename = false)
    {
    	
        // Your original file
        $original   =   imagecreatefromjpeg($filename);
        // Rotate
        $rotated    =   imagerotate($original, $angle, 0);
        // If you have no destination, save to browser
        if($savename == false) {
                header('Content-Type: image/jpeg');
                imagejpeg($rotated);
            }
        else
            // Save to a directory with a new filename
            imagejpeg($rotated,$savename);

        // Standard destroy command
        imagedestroy($rotated);
    }

    public function delete_all($id){

        

        ////////////////CHECK IF DELETE BUTTON IS CLICKED OR SUBMITTED /////////

        

        if(isset($_POST['deleeter'])){

			

			//print_r($_POST);exit;

			$this->view->try = $this->model->getnewsimg($id);

        $img = $this->view->try[0]['nw_image'];

        $path = $target_path = ABS_PATH.'public/uploads/news/' . $nw_image;

        $path1 = $target_path2 = ABS_PATH.'public/uploads/news/thumb_news/' . $nw_image;

       

        

        if (is_file($path)) {

            unlink($path);

            if (is_file($path1)) {

                unlink($path1);

            }

        }

            

             $this->model->delete_checked($_POST);

        }

        

        /////// AFTER DELETION REDIRECT TO HOME PAGE OF NEWS //////////////////

        

        header('location:'.NEWS.'add');

        exit;

        

    }
	
	public function upload_images($file,$type){
	              
						
			$target_path = ABS_PATH.'public/uploads/news/';
			$target_path2 =ABS_PATH.'public/uploads/news/thumb_news/';
	
	
				
						$exp = explode("/", $type);
						$ext = end($exp);
	
					
						
						
	
						
						$new_name = rand().'_'.time().'.'.$ext;
						
	
						
						$upload_path = $target_path.$new_name;
						
	
					
						
	
						
					 list($width,$height) = getimagesize($file);
					 
					 
	
					 
					 if($width>1200 && $height> 800){
	
						 
						$file_name = $new_name ;
						$this->resize(1200,$target_path.$new_name,$file); 
						$this->resize(375,$target_path2.$new_name,$file); 
						
						echo '<script> alert("Image has been resized and Uploaded successfully");</script>'; 
						   
					 }else{
						 
						 $this->resize(375,$target_path2.$new_name,$file); 
						 
	
						
						if(move_uploaded_file($file, $upload_path)){
							
							echo '<script> alert("Uploaded successfully");</script>';
							
							$file_name = $new_name;
							
						}else{
							 echo '<script> alert(" Image not uploaded");</script>';
				
							
						}
						 
					 }
						
						return $file_name;
						
		}
}