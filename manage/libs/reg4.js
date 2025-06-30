 function validator()
 {
    
     //$('#isAgeSelected').is(':checked') ? $("#txtAge").show() : $("#txtAge").hide();
     //if ($('#TermsCond').is(':checked'))
     if($("#TermsCond").attr("checked")==true)
     //if($('#TermsCond').attr('checked'))
         {
             alert('the person has agreed');
             return false;
         }
 }


