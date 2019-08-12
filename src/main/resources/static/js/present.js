
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
  //添加礼物
  $("#add").click(function(){
	$(".formtips").remove();
	$("#present-id").prop("value","");
	$("#name").prop("value", "");
	$("#price").prop("value", "");
	$("#url").prop("value", "");
	$("#description").prop("value", "");
	$("#type").prop("value", "0");	
	$("#identify_id").prop("src", "/img/no_img.jpg");
	$("#identifybig_id").prop("src", "/img/no_img.jpg");
	$("#uploadImg").hide();
	$("#uploadTwoImg").hide();
	$("#uploadTwoPre").show();
	$("#uploadPre").show();
	$("#totalModal").modal("show");
  });
  
  
  //修改礼物 
  $(".edit").click(function(){
		$(".formtips").remove();	
		var url = "/run/cms/activity/selectone/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#present-id").prop("value", data.id);
	      $("#name").prop("value", data.name);
	      $("#price").prop("value", data.price);
	      $("#url").prop("value", data.url);
	      $("#integral").prop("value", data.integral);
	      $("#description").prop("value",data.description);
	      $("#type").find("option[value=" + data.type + "]").prop("selected",true);
	      $("#identify_id").prop("src", data.identify+"_1");	
	  	  $("#uploadImg").hide(); 
		  $("#identifybig_id").prop("src", data.identify+"_2");	
		  $("#uploadTwoImg").hide(); 	      
	  	});
		$("#totalModal").modal("show");
	  });
  
  //删除
  $(".deleteOne").click(function(){
	   var presentid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/activity/deletepresentdata/"+presentid;
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
		var $container = $("#inputcontent").parent();
		$(".formtips").remove();	
		if($("#name").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*礼物名称不得为空</span>");
			return false;
		}
		if($("#price").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*价格不得为空</span>");
			return false;
		}
		if($("#description").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*礼物描述不得为空</span>");
			return false;
		}
		if($("#present-id").val() == "" && $("#uploadTwoImgId").attr("src") == undefined) {
			$container.append("<span class='formtips' style='color:red;'>*大图片不能为空</span>");
			return false;
		}	
		if($("#present-id").val() == "" && $("#uploadTwoImgId").attr("src") == undefined) {
			$container.append("<span class='formtips' style='color:red;'>*大图片不能为空</span>");
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