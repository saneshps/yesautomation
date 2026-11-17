<?php
class ManageTeam extends Controller {

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

  /*  public function Gallery() {
        if (isset($_FILES['file'])) {
            $j = 0; // variable for indexing upload image
            $target_path = $_SERVER['DOCUMENT_ROOT'] . '/kbff/manage/public/uploads/gallery/';
            for ($i = 0; $i < count($_FILES['file']['name']); $i++) {
                $name = $_FILES['file']['name'][$i];
                $arr = explode('.', $name);
                $rand = rand();
                $newimg1 = $rand . '.' . $arr[1];
         $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/gallery/';
         $target_path1=$_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/test/';
         
           
            
                //  echo $target_path;exit;
                $tmp_name = $_FILES["file"]["tmp_name"][$i];
                $target_path = $target_path . basename($newimg1);
                 move_uploaded_file($tmp_name, $target_path);
                 $im = new Imagick();
                $im->readImage($target_path);
                $geo=$im->getImageGeometry();

$size_w=$geo['width'];

$size_h=$geo['height'];

$im->setImageResolution(160,108);
$im->setImageFormat('jpeg');
$im->setImageCompression(imagick::COMPRESSION_JPEG); 
$im->setImageCompressionQuality(100);
$im->resizeImage(160,108, imagick::FILTER_LANCZOS, 0.9, FALSE);
$im->writeImage($target_path1.$newimg1);


               

                $tmpimage[] = $newimg1;
            }
            $this->model->getaddimages($tmpimage, $_POST);
        }
        $this->view->js[] = URL . 'views/manageTeam/js/Addga.js';
        $this->view->getimages=$this->model->getimages();
       
        $this->view->renderAdmin('manageTeam/Addgallery');
    }

    public function AddNews() {
        if (isset($_POST['submit1'])) {
            $this->img = $_FILES['file']['name'];

            $this->arr = explode('.', $this->img);
            $this->rand = rand();
            $this->newimg = $this->rand . '.' . $this->arr[1];
            //$target_path = 'http://adoxsolutions.in/projects/kbff/manage/public/uploads/news/';
            $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/news/';
            
            
            
     
            $tmp_name = $_FILES["file"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);

           $t= move_uploaded_file($tmp_name, $target_path);
           

            $this->view->addd = $this->model->addnwes($this->newimg, $_POST);
        }
         $this->view->getnews = $this->model->getnews();
           $this->view->js[] = URL . 'views/manageTeam/js/Addga.js';
        $this->view->js[] = URL . 'views/manageTeam/js/addproduct.js';
        $this->view->renderAdmin('manageTeam/addnews');
    }
           public function editnews($id)
           {    
               $this->view->js[] = URL . 'views/manageTeam/js/addproduct.js';
               $this->view->geteditnews=$this->model->GetEditnews($id);
               $this->view->renderAdmin('manageTeam/editnews');
              
               
           }
           public function updatenews()
           {
//               echo'<pre>';
//               print_r($_FILES);exit;
               if($_FILES['image']['error']==0)
               {
                
                  
                    $this->img = $_FILES['image']['name'];
            $this->rand = rand();
            $this->arr = explode('.', $this->img);
            $this->newimg = $this->rand . '.' . $this->arr[1];

             $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/news/';


            $tmp_name = $_FILES["image"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);

            move_uploaded_file($tmp_name, $target_path);
            $this->model->updateimagenews($_POST, $this->newimg);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/AddNews');
        } else {
            $this->model->updatedata($_POST);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/AddNews');
        }
        
    }
           public function deletenews($id) {
        $this->view->try = $this->model->getdetail($id);
        $img = $this->view->try[0]['image'];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/kbff/manage/public/uploads/news/' . $img;
        if (is_file($path)) {
            unlink($path);
        }
        $this->model->deletenews($id);
        header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/AddNews');
    }
    public function viewalbum($id)
    {
        $this->view->js[] = URL . 'views/manageTeam/js/Addga.js';
       $this->view->getalbum=$this->model->getalbum($id);
       $this->view->renderAdmin('manageTeam/viewimages');
        
    }
    public function deletegallery($id)
    {
       $this->view->try = $this->model->getgalimag($id);
      foreach( $this->view->try as $img)
      {
          $img=$img['image'];
          $path = $_SERVER['DOCUMENT_ROOT'] . '/kbff/manage/public/uploads/gallery/' . $img;
        if (is_file($path)) {
            unlink($path);
        }
          
      }
      $this->model->deletegallery($id);
        header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Gallery');
    }
     
     public function editinimages($id)
     {
        $this->view->getimages=$this->model->getimagesin($id);
        $this->view->renderAdmin('manageTeam/updateimages');
     }
     public function updatimages()
     {
         $ids=$_POST['hidden1'];
        
           $this->img = $_FILES['image']['name'];
           
            $this->rand = rand();
            $this->arr = explode('.', $this->img);
            $this->newimg = $this->rand . '.' . $this->arr[1];
            
               

                  $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/gallery/';


            $tmp_name = $_FILES["image"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);
           

            move_uploaded_file($tmp_name, $target_path);
            $this->model->updateimag($_POST, $this->newimg);
           header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/viewalbum/'.$ids.'');
            
         
     }
     public function deletinimages($id)
     {
         $this->view->try=$this->model->getimgin($id);
        $image=$this->view->try[0]['image'];
     }
     
       public function deletnewsall()
       {
          $this->model->getdelatenews($_POST);
           header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/AddNews');
          
       }
       public function deleteimages($id)
       {
            $this->view->try = $this->model->getdelatesingle($id);
           $ids= $this->view->try[0]['fk_gal_id'];
        $img = $this->view->try[0]['image'];
        $path = $_SERVER['DOCUMENT_ROOT'] . 'projects/kbff/manage/public/uploads/news/' . $img;
        if (is_file($path)) {
            unlink($path);
        }
        $this->model->deletegalimg($id);
        
        header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/viewalbum/'.$ids.'');
       }
       public function Addvideos()
       {
           if(isset($_POST['submitv']))
           {
             $this->model->uploadvideos($_POST);
           }
           //$this->view->getvdeo=$this->model->getVdeos();
            //$this->view->js[] = URL . 'views/manageTeam/js/addproduct.js';
           $this->view->js[] = URL . 'views/manageTeam/js/Addga.js';
           $this->view->js[] = URL . 'views/manageTeam/js/reCopy.js';
           $this->view->renderAdmin('manageTeam/Addvideos');
       }
       public function viewvideoalbum($id)
       {
          $this->view->getalbum=$this->model->getAlbumbyid($id);
           $this->view->renderAdmin('manageTeam/viewvdeo');
         
       }
       public function deletevedoes($id)
       {
          $this->model->deletevdeos($id);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addvideos');
          
       }
       public function deletevdeosall($id)
       {
          $this->model->getdelateallvdeos($id);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addvideos');
          
       }

       public function editvdeos($id)
       {
          $this->view->getvideos=$this->model->getvdeosedit($id);
         $this->view->renderAdmin('manageTeam/editvdeos');
       }
       public function updatevideos()
       {
          $this->model->getupdatedvdeos($_POST);
             header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addvideos');
          
       }
       public function deletegal()
       {
          $this->model->getimagesdel($_POST);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Gallery');
          
       }
       public function deleallimges()
       {
          
           $this->model->deleteall($_POST);
           header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Gallery');
       }
       public function Addevent()
       {   
          
           if(isset($_POST['submite']))
           {
               
              
            $this->img = $_FILES['file']['name'];

            $this->arr = explode('.', $this->img);
            $this->rand = rand();
            $this->newimg = $this->rand . '.' . $this->arr[1];
            //$target_path = 'http://adoxsolutions.in/projects/kbff/manage/public/uploads/news/';
            $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/news/';
            
            
     
            $tmp_name = $_FILES["file"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);

           $t= move_uploaded_file($tmp_name, $target_path);
           

            $this->view->addd1 = $this->model->events($this->newimg, $_POST);
        }
          
            $this->view->getnews = $this->model->getEvents();
            $this->view->js[] = URL . 'views/manageTeam/js/Addga.js';
            $this->view->js[] = URL . 'views/manageTeam/js/addproduct.js';
            $this->view->renderAdmin('manageTeam/addevents');
       }
       public function editevents($id)
       {
           $this->view->js[] = URL . 'views/manageTeam/js/addproduct.js';
               $this->view->geteditnews=$this->model->GetEditevents($id);
               $this->view->renderAdmin('manageTeam/editevents');
       }
       public function deletevents($id)
       {
         $this->view->try = $this->model->getdetail1($id);
        $img = $this->view->try[0]['image'];
        $path = $_SERVER['DOCUMENT_ROOT'] . '/kbff/manage/public/uploads/news/' . $img;
        if (is_file($path)) {
            unlink($path);
        }
        $this->model->deletevents($id);
        header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addevent');
       }
       public function deleteventall()
       {
            $this->model->getdelatevents($_POST);
           header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addevent');
       }
       public function updatevents()
       {
           if($_FILES['image']['error']==0)
               {
                
                  
                    $this->img = $_FILES['image']['name'];
            $this->rand = rand();
            $this->arr = explode('.', $this->img);
            $this->newimg = $this->rand . '.' . $this->arr[1];

             $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/news/';


            $tmp_name = $_FILES["image"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);

            move_uploaded_file($tmp_name, $target_path);
            $this->model->updateimagenews1($_POST, $this->newimg);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addevent');
        } else {
            $this->model->updatedata1($_POST);
            header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/Addevent');
        }
        
       }
       public function getadd()
       {
           $ids=$_POST['hidden'];
            $this->img = $_FILES['file']['name'];

            $this->arr = explode('.', $this->img);
            $this->rand = rand();
            $this->newimg = $this->rand . '.' . $this->arr[1];
            //$target_path = 'http://adoxsolutions.in/projects/kbff/manage/public/uploads/news/';
            $target_path = $_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/gallery/';
            $target_path1=$_SERVER['DOCUMENT_ROOT'].'/projects/kbff/manage/public/uploads/test/';
            
            
     
            $tmp_name = $_FILES["file"]["tmp_name"];
            $target_path = $target_path . basename($this->newimg);

            move_uploaded_file($tmp_name, $target_path);
        $im = new Imagick();
        $im->readImage($target_path);
        $geo = $im->getImageGeometry();
        $im->setImageResolution(160, 108);
        $im->setImageFormat('jpeg');
        $im->setImageCompression(imagick::COMPRESSION_JPEG);
        $im->setImageCompressionQuality(100);
        $im->resizeImage(160, 108, imagick::FILTER_LANCZOS, 0.9, FALSE);
        $im->writeImage($target_path1 . $this->newimg);
        $this->model->addextraimage($this->newimg, $_POST);
         header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/viewalbum/'.$ids.'');
    }
    public function addvideosall()
    {
        $ids=$_POST['hidden1'];
        $this->model->getaddvdeos($_POST);
        header('Location: http://adoxsolutions.in/projects/kbff/manage/manageTeam/viewvideoalbum/'.$ids.'');
        
    }*/
    public function setting() {
            $this->view->renderAdmin('manageTeam/setting');
       }  
}
?>