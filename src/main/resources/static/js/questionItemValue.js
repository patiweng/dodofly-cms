
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
	
	//添加问卷
	$("#add").click(function(){
		$(".formtips").remove();
		$("#questionId").prop("value","");
		$("#itemId").prop("value","");
		$("#option_value").prop("value", "");
		$("#sort").prop("value", "");
		$("#totalModal").modal("show");
	});
  
  
	//修改问卷
	$(".edit").click(function(){
		$(".formtips").remove();
		var url = "/run/cms/healthquestionnaire/select/questionItemValueOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#questionId").prop("value", data.id);
	      $("#itemId").prop("value", data.itemId);
	      $("#option_value").prop("value", data.optionValue);
		  $("#sort").prop("value", data.sort);
	  	});
		$("#totalModal").modal("show");
	});
  
	//删除问卷
	$(".deleteOne").click(function(){
	   var questionId = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/healthquestionnaire/delete/questionItemValue/"+questionId;
			 $.get(url, function (data){
				 if(data!=null){
					 location.reload(); 
				 }
			 });			
         }else{            
            return false;
        }	 
	});
  
	//保存校验
  	$("#save").click(function(){					
		var $container = $("#inputcontentdata").parent();
		$(".formtips").remove();	
		if($("#itemId").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*所属问题ID不得为空</span>");
			return false;
		}
		if($("#option_value").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*标题不得为空</span>");
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