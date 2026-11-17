<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

<link href="http://cdn.datatables.net/1.10.13/css/dataTables.min.css" rel="stylesheet">

<link href="//cdn.datatables.net/1.10.13/css/dataTables.bootstrap.css" rel="stylesheet"> 

<script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>


        <?php include 'includes/header.php' ?>

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">News</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="reg-for">
                                <div>
                                    <div class="clearfix"></div>
                                    <div>
                                        <div class="form">
                                            <form name="registra" id="product" method="post"  action=""  enctype="multipart/form-data">

                                                <div class="form-group">
                                                    


                                                    <div class="col-md-12">
                                                              <label>Title</label> <input    id="titl" name="title" class="form-control" type="text" placeholder="Title" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>
	<div class="form-group">
                                                    


                                                    <div class="col-md-12">
                                                              <label>Date</label> <input    required id="datepicker" name="tstamp" class="form-control" type="date" placeholder="tstamp" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>
                                                    
                                                    
                                                    
                                                        <div class="form-group">
                                                    


                                                    <div class="col-md-12">
                                            <label>Likes</label>
                                            <input    id="likes" name="likes" class="form-control" type="text" placeholder="Likes" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>
                                                    
                                                    
                                                    
                                                        <div class="form-group">
                                                    


                                                    <div class="col-md-12">
                                                              <label>Linked In</label> <input    id="linkedin" name="linkedin" class="form-control" type="text" placeholder="Link" style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                ">
                                                    </div>

                                                    <div class="clearfix"></div></div>
                                                    
                                                    
                                                    
                                                <div class="form-group">
                                                    
                                                   
                                                    <div class="col-md-12">
                                                        <label>Description</label>
                                                        <textarea  class="ckeditor" id="description" name="description" style="
                                                                  width: 100%;
                                                                  height: 108px;
                                                                  " placeholder="Description"   ></textarea>
																  
																  
																  <style>label.error
																  {
																	  color:red;
																  }
																  </style>
																  <div id="des"></div>
                                                    </div>
                                                   

                                                    <div class="clearfix"></div></div>
                                                
                                                <div class="form-group" id="file">
                                                   
                                                    <div class="col-md-5" >
													
                                                        <label>Image  <style>
																	h7 {
																	color:red;
																	
																	}</style>
																 <h7>Max 20 ITEMS </h7>  </label> <input  type="file"   id="name" required name="file[]" multiple="multiple"   class="form-control img_upload"    
															style="
                                                                margin-left: 0%;
                                                                width: 100%;
                                                                margin-top: 1%;
																margin-bottom: 1%;
                                                                 "
																 accept=".jpeg,.png,.gif,.jpg" onchange="_thisimage(this)">
																 
																 
                                                    </div>

                                               <div class="clearfix"></div></div>
                                                  
                                                 <div class="form-group">
                                                    
                                                    <div class="col-md-12 ">
                                                       <div class="row preview-area">
                                                        
                                                        
                                                         </div>                                                     
                                                        
                                                    </div>
                                                    
                                                </div>  
                                                 


                                        </div>



                                        
                                        

                                        <div class="form-group">



                                            <div class="clearfix"></div></div>
                                       
                                            
                                        
                                            
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" name="submitn" id="i_submit" class="btn btn-success">Submit</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- new enqiry menu -->



        <div class="icon-container" >
<?php include 'includes/inner-menu.php'; ?>

            <div class="col-md-9">

                <div class="row">
                    <div class="bread">
                        <div id="bc1" class="btn-group btn-breadcrumb">
                            <a href="<?php echo URL.'manage' ?>" class="btn btn-default"><i class="fa fa-home"></i></a>
                            <a href="#" class="btn btn-default"><div>News</div></a>

                        </div>
                    </div>
                    <div class="row">
                        <div class="reg-form">
                            <div class="bulk">
                                <div class="col-md-4"><h3 style="padding-left:1.2%">News</h3>
                                </div>
                                <div class="col-md-1" style="
                                     margin-left: -13%;
                                     margin-top: 2%;
                                     ">
                                   
                                </div>
                                <div class="col-md-2 pull-right enq-btn"><a href="#" data-toggle="modal" data-target="#myModal"><i class="fa fa-envelope"></i>Add News</a></div>
                              

                                <div class="clearfix"></div>
                            </div>
                            <div class="form clearfix">

                                <form name="registration1_form" id="registration1_form" method="POST" action="" enctype="multipart/form-data">

                                    <div class="table-cntnr">

                                         <table class="table table-hover display" id="example">

                                    <thead>

                                        <tr>

                                           <th style="padding-bottom: 8px;">#</th>

											

                                            <th style="

                                                width: 10%;

                                                padding-bottom: 13px;">Title</th>



											<th style="width: 40%;padding-bottom: 13px;">Description</th>
											
											<th style="padding-bottom: 13px;">Posted on</th>

                                            <th style="padding-bottom: 13px;">Image</th>
                                            	<th style="padding-bottom: 13px;">Likes</th>
                                            		<th style="padding-bottom: 13px;">Linked In</th>







                                            <th style="width:13%; padding-bottom: 13px;">Action</th>

                                            





                                        </tr>

                                    </thead>

