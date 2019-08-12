
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
	$("#activity-id").prop("value","");
	$("#activityName").prop("value", "");
	$("#identify").prop("value", "");
	$("#startTime").prop("value", "");
	$("#endTime").prop("value", "");
	$("#description").prop("value", "");
	$("#everyPlayTimes").prop("value", "");
	$("#targetStep").prop("value", "");
	$("#totalModal").modal("show");
  });
  
  
  //修改活动
  $(".edit").click(function(){
		$(".formtips").remove();	
		var url = "/run/cms/activity/selectactivityone/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#activity-id").prop("value", data.id);
	      $("#activityName").prop("value", data.name);
	      $("#identify").prop("value", data.identify);
	      $("#everyPlayTimes").prop("value", data.everyPlayTimes);
	      $("#targetStep").prop("value", data.targetStep);
	      $("#description").prop("value", data.description);
		  $("#startTime").prop("value", data.startTime);
		  $("#endTime").prop("value", data.endTime);      
	  	});
		$("#totalModal").modal("show");
	  });
  
  
  $(".applyli").click(function(){
	  window.location.replace('http://'+window.location.host + '/run/cms/activity/selectactivitypresentpage?bopsFlag=1&id=' + $(this).attr("value"))});
  
  $(".deleteOne").click(function(){
	   var activityid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/activity/deleteactivitydata/"+activityid;
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
		var $container = $("#inputcontentdata").parent();
		$(".formtips").remove();	
		if($("#activityName").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*活动名称不得为空</span>");
			return false;
		}
		if($("#identify").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*活动标识不得为空</span>");
			return false;
		}
		if($("#startTime").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*开始时间不得为空</span>");
			return false;
		}
		if($("#endTime").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*结束时间不得为空</span>");
			return false;
		}
		if($("#description").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*活动描述不得为空</span>");
			return false;
		}
		if($("#everyPlayTimes").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*每人每天抽几次不得为空</span>");
			return false;
		}
		if($("#startTime").val() > $("#endTime").val()) {
			$container.append("<span class='formtips' style='color:red;'>*活动结束时间不能小于起始时间</span>");
			return false;
		}
	});
  
  
	function postData() {
		$("#eventForm").ajaxSubmit(function(data) {  	
			alert(data.errorMessage);
			 location.reload();
		}); 
	    return false;
	}