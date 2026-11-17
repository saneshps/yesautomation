<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

 <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>



<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>

 

  

<?php include 'includes/header.php' ?>
    
	<?php //print_r($this->getallimages); ?> 
    <?php //print_r($this->getnews); exit("hi"); ?>

<div class="icon-container" >

<?php include 'includes/inner-menu.php';?>

<div class="col-md-9">

<div class="bread">

<div id="bc1" class="btn-group btn-breadcrumb">

            <a href="#" class="btn btn-default"><i class="fa fa-home"></i></a>

            <a href="<?php echo NEWS.'add'?>" class="btn btn-default"><div>NEWS</div></a>



        </div>

</div>

<div class="row">

<div class="reg-form">

<h3>Edit News Details </h3>



<div class="form">

<form name="registra" id="newsval" method="post" action="<?php echo NEWS ?>updatenews" onsubmit="return ValidateregistraForm();" enctype="multipart/form-data">

<div class="form-group">

<div class="clearfix"></div></div>

<div class="form-group">

    <?php $result = $this->getnews; ?>

    <div class="col-md-12"><label>&nbsp;Title</label>

     <input type="text" class="form-control"    id="title" name="title" style="margin-left: 0%;width: 100%;" value="<?php echo $result[0]['title']; ?>">

     <input type="hidden" name="hidden" value="<?php echo $result[0]['id']; ?>">

    </div>

    <div class="col-md-5">



            <div class="clr"></div>



    </div>

    <div class="clearfix"></div>

</div>



<div class="form-group">

<?php  $d=strtotime($result[0]['tstamp']);

    $php_timestamp_date = date("Y-m-d", $d);

    ?>

    <div class="col-md-12">

        <label>&nbsp;Date</label>

        <input type="date"   id="datepicker" name="tstamp" style="margin-left: 0%;width: 100%;" class="form-control" value="<?php echo $php_timestamp_date; ?>">

    </div>

<div class="col-md-5">

        <div class="clr"></div>   

</div>

<div class="clearfix"></div>

</div>



<div class="form-group">

 <div class="col-md-12">

        <label>&nbsp;Likes</label>

        <input type="text"   id="likes" name="likes" style="margin-left: 0%;width: 100%;" class="form-control" value="<?php echo $result[0]['likes']; ?>">

    </div>

<div class="col-md-5"> <div class="clr"></div>   

</div>

<div class="clearfix"></div>

</div>


<div class="form-group">

 <div class="col-md-12">

        <label>&nbsp;Linked In</label>

        <input type="text"   id="linkedin" name="linkedin" style="margin-left: 0%;width: 100%;" class="form-control" value="<?php echo $result[0]['linkedin']; ?>">

    </div>

<div class="col-md-5"> <div class="clr"></div>   

</div>

<div class="clearfix"></div>

</div>





<div class="form-group">





<div class="clearfix"></div></div>

<div class="form-group">





<div class="clearfix"></div></div>

<div class="form-group">

<div class="col-md-12">

<label>Description</label>

<textarea required rows="200" cols="150" style="height:300px;width:800px"class="ckeditor" id="description" name="description"   ><?php echo $result[0]['description'] ?></textarea>

														<style>label.error

																  {

																	  color:red;

																  }

														 </style>

														 <div id="des"></div>



</div>



<div class="clearfix"></div></div>



<div class="form-group">

    <div class="col-md-5">  



 <br>



 

 

 

</div>

<div class="form-group">

