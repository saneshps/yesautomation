<?php
@session_start();
define('URL', 'https://yesautomation.ae/manage/');
define("ABS_PATH", $_SERVER['DOCUMENT_ROOT'] . "/manage/");

//-----------------------------SERVER---------//

//error_reporting(0);

define('LIBS', 'libraries/');
define('JS', URL . 'public/js/');
define('JSLIDE', URL . 'public/js_slide_pane/');
define('CSS', URL . 'public/css/');
define('VTICKER', URL . 'public/vticker/');

define('VIEW', 'view/');
define('DOWNLOADS', URL . 'Downloads/');
define('UPLOADS', URL . 'public/uploads/');
define('UPLOADSFRONT', URL . 'public/uploads/images/');
define('HOME', URL . 'Home/');
define('SERVICE', URL . 'Service/');


//WEB_SITE_NAME

define('SITE',  'Yesautomation');

//BANNER

define('BANNER', URL. 'Banner_manage/');

//PROJECTS

define('PROJECTS', URL . 'Projects_manage/');

//CATEGORY

define('CATEGORY', URL . 'Category_manage/');

//CATEGORYM
define('CATEGORYM', URL . 'CategoryM_manage/');

//PRODUCTS

define('PRODUCTS', URL . 'Products_manage/');

//ADMIN

define('ADMIN', URL . 'manage/');

//NEWS

define('NEWS', URL . 'News_manage/');

//GALLERY

define('GALLERY',URL.'Gallery_manage/');

//CLIENT

define('CLIENT',URL.'Client_manage/');

//CAREERS

define('CAREERS',URL.'Careers_manage/');

//TESTIMONIAL

define('TESTIMONIAL',URL.'Testimonial_manage/');

//ARABIC

define('ARABIC',URL.'ar/manage/');

//DEFAULT_IMAGE

define('DEFAULT_IMAGE',URL. 'images/');

//ALBUM

define('ALBUM', URL . 'Album_manage/');

//MEDIA

define('MEDIA', URL . 'Media_manage/');



define('SERVICES_CAT', URL . 'Service/');
define('BROCHURE',URL.'Brochure/');
define('CAREER',URL.'Career/');
define('CONTACTUS',URL.'Contactus/');

define('MANAGE_TEAM',URL.'manageTeam/setting/');
define('MANAGE_USER',URL.'manageUser/');

define('VIDEOS',URL.'videos/');



define('MANAGE', URL . 'manage/');
define('MANAGE_CLIENTS', URL . 'ManageClients/');


define("UPLOAD_PATH", ABS_PATH . "public/uploads/");
define('MENU', URL . 'public/pdf/menu.xlsx');
define('IMAGE', URL . 'public/images/');
define('CAPTCHA', URL . 'public/captcha/');
define('UPLOAD_DOCUMENT_SUPPORTS', 'doc|docx|pdf|xls|csv');
define('IMG', URL.'public/images/');
define('INDEX', URL.'index/');
define('AJAX', URL.'ajax/');
define('USERIMAGES', URL.'public/users/usersimages/');
define('LOGIN', URL.'public/login/');

//sales

define("SMTP_HOST", "ssl://smtp.gmail.com");
define("SMTP_USER", "sales@alnukhbah.com");
define("SMTP_PORT", "465");
define("SMTP_PASSWORD", "niyas1234");

define("SMTP_HOST_SALES", "ssl://smtp.gmail.com");
define("SMTP_USER_SALES", "sales@alnukhbah.com");
define("SMTP_PORT_SALES", "465");
define("SMTP_PASSWORD_SALES", "niyas1234");

define("SMTP_HOST_SUPPORT", "ssl://smtp.gmail.com");
define("SMTP_USER_SUPPORT", "sales@alnukhbah.com");
define("SMTP_PORT_SUPPORT", "465");
define("SMTP_PASSWORD_SUPPORT", "niyas1234");



define('USER_ID', 'AlNuKhBaH');
define('TOKEN', 'AlNuKhBaHToken');
define('SESSION_ID', 'AlNuKhBaHSessionId');

//---------------------------local
define('DB_TYPE', 'mysql');
define("DB_HOST", "localhost");
define("DB_USER", "hcoyym1o_yesauto");
define("DB_NAME", "hcoyym1o_yesautomation");
define("DB_PASS", "~)eD81mTlFD2");

//--------server-------------



// The sitewide hashkey, do not change this because its used for passwords!
// This is for other hash keys... Not sure yet
//define('HASH_GENERAL_KEY', 'MixitUp200');
//
//// This is for database passwords only
//define('HASH_PASSWORD_KEY', 'catsFLYhigh2000miles');
define('ADMIN_ID', 'AlNuKhBaHAdminId');
define('ADMINTOKEN', 'AlNuKhBaHAdminToken');

// The sitewide hashkey, do not change this because its used for passwords!
// This is for other hash keys... Not sure yet
//define('HASH_GENERAL_KEY', 'MixitUp200');
define('HASH_TOKEN_KEY', 'NiYaZcAliCut');
define('HASH_SALT_KEY', 'nIyAsatlIvEdOtCoM');
define('HASH_PASSWORD_KEY', 'N9i9Y9a9Zc0A0l0i0C0u0t');
/**
 * Description of Config
 *
 * @author Niyas <niyast@live.com>
 */



// un: ADMIN
// pw  : 0dc7f5c7e5b08e4b78662655c7298bfdd6276afb71915ac1d7ac126505facd87
// salt : 6681ea70fadc29b834c3f3ffb6dfa521
// email : preshbin@adoxsolutions.com