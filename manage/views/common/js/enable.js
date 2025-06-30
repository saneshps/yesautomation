/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var page=1;
var isLoading = false;
$(function(){ 
  
    $('.enable').live('click',function(e){
          
        var  button = $(this);
       
        button.addClass('disable');
        button.removeClass('enable');
      
        $.post('xhrChangeStatus', {
            type:button.attr('data-type'),
            id : button.attr('data-id'),
            status : 0
        }, function(response){
            if(response.status!='updated'){
                button.addClass('enable');
                button.removeClass('disable');   
            }
        }, 'JSON');
        e.preventDefault();
    });
    $('.disable').live('click',function(e){
       
        
        var  button = $(this);
        button.addClass('enable');
        button.removeClass('disable');
        $.post('xhrChangeStatus', {
            type:button.attr('data-type'),
            id : button.attr('data-id'),
            status : 1
        }, function(response){
            if(response.status!='updated'){
                button.addClass('disable');
                button.removeClass('enable');   
            }
        }, 'json');
        e.preventDefault();
    });
    
 $('.sortOrder').on('blur', function(e){ 
          var id = $(this).attr('orderId');
          
        var orderNumber = $(this).val();
      
          $.ajax({
               url: 'updates',
               type: 'POST',
               dataType: 'json',
               data : {id : id,id1:orderNumber}
          }).done(function (data) {
               $('#r').append(data);
          });
     });
     $('.sortOrder').change(function(){
  $(this).trigger('blur');
});

    
});

