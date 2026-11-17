
<html>
    <head>
         <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <?php include '../manage/includes/header.php' ?>

        
    </head>
    <body>
        
<style>
form{
background-color:#fff
}
#maindiv{
width:960px;
margin:10px auto;
padding:10px;
font-family:'Droid Sans',sans-serif
}
#formdiv{
width:500px;
float:left;
text-align:center
}
form{
padding:40px 20px;
box-shadow:0 0 10px;
border-radius:2px
}
h2{
margin-left:30px
}
.upload{
background-color:red;
border:1px solid red;
color:#fff;
border-radius:5px;
padding:10px;
text-shadow:1px 1px 0 green;
box-shadow:2px 2px 15px rgba(0,0,0,.75)
}
.upload:hover{
cursor:pointer;
background:#c20b0b;
border:1px solid #c20b0b;
box-shadow:0 0 5px rgba(0,0,0,.75)
}
#file{
color:green;
padding:5px;
border:1px dashed #123456;
background-color:#f9ffe5
}
#upload{
margin-left:45px
}
#noerror{
color:green;
text-align:left
}
#error{
color:red;
text-align:left
}
#img{
width:17px;
border:none;
height:17px;
margin-left:-20px;
margin-bottom:91px
}
.abcd{
text-align:left
}
.abcd img{
height:100px;
width:100px;
padding:5px;
border:1px solid #e8debd
}
b{
color:red
}
</style>
<style>
#map {
  height: 300px;
  border: 1px solid #000;
}

</style>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">New Gallery images</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="reg-for">
                           
                                    <div class="clearfix"></div>
                                    <div>
                                        <div class="form">
                                            <form name="registration1_form" id="registration1_form" method="post" action="" onsubmit="return validate(this);" enctype="multipart/form-data">

                                                <div class="form-group">
                                                    


                                                    <div class="col-md-5">
                                                        <input  id="name" name="heading" class="form-control" type="text" required="true" placeholder="Album  heading" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>

                                               
                                                 <label></label>
                                                
  <div id="maindiv">

            <div id="formdiv">
                <h6>Add Gallery uploading</h6>
               
                    <div id="filediv">
                        <input name="file[]" type="file" id="file" multiple="multiple"/></div><br/>
           
                    <input type="button" id="add_more" class="upload" value="Add More Files"/>
<!--                    <input type="submit" value="Upload File" name="submit" id="upload" class="upload"/>-->
             
                <br/>
                <br/>
				
            </div>
           
		  
           
            </div>
                                                  <div class="clearfix"></div></div>
                                                 
		  
           
           
                                       
                                      


                                    



                                        
                                        

                                       
                                       
                                            
                                        
                                            
                                    </div>
                                </div>

                            </div>

                       
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" id="upload" name="submit" class="btn btn-success">Submit</button>
                    </div>
                     </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- new enqiry menu -->



        <div class="icon-container" >
<?php include '../manage/includes/inner-menu.php'; ?>

            <div class="col-md-9">

                <div class="row">
                    <div class="bread">
                        <div id="bc1" class="btn-group btn-breadcrumb">
                            <a href="<?php echo ABS_PATH ?>" class="btn btn-default"><i class="fa fa-home"></i></a>
                            <a href="http://bestdeals2shop.com/manage/manageTeam/view_deals" class="btn btn-default"><div>Add gallery</div></a>

                        </div>
                    </div>
                    <div class="row">
                        <div class="reg-form">
                            <div class="bulk">
                                <div class="col-md-4"><h3 style="padding-left:1.2%">Gallery images</h3>
                                </div>
                                <div class="col-md-1" style="
                                     margin-left: -13%;
                                     margin-top: 2%;
                                     ">
                                    <div class="dropdown">
                                        <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Select category
                                            <span class="caret"></span></button>
<!--                                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
<?php foreach ($this->getimages as $details): ?>
                                                <li role="presentation"><a role="menuitem" tabindex="-1" href="<?php echo MANAGE_TEAM . 'view_deals1/' . $details['pk_int_category_id']; ?>"><?php echo $details['vchr_category_name'] ?></a></li>

                                                <li role="presentation" class="divider"></li>
<?php endforeach; ?>
                                        </ul>-->
                                    </div>
                                </div>
                                <div class="col-md-2 pull-right enq-btn"><a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-envelope"></i>Add News</a></div>
                              

                                <div class="clearfix"></div>
                            </div>
                            <div class="form clearfix">

                                <form name="registration1_form" id="registration1_form" method="POST" action="<?php echo MANAGE_TEAM . 'deletese' ?>" enctype="multipart/form-data">

                                    <div class="table-cntnr">

                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                   
                                                    <th>Album heading</th>

                                                    
                                                   
                                                   
                                                   
                                                    <th style="width:13%">Action</th>
                                                    <td><input type="checkbox" id="selecctall"/>  All</li></td>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>

<?php
$i = 1;

foreach ($this->getimages as $details):
    
    ?>
                                                        <td><?php echo $i; ?></td>
                                                        <td><?php echo $details['Heading'] ?></td>
                                                       
                                                        
                                                      
                                                      
   


                                              

                                                        <td>
                                                               <a href="<?php echo MANAGE_TEAM . 'deletegallery/' . $details['pk_gal_id'] ?>" class="action" onclick="return confirm('Are you Sure want to Delete This entry');"><i class="fa  fa-trash-o"></i></a>
                                                           
                                                           <a href="<?php echo MANAGE_TEAM . 'viewalbum/' . $details['pk_gal_id'] ?>">view</a>
                                                        <td><input name="checkbox[]" class="checkbox1" type="checkbox" value="<?php echo $details['pk_int_deal_id']; ?>"></td>
                                                        </td>


                                                    </tr>

    <?php $i++ ?>
<?php endforeach; ?>



                                            </tbody>

                                        </table>

                                    </div>

                                    <div class="col-md-12"><button type="submit" name="delete" class="btn btn-success  pull-right" onclick="return confirm('Are you Sure want to Delete This All entry');">Delete</button></div>
                                </form>

                            </div>
                        </div>
                    </div>


                </div>

            </div>
            <div class="clearfix"></div>
        </div>
        <div class="footer">Powered by Adox solutions</div>

        