<?php

class Bootstrap {

    function __construct() {
        require LIBS . 'phpMailer/mailUtil.php';
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $url = explode('/', $url);

        if (empty($url[0])) {
            $url[0] = 'index';
            $url[1] = 'index';
        }

        $file = 'controllers/' . $url[0] . '.php';
        if (file_exists($file)) {
            require $file;
        } else {
            $this->error();
            return FALSE;
        }

        $controller = new $url[0]($url[0]);
        $controller->loadModel($url[0]);

     
        if (isset($url[1])) {
            $controller->includeJs($url[0], $url[1]);
        } else if (isset($url[0])) {
            $controller->includeJs($url[0], 'index');
        } else {
            $controller->includeJs('index', 'index');
        }
        // calling methods
        if (isset($url[2])) {
            if (method_exists($controller, $url[1])) {
                $controller->{$url[1]}($url[2]);
            } else {
                $this->error();
            }
        } else {
            if (isset($url[1])) {
                if (method_exists($controller, $url[1])) {
                    $controller->{$url[1]}();
                } else {
                    $this->error();
                }
            } else {
                if (isset($url[0])) {
                    if (method_exists($controller, 'index')) {
                        $controller->index();
                    } else {
                        $this->error();
                    }
                }
            }
        }
    }

    function error() {
        require 'controllers/error.php';
        $controller = new Error();
        $controller->index();
        return false;
    }

}

?>