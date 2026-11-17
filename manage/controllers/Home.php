<?php
class Home extends Controller {



    function __construct($name) {



        parent::__construct($name);



        $this->checkAdminLogin();



        $this->view->css[] = CSS . 'bootstrap.css';



        $this->view->css[] = CSS . 'layout.css';



        $this->view->js[] = JS . 'bootstrap-datepicker.js';



        $this->view->js[] = JS . 'bootstrap.js';



        $this->view->js[] = URL . 'public/ckeditor/ckeditor.js';

        



        $this->view->title = SITE;



        $this->view->metaKeywords = '';



        $this->view->metaDescription = '';

    }



        public function Addhome() { 
       
	

   

        if (isset($_POST['submitp'])) {



            $this->img = $_FILES['file']['name'];

      

            $this->arr = explode('.', $this->img);

            $this->rand = rand();

            $this->newimg = $this->rand . '.' . $this->arr[1]; //print_r($this->arr);

            $target_path = ABS_PATH.'public/uploads/home/';



            $tmp_name = $_FILES["file"]["tmp_name"];

            $target_path = $target_path . basename($this->newimg);

			

            list($width, $height) = getimagesize($tmp_name);

			if($width>1000)

			{

			$this->resize(500, $target_path, $tmp_name);

			}

			else{

		

            $t = move_uploaded_file($tmp_name, $target_path);

			}//echo $target_path;

			

        $this->model->inserthome($_POST, $this->newimg);

		//return $tmp_name;

        }
      
		

        $this->view->gethome = $this->model->gethome();
          
        $this->view->renderAdmin('home/addhome');

    }

    public function add_home_bottom_section(){

        

          if(isset($_POST['submit_ns'])){

             $this->model->home_bottom_section($_POST); 

          }

          $this->view->renderAdmin('home/add_home_bottom_section');

        

    }

	

    public function add_home_bottom_section_edit(){

        

          if(isset($_POST['submit_hm'])){

               $this->model->home_bottom_section_update($_POST); 

          }

          $this->view->get_home_bottom_details = $this->model->get_home_bottom_details(); 

          $this->view->renderAdmin('home/add_home_bottom_section_edit');

        

    }





     ///////add bannere ssection/////////////////////       

     public function add_banner_section(){

          

          

          $this->view->get_home_banner = $this->model->get_home_banner(); 

          $this->view->renderAdmin('home/add_banner_section');

          

     }  

     

     ////////// ajax posted form data////////////////////
     public function get_all_banner_images() {
       
       $output='';
       if(isset($_POST['img'])){
               $this->bnsss = $this->model->get_home_banner();
               if(!empty($this->bnsss)){
                   foreach($this->bnsss as $bn){

                                               $output.='<div class="col-md-2 delete_'.$bn['id'].'"  style="overflow:hidden;"><div class="row" style="text-align:center;"><img  style="width:100%;height:auto; height: 110px;  padding:1%;" src="'.URL.'public/uploads/home/banner/'.$bn['banner'].'"></div><a style="cursor:pointer;" url="'.HOME.'delete_banner_images/'.$bn['id'].'" class="delete-img" id="'.$bn['id'].'" >Delete this image</a></div>';

                    }
                }
                else{
                    $output.='Nothing to display';
                }
                if($_POST['img']=='hide'){
                $out = Array("cht"=>'show',"cont"=>$output);
                }
                else{
                     $out = Array("cht"=>'hide',"cont"=>$output);
                }
        }
        echo json_encode($out);

     }
     public function upload_banner_images() {

         sleep(2);

         if(isset($_FILES['img'])){

             $name = $_FILES['img']['name'];

             $tmp = $_FILES['img']['tmp_name'];

             $error = $_FILES['img']['error'];

             $target = $_SERVER['DOCUMENT_ROOT'].'/manage/public/uploads/home/banner/';

             $allowed_files = Array('jpg','jpeg','png');

            $output = '';

            $status_msg = '';

            $out = Array();

             if($tmp){

                 

                 

                        if($error==0){

                               $exp = explode('.',$name);

                            

                               $ext = end($exp);

                               $rand  = rand().time();

                             if(in_array($ext, $allowed_files)){

                            



                               /////// resize/////////////////////////////////

                               list($width,$height) = getimagesize($tmp);

                               if($width<1950 && $height<665){

                                   if(move_uploaded_file($tmp, $target.$rand.'.'.$ext)){

                                       $fn = $rand.'.'.$ext;

                                      $status_msg = '<strong style="color:green;">Image uploaded successfully!!</strong>';

                                   }else{

                                       $status_msg = '<strong style="color:red;">Image not uploaded</strong>';

                                   }

                               }else{

                                   $fn = $this->resize(1921,$target,$tmp);

                                    $status_msg = '<strong style="color:green;">Image resized and uploaded successfully!</strong>';

                               }

                               

                               $this->model->upload_banner_images($fn);

                               $this->bannerss = $this->model->get_home_banner();

                               foreach($this->bannerss as $bn){

                                   $output.='<div class="col-md-2 delete_'.$bn['id'].'"  style="overflow:hidden;"><div class="row" style="text-align:center;"><img  style="width:100%;height:auto; height: 110px;  padding:1%;" src="'.URL.'public/uploads/home/banner/'.$bn['banner'].'"></div><a style="cursor:pointer;" url="'.HOME.'delete_banner_images/'.$bn['id'].'" class="delete-img" id="'.$bn['id'].'" >Delete this image</a></div>';

                               }

                               

                               

                        }else{

                           $status_msg.= '<strong style="color:red;">File format not allowed</strong>';

                        }

                  }else{

                      

                       $status_msg.= '<strong style="color:red;">Error in uploading</strong> please try again';

                  }

             }else{

                 $status_msg.=  '<strong style="color:red;">Please select a file to upload!</strong>';

             }

            // echo json_encode($status);

             $out = Array("status_msg"=>$status_msg,"content"=>$output); 

             echo json_encode($out);

            

         }

     }

