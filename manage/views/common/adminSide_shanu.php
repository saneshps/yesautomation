<aside id="sidebar" class="column">
    <form class="quick_search">
        <input type="text" value="Quick Search" onfocus="if (!this._haschanged) {
            this.value = ''
        }
        ;
        this._haschanged = true;">
    </form>
    <hr/>
    <h3>Production</h3>
    <ul class="toggle">

        <li class="icn_new_article"><a href="<?php echo MANAGE_TEAM . 'productionhalls' ?>">JDCO-Production-Halls</a></li>
         <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'factory' ?>">Factory-Assistance-Capabilities</a></li>
          <li class="icn_new_article"><a href="<?php echo MANAGE_TEAM . 'ProductionSteps' ?>">Production Steps</a></li>
          <li class="icn_new_article"><a href="<?php echo MANAGE_TEAM . 'ProductionQuality' ?>">Production and Quality Control Technique</a></li>
          <li class="icn_new_article"><a href="<?php echo MANAGE_TEAM . 'liningpreparation' ?>">Lining Preparation Station images</a></li>
          
          
         </ul>
    <h3>Add Gallary images</h3>
    <ul class="toggle">

        <li class="icn_new_article"><a href="<?php echo MANAGE_TEAM . 'addimages' ?>">Add Images</a></li>
         
         </ul>
       
       
<!--          <h3> Product Description</h3>
    <ul class="toggle">

          <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'product_Descriptions' ?>">Product Descriptions</a></li>
           </ul>
        <h3>Technology Description </h3>
         <ul class="toggle">
      <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'Tech_description' ?>">Type of Technology</a></li>
         </ul>
       <h3>New Product Images</h3>
        <ul class="toggle">
        <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'newproducts' ?>">New products</a></li>
      
    </ul>
        <h3>Product Overview</h3>
        <ul class="toggle">
         <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'productoverview' ?>">Product Overview</a></li>
          <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'product_overview_inner_pic' ?>">Products under product overview</a></li>
          <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'product6' ?>">Sub catagory of Product Overview </a></li>
      
    </ul>-->
<!-- <h3>Describe Package</h3>
    <ul class="toggle">
        <li class="icn_settings"><a href="#">Options</a></li>
      
         
        <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'package' ?>">describe package</a></li>
          
            
             
                  <li class="icn_categories"><a href="<?php echo MANAGE_TEAM . 'new_product_pic' ?>">new_product_pic</a></li>
                    
                       
                         
     
    </ul>-->

    
    
    <h3>Admin</h3>
    <ul class="toggle">
<!--        <li class="icn_settings"><a href="#">Options</a></li>-->
        <li class="icn_security"><a href="<?php echo MANAGE_USER . 'changePassword'; ?>">Change Password</a></li>
        <li class="icn_jump_back"><a href="<?php echo MANAGE . 'logout' ?>">Logout</a></li>
    </ul>

    <footer>
        <hr />
        <?php
        date_default_timezone_set('Asia/Calcutta'); 
        ?>
        <p><strong>Copyright &copy; <?php echo date('Y') ?>Malabarsteels</strong></p>
        <p>Powered by <a href="http://www.fujishka.com/" target="_blank">Technologies</a></p>
    </footer>
</aside>