    <?php
  

  
function getgallaryimages() {
    
    
   // echo $id;exit;
    $products = mysql_query("select * from images");
    
    return $products;
}

 function productionhalls()
 {
    // echo 'hello';exit;
     $prdction=mysql_query("select * from productionhalls order by id desc");
     return $prdction;
 }
 function liningpreparation()
 {
     //echo 'hi';exit;
     $lining=mysql_query("select * from liningpreparation");
     return $lining;
 }
  
 function factory()
 { 
     $fac=mysql_query("select * from factory order by id desc");
     return $fac;
 }
 function productionStep()
 {
     $prodctionstep=mysql_query("select * from productionlist order by id desc");
     return  $prodctionstep;
 }
 function productionControl()
 {
     $prodctioncontrol=mysql_query("select * from productionquality");
     return $prodctioncontrol;
 }
function getServicebyID()
{
    
}

?>