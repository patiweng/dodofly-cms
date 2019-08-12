$("#select").click(function(){
		$("#currentPage").prop("value", "1");
	});
	$(".query").click(function(){		
		$("#currentPage").prop("value", $(this).attr("value"));
		$("#form").submit();
	});
	$("#prev").click(function(){		
		$("#currentPage").prop("value", $(this).attr("value"));
		if($("#currentPage").attr("value") != 0) {
			$("#form").submit();
		}
	});
	$("#next").click(function(){		
		$("#currentPage").prop("value", $(this).attr("value"));
		if($("#currentPage").attr("value") != (parseInt($("#last").attr("value")) + 1)) {
			$("#form").submit();
		}
	});		 
  //添加活动
  $("#add").click(function(){
	$(".formtips").remove();
	$("#activitypresent-id").prop("value","");
	$("#option").show();
	$("#presentType").prop("value","5");
	$("#activity-id").prop("value",$(this).attr("value"));
	$("#present_order").prop("value","");
	$("#present_number").prop("value","");
	$("#isRepeated").prop("value","0");
	$("#totalModal").modal("show");
  });
   
  //修改活动
  $(".edit").click(function(){
	  $(".formtips").remove();  
		var url = "/run/cms/activity/selectactpreone/" + $(this).attr("value");
	    $.get(url, function (data) {
	    $("#activitypresent-id").prop("value", data.id);	
	    $("#presentType").find("option[value=" +data.presentType +"]").prop("selected",true);
	    $("#option").hide();
	    $("#isRepeated").prop("value",data.isRepeated);
	    $("#presentName").html("");
	    var PresentDTO = data.rafflePresentDTOList;
	    for (var i = 0; i < PresentDTO.length; i++) {
	    	 $("#presentName").append("<option value="+PresentDTO[i].id+">"+PresentDTO[i].name+"</option>");
	    };	     
	    $("#presentName").find("option[value=" +data.presentId +"]").prop("selected",true);
	  	$("#present_order").prop("value",data.presentOrder);
		$("#present_number").prop("value",data.presentNumber);    
	  	});
		$("#totalModal").modal("show");
	  });
    
  $(".deleteOne").click(function(){
	   var activitypresentid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/activity/deleteactivitypresent/"+activitypresentid;
			 $.get(url, function (data){
				 if(data!=null){
					 location.reload(); 
				 }
			 });			
         }else{            
            return false;
        }	 
	});
  
  $("#save").click(function(){					
		var $container = $("#inputcontentLists").parent();
		$(".formtips").remove();
		if($("#presentName").text() == "") {
			$container.append("<span class='formtips' style='color:red;'>*礼物不得为空，请选择礼物</span>");
			return false;
		}
		if($("#present_number").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*奖品总数量不得为空</span>");
			return false;
		}
		if($("#present_order").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*显示顺序不得为空</span>");
			return false;
		}	
	});
  
 //级联异步提交
 $("#presentType").change(function(){	   	
	      $.ajax({type:"post",url:"/run/cms/activity/selectbytype",dataType:"json",
	          data:{"type" : $("#presentType").val()},
	          success:function(data){
	          $("#presentName").html("");
	          $.each(data,function(i,item){
	          if(data!=null){	        	  
	        	  $("#presentName").append("<option value="+item.id+">"+item.name+"</option>");	   
	          }               
	          });
	        }
	   });
   });
  
 
   $(".editrule").click(function(){
	var val = $(this).attr("value");
	var arr = val.split(",");
	var url = "http://"+window.location.host+"/run/cms/activity/select/selectawardrulelistpage?bopsFlag=1&activityPresentId="+arr[0]+"&presentName="+arr[1];
	//window.location.replace('http://'+window.location.host + '/run/cms/activity/select/selectawardrulelistpage?bopsFlag=1&activityPresentId='+arr[0]+'&presentName='+arr[1])
	window.location.href = url;
  });
  
	function postData() {
		$("#eventForm").ajaxSubmit(function(data) {  	
			alert(data.errorMessage);
			 location.reload();
		}); 
	    return false;
	}