<?php

//echo"";print_r($this->getnews);exit;

	if(empty($this->getnews)){

	?>  

	

 <tbody>



 

</tbody>

<?php

}

else{

$i = 1;

?>





                                    



                                       



                                            <?php

                                            

                                                foreach ($this->getnews as $details){

                                                    ?>

                                                    <tr> <td><?php echo $i; ?></td>

  
														
                                                        <td><?php echo $details['title'] ?></td>
                                                        <td><?php echo substr($details['description'], 0, 150) ?></td>
                                                        
                                                        
                                                       <td><?php $t= substr($details['tstamp'], 0, 10); echo  date("d F Y", strtotime($t)) ?></td>
                                                        
                                                        
                                                  

 <td>
                                                           
   <?php  $file=""; 
                     foreach ($this->getnewsimgss as $details1){
                        //  echo $details['newss_id']." ".$details11['nid'];
                                                               if($details['newss_id']==$details1['nid']){
                                                               	$file=UPLOADS.'news/'.$details1['file'];
                                                               	 }
                                                               
                                                               
                                                           }
                                                           
                                                           ?>
                                                       
                                                       <img  <?php
													             if($file!=""){
																 ?>
																 src="<?php echo 	$file;?>"<?php } else{ ?>
																	src="<?php echo URL.'public/uploads/images/default/default.png'?>"
																 <?php } ?> >
																 
																</td>
                                                        
                                                      
                                                      <td><?php echo $details['likes'] ?></td>
                                                 <td><?php echo $details['linkedin'] ?></td>
    

                                              

                                                        <td>
                                                            <a href="<?php echo NEWS . 'deletenews/' . $details['nid'] ?>" class="action" onclick="return confirm('Are you Sure want to Delete This entry');"><i class="fa  fa-trash-o"></i></a>
                                                            <a href="<?php echo NEWS. 'editnews/' . $details['nid'] ?>" class="action"><i class="fa  fa-edit"></i></a>
    
                                                        </td>


                                                    </tr>
													
									
											
													
													

    <?php $i++; ?>
 <?php } ?>  
 
<?php }?>






                                          

                                        </table>

                                    </div>

                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="clearfix"></div>
        </div>
        <div class="footer">Powered by</div>

<script type="text/javascript">
   $(document).ready(function() {
$('#product').validate({
    ignore: [],         
    rules: {
                description: {
						required: function() 
						{
								CKEDITOR.instances.description.updateElement();
						}
                }
                },
                messages: { 
                				
                description: "This field is required"
				
                },
                /* use below section if required to place the error*/
                errorPlacement: function(error, element) 
                {
                    if (element.attr("name") == "description") 
                   {
                    $('#des').html(error);
					 //$(this).parent('div').find('div#des').html(error);
					
                    } else {
						
                    error.insertAfter(element);
                    }
                }
            });
});
    </script>
	
	
	

