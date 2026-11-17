<?php



/**

 * Description of View

 *

 * @author Niyas

 */

class View {



    function __construct() {

        //echo 'this is the view';

    }



    public function render($name, $header = true, $footer=true) {

        if ($header == true) {


            require 'views/common/headder.php';

        }

//        if ($loginheadder == true) {

//            require 'views/common/login-headder.php';

//        }

        require 'views/' . $name . '.php';

        if ($footer == true) {

            require 'views/common/footer.php';

        }

    }

    

      public function renderAdmin($name, $include = true) {

        if (isset($this->xhr)) {

            require 'views/' . $name . '.php';

            exit;

        }

        require 'views/common/head.php';

        if ($include == true) {

            require 'views/common/adminHeader.php';

        }

        if ($include == true) {

            require 'views/common/adminSide.php';

        }

        require 'views/' . $name . '.php';

        if ($include == true) {

            require 'views/common/adminFooter.php';

        }

        require './views/common/foot.php';

    }

    

    public function rendererror(){

        require 'views/error/index.php';

    }



}