<div class="col-md-12" style="padding-left:0px;">
<?php
$i=0;
if(!empty($this->getallimages)){
foreach ($this->getallimages as $item){

?>

<div class="col-md-3 dpimage" style="padding-bottom:5px;" id="<?php echo "imgde_le".$item['id']?>">
<div>
<label>Rotate Image:</label><br>

<input type="button" class="btnRotate<?php echo $i;?>" id="r_image" value="90" data-angle="-90" data-image="<?php echo UPLOADS.'news/'.$item['file'];?>" />
<input type="button" id="r_image" class="btnRotate<?php echo $i;?>" value="-90" data-angle="90" data-image="<?php echo UPLOADS.'news/'.$item['file'];?>" />
<input type="button" id="r_image" class="btnRotate<?php echo $i;?>"  value="180" data-angle="180" data-image="<?php echo UPLOADS.'news/'.$item['file'];?>" />
<input type="button" id="r_image" class="btnRotate<?php echo $i;?>" value="360"  data-angle="360" data-image="<?php echo UPLOADS.'news/'.$item['file'];?>" />

</div>

<script>
$(".btnRotate<?php echo $i;?>").on("click", function(){
  var degree = $(this).val();
  //var degree= $(this).data("angle");
  
//  alert(degree);
  $('#demo-image<?php echo $i;?>').animate({  transform: degree }, {
    step: function(now,fx) {
        $(this).css({
            '-webkit-transform':'rotate('+now+'deg)', 
            '-moz-transform':'rotate('+now+'deg)',
            'transform':'rotate('+now+'deg)'
        });
    }
    });
});
</script>
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script type="text/javascript">
$(".btnRotate<?php echo $i;?>").on("click", function(){
    // var degree = $(this).val();
     //alert(degree) ;
     //console.log(degree);
var degree= $(this).data("angle");
//alert(degree);
    var path= $(this).data("image");
   //alert(path);
  // console.log(path)
      
    var  img_name = path.split('/').pop();
    //alert(img_name);
    //console.log(img_name);
    var ext = path.split('.').pop();
        
          //alert(ext);
          //console.log(ext);
      if(ext=='jpeg'){
 
        $.ajax ({
             
                 url:'<?php echo URL."News_manage/RotateJpg";?>',
                 type: "POST",
                 dataType: 'html',
                 data:{"img_name":img_name,"degree":degree,"path":path},
                   success: function (res) 
                   {
                   alert("Rotated");
                  // alert(res);
                   }
                });
          }
            
          
      else{
            $.ajax ({
             
                 url:'<?php echo URL."News_manage/Rotatepng";?>',
                 type: "POST",
                 dataType: 'html',
                 data:{"img_name":img_name,"degree":degree,"path":path},
                   success: function (res) 
                   {
                   alert("Rotated");
                   //alert(res);
                   }
                });
          }
          return false;

          
        })
</script>
<style>
#demo-image<?php echo $i;?>{padding:25px 10px;}
.btnRotate<?php echo $i;?> {margin-left:5px;background-color: #09F;border: 0;color: #FFF;cursor: pointer;}
</style>
<img src="<?php echo UPLOADS.'news/'.$item['file'];?>" style="height:150px !important; width:100% !important" id="demo-image<?php echo $i;?>"/>
<div style="text-align:center;">
<input type="button" name="delete" value="Delete this image" onclick="dltimg(this)" id="<?php echo $item['id'];?>" data-imgsrc="<?php echo $item['file'];?>"/>
</div>
</div>
<?php
$i++;
   }
}
?>

</div>

<div class="col-md-12">

                    <input  type="file" name="file[]" multiple="multiple"  id="name"  value="" accept=".jpg,.jpeg,.png,.gif" onchange="_thisimage(this)">


</div>

<div class="clearfix"></div></div>


<div class="clearfix"></div></div>
<div class="form-group">
                                                    
                                                    <div class="col-md-12 ">
                                                       <div class="row preview-area">
                                                        
                                                        
                                                         </div>                                                     
                                                        
                                                    </div>
                                                    
                                                </div> 

<div class="modal-footer">
                        <input type="submit" name="submitn" id="i_submit"class="btn btn-success" value="Save Changes"/>
    <input type="reset" class="btn btn-success" value="Discard"/>
                    </div>
</form>
</div>
</div>
</div>
            
    </div>
    <div class="clearfix"></div>
</div>
<div class="footer">Powered by Adox solutions</div>

<script type="text/javascript">
function dltimg(newsId) {
	if (confirm('Delete This Image?') === false)
		return false;
	
	var imgid = $(newsId).attr("id");
	alert("Image deleted successfully");
	
	var imgsrc = $(newsId).attr("data-imgsrc");
	

	
	$.ajax({
		type: 'post',
		url: '<?php  echo URL."News_manage/deleteimageonly";?>',
		data: {'id':imgid,'src':imgsrc},
		beforeSend: function() {
		},
		success: function(data) 
		{
			
				$('#imgde_le'+imgid).remove();
		}                
		});
		};
</script>
<script type="text/javascript">
   $(document).ready(function() {
$('#newsval').validate({
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
                    } else {
                    error.insertAfter(element);
                    }
                }
            });
});
    </script>
	<script type="text/javascript">
function _thisimage(imag){
	
	
	    var ext=['image/jpg','image/jpeg','image/png','image/gif'];
        var filesloded = imag.files;
        if(filesloded.length>4){
			$("#name").val('');
			alert('Max Length is 4');
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
				
		        if(fileSize > 2){
					
					$("#name").val('');
					
					alert('Please Check the Size');
				}
		
		}
    } 
</script>
<script type="text/javascript">
window.onload = function(){
//Check File API support
if(window.File && window.FileList && window.FileReader)
{
var filesInput = document.getElementById("files");
filesInput.addEventListener("change", function(event){
var files = event.target.files; //FileList object
var output = document.getElementById("result");
for(var i = 0; i< files.length; i++)
{
var file = files[i];
//Only pics
if(!file.type.match('image'))
continue;
var picReader = new FileReader();
picReader.addEventListener("load",function(event){
var picFile = event.target;
var div = document.createElement("div");
div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
"title='" + picFile.name + "'/>";
output.insertBefore(div,null);
});
//Read the image
picReader.readAsDataURL(file);
}
});
}
else
{
console.log("Your browser does not support File API");
}
}
</script>
<script>

$(function(){
    var inputLocalFont = document.getElementById("name");
    inputLocalFont.addEventListener("change",previewImages,false); //bind the function to the input

    function previewImages(){
        var fileList = this.files;
          $('.preview-area >div').remove();
        var anyWindow = window.URL || window.webkitURL;

            for(var i = 0; i < fileList.length; i++){
              //get a blob to play with
              var objectUrl = anyWindow.createObjectURL(fileList[i]);
              // for the next line to work, you need something class="preview-area" in your html
              $('.preview-area').append('<div class="col-md-3"><div style="width:100%;height:200px; text-align:center;  margin-bottom:30px;"><img src="' + objectUrl + '" style="max-width:100%; height:200px;" /></div></div>');
              // get rid of the blob
              window.URL.revokeObjectURL(fileList[i]);
            }
    }
});

</script>
<script>

  $( function() {

   // $( "#datepicker" ).datepicker();

   var date = $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' }).val();

  } );

  </script> 