<script type="text/javascript">
$(function(){
   var inputLocalFont = document.getElementById("name");
   inputLocalFont.addEventListener("change",previewImages,false); //bind the function to the 

   function previewImages(){
       var validEx = ["image/jpeg","image/jpg","image/png","image/gif"];
       console.log(validEx);
       var fileList = this.files;
         $('.preview-area >div').remove();
       var anyWindow = window.URL || window.webkitURL;

           for(var i = 0; i < fileList.length; i++){
             //get a blob to play with
             var objectUrl = anyWindow.createObjectURL(fileList[i]);
             var typeIm = fileList[i].type;
             var sizeIm = fileList[i].size;
             //alert(sizeIm);
             if($.inArray(typeIm,validEx)==-1 || sizeIm>20000000){
                        $('.preview-area').append('<div class="col-md-3"><div style="width:100%;height:200px; text-align:center;  margin-bottom:30px;"><img src="<?php echo URL.'public/images/default/images.png';?>" style="max-width:100%; height:200px;" /></div></div>');
                       // get rid of the blob
                       window.URL.revokeObjectURL(fileList[i]);
             }else{
                       // for the next line to work, you need something class="preview-area" in your html
                       $('.preview-area').append('<div class="col-md-3"><div style="width:100%;height:200px; text-align:center;  margin-bottom:30px;"><img src="' + objectUrl + '" style="max-width:100%; height:200px;" /></div></div>');
                       // get rid of the blob
                        window.URL.revokeObjectURL(fileList[i]);
             }
           }
   }
});

</script>

<script type="text/javascript">
function _thisimage(imag){
	
	
	    var ext=['image/jpg','image/jpeg','image/png','image/gif'];
        var filesloded = imag.files;
        if(filesloded.length>20){
			$("#name").val('');
			alert('Max Length is 20');
				return false;
		}
		for(var j=0;j<filesloded.length;j++){
				var typeIm = filesloded[j].type;
				var sizeIm = filesloded[j].size;
				var fileSize = sizeIm / 1024 / 1024;
				if($.inArray(typeIm,ext)==-1){
				 $("#name").val('');	
				 
					alert('Please Select A Valid Image');
				}
				
				
				
		        if(fileSize > 20){
		        
		        
					
					$("#name").val('');
					
					alert('Max size 10 MB');
				}
		
		}
    } 
</script>




<script>

  $( function() {

   // $( "#datepicker" ).datepicker();

   var date = $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();

  } );

  </script>




<script>

$(document).ready(function(){

    $('#example').DataTable();

});





</script>





<!--CHECK ALL CHECKBOX-->





<script>





$(document).ready(function(){



    $("#rowchkall").change(function () {

        $("input:checkbox.rowchk").prop('checked',this.checked);

    });



});





</script>

	



<style>

    .dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {

    background: transparent none repeat scroll 0 0;

    border: 1px solid transparent;

    box-shadow: none;

    color: #666 !important;

    cursor: default;}

    

    .dataTables_wrapper .dataTables_paginate .paginate_button {

    border: 1px solid transparent;

    border-radius: 2px;

    box-sizing: border-box;

    color: #333 !important;

    cursor: pointer;

    display: inline-block;

    margin-left: 2px;

    min-width: 1.5em;

    padding: 0.5em 1em;

    text-align: center;

    text-decoration: none !important;

     background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0%, #dcdcdc 100%) repeat scroll 0 0;

    border: 1px solid #979797;

    color: #333 !important;

}

.dataTables_wrapper .dataTables_paginate .paginate_button:hover{



    background:rgba(0,0,0,0) linear-gradient(to bottom,#585858 0%,#111 100%) repeat scroll 0 0;

    border:1px solid #111;

    color:white !important;

}

 

/*.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {

    background: rgba(0, 0, 0, 0) linear-gradient(to bottom, #fff 0%, #dcdcdc 100%) repeat scroll 0 0;

    border: 1px solid #979797;

    color: #333 !important;

}*/



.table.dataTable thead .sorting:after{

display: none;

}

 .table > caption + thead > tr:first-child > th, .table > colgroup + thead > tr:first-child > th, .table > thead:first-child > tr:first-child > th, .table > caption + thead > tr:first-child > td, .table > colgroup + thead > tr:first-child > td, .table > thead:first-child > tr:first-child > td{

    background-image: url(//cdn.datatables.net/1.10.12/images/sort_both.png);

    background-repeat: no-repeat;

    background-position: -4px 6px;

    padding-left: 18px;

}

table.dataTable thead .sorting_desc::after {

    content: "";

}

table.dataTable thead .sorting_asc::after {

    content: "";

}

 

    </style>

	 <style>

.myButton:hover {

    background:rgba(0,0,0,0) linear-gradient(to bottom,#585858 0%,#111 100%) repeat scroll 0 0;

   border:1px solid #111;

   color:white !important;

}

.myButton:active {

    position:relative;

    top:1px;

}

</style>


