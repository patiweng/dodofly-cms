
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
	/*$('#eventForm').reset();*/
	$("#id").prop("value", "");
    $("#ruleName").val("");
    $("#menu_namearray").val("");
    $("#activityId").val("");
    $("#source").prop("value", "");
/*	$("#backConfigure").multiselect("uncheckAll");*/
    $("#maxStepDay").prop("value", "");
    $("#minStepDay").prop("value", "");
	$("#minStandardDays").prop("value","");
	$("#maxStandardDays").prop("value", "");   
	$("#totalModal").modal("show");
  });
  
  
  //修改活动
  $(".edit").click(function(){
		$(".formtips").remove();
		var url = "/run/cms/activityRule/selectActivityRuleOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#id").prop("value", data.id);
	      $("#ruleName").prop("value", data.ruleName);
	      $("#activityId").prop("value", data.activityId);
	      /*$("#channelNo").prop("value", data.source);*/
	      $("#maxStepDay").prop("value", data.maxStepDay);
	      $("#minStepDay").prop("value", data.minStepDay);
		  $("#minStandardDays").prop("value", data.minStandardDays);
		  $("#maxStandardDays").prop("value", data.maxStandardDays);
		  $("#source").val(data.source);
		  var meun=data.source;
		  /**初始化运营活动选择**/
		  initMenuSelect(meun); 
		  /**运营活动功能下拉框值被选中**/
		  var menumodule=data.source.split(",");
		  if(menumodule.length>1){
			  for(i=0;i<menumodule.length;i++){
				  $("#backConfigure").find("option[value=" + menumodule[i]+ "]").prop("selected",true);
			  }
		  }else if(menumodule.length==1){
			  $("#backConfigure").find("option[value=" + data.source+ "]").prop("selected",true);
		  }
		  
	  	});
		$("#totalModal").modal("show");
	  });
  
  //查看活动
  $("#read").click(function(){
		$(".formtips").remove();	
		$("#save").remove();	
		var url = "/run/cms/activityRule/selectActivityRuleOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#id").prop("value", data.id);
	      $("#ruleName").prop("value", data.ruleName);
	      $("#activityId").prop("value", data.activityId);
	      $("#maxStepDay").prop("value", data.maxStepDay);
	      $("#minStepDay").prop("value", data.minStepDay);
		  $("#minStandardDays").prop("value", data.minStandardDays);
		  $("#maxStandardDays").prop("value", data.maxStandardDays);      
		  $("#source").val(data.source);
		  var meun=data.source;
		  /**初始化运营活动选择**/
		  initMenuSelect(meun); 
		  /**运营活动功能下拉框值被选中**/
		  var menumodule=data.source.split(",");
		  if(menumodule.length>1){
			  for(i=0;i<menumodule.length;i++){
				  $("#backConfigure").find("option[value=" + menumodule[i]+ "]").prop("selected",true);
			  }
		  }else if(menumodule.length==1){
			  $("#backConfigure").find("option[value=" + data.source+ "]").prop("selected",true);
		  }
		  
	  	});
		$("#totalModal").modal("show");
	  });
  

  /**添加渠道多选框初始化**/
  function initMenuSelect(menuStr){
  	if(menuStr != ""){
  		var arr=menuStr.split(',');
  		$('#backConfigure').val(arr);
  		$('#backConfigure').multiselect("refresh");
  	}
  };
  $(".applyli").click(function(){
	  window.location.replace('http://'+window.location.host + '/run/cms/activityRule/selectActivityRuleOne/'+ $(this).attr("value"));
  });
  
  /**添加渠道多选框配置**/
  $("#backConfigure").multiselect({
 	header: false,
 	height: 200,
 	minWidth: 200,
 	selectedList: 5,//预设值最多显示5被选中项
 	hide: ["explode", 500],
 	noneSelectedText: '请选择添加渠道',
 	close: function(){
 			var values= $("#backConfigure").val();
 			var namevalues = "";
 			$("#backConfigure").find("option:selected").each(function(){
 				namevalues = namevalues + $(this).text() + ",";
 			});
 			$("#source").val(values);
 			$("#menu_namearray").val(namevalues);
 		},
 		click: function(){
 		},
 	});
  
  $(".copy").click(function(){
	   var activityid = $(this).attr("value");
		 if(window.confirm('你确定要copy此规则内容吗？')){
			 var url = "/run/cms/activityRule/copyActivityRuleById/"+activityid;
			 $.get(url, function (data){
				 if(data!=null){
					 location.reload(); 
				 }
			 });			
         }else{            
            return false;
        }	 
	});
  
  $(".deleteOne").click(function(){
	  var activityid = $(this).attr("value");
	  if(window.confirm('你确定要删除吗？')){
		  var url = "/run/cms/activityRule/deleteActivityRuleById/"+activityid;
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
		var values= $("#backConfigure").val();
		var namevalues = "";
		$("#backConfigure").find("option:selected").each(function(){
			namevalues = namevalues + $(this).text() + ",";
		});
		$("#source").val(values);
		$("#menu_namearray").val(namevalues);
		if($("#ruleName").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*规则名称不得为空</span>");
			return false;
		}
		if($("#activityId").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*活动ID不得为空</span>");
			return false;
		}
		if($("#source").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*渠道不能为空</span>");
			return false;
		}
		if($("#maxStepDay").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*每天最大步数不得为空</span>");
			return false;
		}
		if($("#minStepDay").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*每天最小步数不得为空</span>");
			return false;
		}
		if($("#minStandardDays").val().replace(/^\s+|\s+$/g,"") == "") {
			$container.append("<span class='formtips' style='color:red;'>*最小达标天数不得为空</span>");
			return false;
		}
		if($("#maxStandardDays").val() > $("#endTime").val()) {
			$container.append("<span class='formtips' style='color:red;'>*最大达标天数不得为空</span>");
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