     //////// banner delete section////////////////////////////////////

     

     public function delete_banner_images(){

         

            if(isset($_POST['id'])){

                $id = $_POST['id'];

                $this->view->try = $this->model->get_banner_img_by_id($id);

           

			$img = $this->view->try[0]['banner'];

			$path = $target_path = ABS_PATH.'public/uploads/home/banner/' . $img;

			if (is_file($path)) {

                             unlink($path);

                        }

	       $this->model->delete_banner_images($id);

            

            }

     }

     ////// image resize section //////////////////////////////////////

     public function resize($newWidth, $targetFile, $originalFile) {



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

    $rand = rand().time();

    $filename = $rand.'.'.$new_image_ext;

    if (file_exists($targetFile. $rand.'.'.$new_image_ext)) {

            unlink($targetFile);

    }

    $image_save_func($tmp, $targetFile. $rand.'.'.$new_image_ext);

    return $filename;

}









	   	

        public function edithome($sid)

        {    

        

            $this->view->gethome=$this->model->gethomeByid($sid);

			       $this->view->js[] = URL . 'public/ckeditor/ckeditor.js';

            $this->view->renderAdmin('home/edithome');

        }

        public function updathome()

        {	

            if (($_FILES['image']['error'] == 0)) {

            $this->img = $_FILES['image']['name'];





            $this->arr = explode('.', $this->img);

            $this->rand = rand().time();
			      $ext = end($this->arr);
            $this->newimg = $this->rand . '.' . $this->arr[1];                        

            $target_path = ABS_PATH.'public/uploads/home/';
				
				    $allowed_files = Array('jpg','jpeg','png');


            $tmp_name = $_FILES["image"]["tmp_name"];

            $target_path = $target_path . basename($this->newimg);

			if(in_array($ext,$allowed_files))
			{
			 
				if(move_uploaded_file($tmp_name, $target_path))
				{
					echo "<script> alert('Uploaded Successfully'); </script>";
				} else{
					echo "<script> alert('Image Not Uploaded'); </script>";
				}
			
			}
        }

            $this->model->getupdatehome($_POST,$this->newimg);

           header('Location:'.URL.'Home/Addhome');

            

        }

        public function deletehome($sid)

        {

            $this->view->try = $this->model->gethomeimg($sid);

           

			$img = $this->view->try[0]['image'];

			$path = $target_path = ABS_PATH.'public/uploads/home/' . $img;

			if (is_file($path)) {

            unlink($path);

        }

			$this->model->getdeleteimghome($sid);

			header('Location:'.URL.'home/Addhome');

        }
        /////////////////Allowed extension////////////////////////
        public function check_extension()
        {


        	if(isset($_POST['image'])){
        		$status_message='';
        		$explo = explode('.',$_POST['image']);
        		$ext = end($explo);
        		$allowed_extensions = Array('jpg','png','jpeg');
        		
        		if(!in_array($ext, $allowed_extensions))
        		{
 					$status_message = "please Select an image type <strong> jpg,png,jpeg</strong>";
        		}
        		else{

        			 $status_message = 'ok fine you can upload this image';
        		}
        		echo $status_message; 
        	}
        }
		

}