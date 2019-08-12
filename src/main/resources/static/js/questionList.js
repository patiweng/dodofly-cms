
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
		$("#queryTitle").prop("value", "");
		$("#query_icon").prop("src", "/img/no_img.jpg");
		$("#uploadImg").hide();
		$("#uploadPre").show();
		$("#queryDes").prop("value", "");
		$("#queryType").prop("value", "0");
		$("#sort").prop("value", "");
		$("#totalModal").modal("show");
	});
  
  
	//修改问卷
	$(".edit").click(function(){
		$(".formtips").remove();
		$("#sabe").show();
		var url = "/run/cms/healthquestionnaire/select/questionnaireOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#questionId").prop("value", data.id);
	      $("#query_title").prop("value", data.queryTitle);
		  $("#query_icon").prop("src", data.queryIcon);
		  $("#uploadImg").hide();
		  $("#queryDes").prop("value", data.queryDes);
		  $("#queryType option[value='"+data.queryType+"']").attr("selected", "selected");
		  $("#sort").prop("value", data.sort);
	  	});
		$("#totalModal").modal("show");
	});
  
	//删除问卷
	$(".deleteOne").click(function(){
	   var questionId = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？问卷下的问题以及问题选项都会被删除')){
			 var url = "/run/cms/healthquestionnaire/delete/questionnaire/"+questionId;
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
		if($("#query_title").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*问卷名称不得为空</span>");
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
	
	//马拉松保存
	$("#updatema").click(function(){
		var c=document.getElementById("chromosphere").value;
		var url = "/run/cms/marathon/generativeaward/" + c+"/1/";
	    $.get(url, function () {
	    	 alert("修改成功");
		      location.reload(); 
	  	});
	});
	$("#deletema").click(function(){
			 if(window.confirm('你确定要删除吗?')){
				 var url = "/run/cms/marathon/generativeaward/1/2/";
				 $.get(url, function (){
					 alert("删除成功");
						 location.reload(); 
				 });			
	         }else{            
	            return false;
	        }	 
		});
	
	$("#queryma").click(function(){		
		var url = "/run/cms/marathon/generativeaward/1/1/";
	    $.get(url, function (data) {
	    	alert("查询成功");
	    	$("#chromosphere").attr("value", data);
	  	});
	});