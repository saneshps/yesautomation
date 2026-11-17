<?php
/**

 * Description 

 *673602

 * @author Shanu 

 */
class ManageUser extends Controller {



    function __construct($name) {

        parent::__construct($name);

        $this->checkAdminLogin();

        $this->view->css[] = CSS . 'ie.css';

       

        $this->view->js[] = JS . 'hideshow.js';

        $this->view->js[] = JS . 'jquery.tablesorter.min.js';

        $this->view->js[] = JS . 'jquery.equalHeight.js';

        $this->view->js[] = JS . 'jquery.lightbox_me.js';
        $this->view->css[] = CSS . 'bootstrap.css';
         
        $this->view->css[] = CSS . 'layout.css';

        

          


      



        $this->view->js[] = JS . 'bootstrap.js';

        $this->view->title = SITE;

        $this->view->metaKeywords = '';

        $this->view->metaDescription = '';

    }



    public function index() {

        $this->view->users = $this->model->getAllUsers(array('from' => 0, 'to' => 20));

        $this->view->pathFlow = array('User', 'Manage');

        $this->view->renderAdmin('manageUser/manage');

    }

    

       public function xhrChangeStatus() {

        $this->model->updateUser(array('status' => $_POST['status']), $_POST['id']);

        echo json_encode(array('status' => 'updated'));

        exit;

    }

    

    public function loginDetails(){

        $this->view->logInDetails = $this->model->getLoginDetails(array('from' => 0, 'to' => 20));

        $this->view->pathFlow = array('User', 'Login Details');

        $this->view->renderAdmin('manageUser/loginDetails');

    }

    

        public function delete($userID) {

        $this->model->update(array('status' => 2), $userID);

        header('location:' . MANAGE_USER);

    }
    public function password(){
                  $this->view->get=$this->model->getadmin();
                  $this->view->renderAdmin('manageUser/change_password');
    }

    

        public function changePassword() {

        $userId = Session::get(ADMIN_ID);

     /*  echo $userId;exit;*/

        if (isset($_POST['subUser'])) {
            

            if ($_POST['new'] == $_POST['confirm']) {
                //print_r($_POST); exit;
                $this->view->adminUser = $this->model->getUser($userId);

                $currentPassword = Hash::create('sha256', md5($_POST['current'] . 'mfm'), HASH_PASSWORD_KEY);

              //  echo $currentPassword;exit;

                if ($currentPassword == $this->view->adminUser['Password']) {

                    $this->model->updateAdminUser(array('email' => $_POST['email'], 'userName' => $_POST['userName'],

                        'password' => Hash::create('sha256', md5($_POST['new'] . 'mfm'), HASH_PASSWORD_KEY),

                        'salt' => md5(sha1(md5($_POST['userName'] . time() . 'mfm' . rand(10000, 9999999999) . $_POST['new'])))), $userId);

                    $this->view->status = 'success';

                } else {

                    $this->view->status = 'invalid';

                }

            } else {

                $this->view->status = 'mismatch';

            }

        }

        $this->view->adminUser = $this->model->getUser($userId);

        $this->view->pathFlow = array('Settings', 'Change Password');

        $this->view->renderAdmin('manageUser/change_password');

    }


public function changePassword1($id) {

        $userId = Session::get(ADMIN_ID);

//        echo $userId;exit;

        if (isset($_POST['logUser'])) {

            if ($_POST['new'] == $_POST['confirm']) {

                $this->view->loginUser = $this->model->getlogin($id);

                $currentPassword =  md5($_POST['current']);

//                echo $currentPassword;exit;

                if ($currentPassword == $this->view->loginUser['password']) {

                    $this->model->updateloginuser(array('username' => $_POST['userName'],

                        'password' =>  md5($_POST['new'])),$id);


                        //'salt' => md5(sha1(md5($_POST['userName'] . time() . 'mfm' . rand(10000, 9999999999) . $_POST['new'])))), $userId);

                    $this->view->status = 'success';

                } else {

                    $this->view->status = 'invalid';

                }

            } else {

                $this->view->status = 'mismatch';

            }

        }

        $this->view->loginUser = $this->model->getlogin($id);

        $this->view->pathFlow = array('Settings', 'Change Password');

        $this->view->renderAdmin('manageUser/changePassword_user');
 }}