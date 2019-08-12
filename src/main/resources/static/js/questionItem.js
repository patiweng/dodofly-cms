
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
	
	//添加问题
	$("#add").click(function(){
		$(".formtips").remove();
		$("#query_icon").prop("src", "/img/no_img.jpg");
		$("#uploadImg").hide();
		$("#uploadPre").show();
		$("#questionId").prop("value","");
		$("#queryId").prop("value","");
		$("#item_title").prop("value", "");
		$("#tagCode").prop("value", "");
		$("#type").prop("value", "1");
		$("#unit").prop("value", "");
		$("#sort").prop("value", "");
		$("#totalModal").modal("show");
	});
  
  
	//修改问题
	$(".edit").click(function(){
		$(".formtips").remove();
		var url = "/run/cms/healthquestionnaire/select/questionItemOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#questionId").prop("value", data.id);
	      $("#queryId").prop("value", data.queryId);
	      $("#item_title").prop("value", data.itemTitle);
	      $("#tagCode").prop("value", data.tagCode);
	      $("#type option[value='"+data.type+"']").attr("selected", "selected");
		  $("#unit").prop("value", data.unit);
		  $("#sort").prop("value", data.sort);
		  $("#inputType").prop("value", data.check.inputType);
		  $("#allowBlank").prop("value", data.check.allowBlank);
		  $("#blankText").prop("value", data.check.blankText);
		  $("#maxLength").prop("value", data.check.maxLength);
		  $("#maxLengthText").prop("value", data.check.maxLengthText);
		  $("#minLength").prop("value", data.check.minLength);
		  $("#minLengthText").prop("value", data.check.minLengthText);
		  $("#maxValue").prop("value", data.check.maxValue);
		  $("#maxValueText").prop("value", data.check.maxValueText);
		  $("#minValue").prop("value", data.check.minValue);
		  $("#minValueText").prop("value", data.check.minValueText);
		  $("#query_icon").prop("src", data.queryIcon);
		  $("#uploadImg").hide();
		  
	  	});
		$("#totalModal").modal("show");
	});
  
	//删除问题
	$(".deleteOne").click(function(){
	   var questionId = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？问题下的所有选项都会被删除')){
			 var url = "/run/cms/healthquestionnaire/delete/questionItem/"+questionId;
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
		if($("#queryId").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*所属问卷ID不得为空</span>");
			return false;
		}
		if($("#item_title").val().replace(/^\s+|\s+$/g,"") == "") {
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