
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

  //添加运营活动
  $("#add").click(function(){
	$(".formtips").remove();
	$("#marketing-id").prop("value", "");
	$("#all_channel").val("");
	$("#menu_namearray").val("");
	$("#activities_icon").prop("src", "/img/no_img.jpg");
	$("#uploadImg").hide();
	$("#uploadPre").show();
	$("#sabe").show();
	$("#activities_name").prop("value", "");
	$("#activities_url").prop("value", "");
	$("#activity_Id").prop("value", "");
	$("#dis_order").prop("value", "");
	$("#startTime").prop("value", "");
	$("#endTime").prop("value", "");
	$("#minStep").prop("value", "");
	$("#maxStep").prop("value", "");
	$("#backConfigure").multiselect("uncheckAll");
	$("#activitiesType").prop("value", "1");
	$(":radio[value=1][class=isselfFlagRadio]").prop("checked",true);
	$("#totalModal").modal("show");
  });
  
  //删除运营活动
  $(".deleteOne").click(function(){
	   var marketingid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/marketingactivities/delete/marketingActivities/"+marketingid;
			 $.get(url, function (data){
				 if(data!=null){
					 location.reload(); 
				 }
			 });			
         }else{            
            return false;
        }	 
	});
  
  /**添加渠道多选框初始化**/
  function initMenuSelect(menuStr){
  	if(menuStr != ""){
  		var arr=menuStr.split(',');
  		$('#backConfigure').val(arr);
  		$('#backConfigure').multiselect("refresh");
  	}
  }	
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
 			$("#all_channel").val(values);
 			$("#menu_namearray").val(namevalues);
 		},
 		click: function(){
 		},
 	});
  	
  //修改运营活动
	  $(".edit").click(function(){
		$(".formtips").remove();
		$("#sabe").show();
		var url = "/run/cms/marketingactivities/select/marketingone/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#marketing-id").prop("value", data.id);
	      $("#activitiesType option[value='"+data.activitiesType+"']").attr("selected", "selected");
		  $("#activities_name").prop("value", data.activitiesName);
		  $("#activity_code").prop("value", data.activityCode);
		  $("#activity_mark").prop("value", data.activityMark);
		  $("#activities_icon").prop("src", data.activitiesIcon);
		  $("#uploadImg").hide();
		  $("#activities_url").prop("value", data.activitiesUrl);
		  $("#activity_Id").prop("value", data.activityId);
		  $("#dis_order").prop("value", data.disOrder);
		  $(":radio[value=" + data.isselfFlag + "][class=isselfFlagRadio]").prop("checked",true);	
		  $("#startTime").prop("value", data.startTime);
		  $("#endTime").prop("value", data.endTime);
		  $("#minStep").prop("value", data.minStep);
		  $("#maxStep").prop("value", data.maxStep);
		  $("#all_channel").val(data.allChannel);
		  var meun=data.allChannel;
		  /**初始化运营活动选择**/
		  initMenuSelect(meun); 
		  /**运营活动功能下拉框值被选中**/
		  var menumodule=data.allChannel.split(",");
		  if(menumodule.length>1){
		  for(i=0;i<menumodule.length;i++){
			  $("#backConfigure").find("option[value=" + menumodule[i]+ "]").prop("selected",true);
		  }
		  }else if(menumodule.length==1){
			  $("#backConfigure").find("option[value=" + data.allChannel+ "]").prop("selected",true);
		  }
		  

	  	});
		$("#totalModal").modal("show");
	  });
	  
	 //保存操作的校验条件
		$("#save").click(function(){					
			var $container = $("#inputcontent").parent();
			$(".formtips").remove();
			if($("#marketing-id").val() == "" && $("#uploadImgId").attr("src") == undefined) {
				$container.append("<span class='formtips' style='color:red;'>*活动图标不能为空</span>");
				return false;
			}			
			if($("#activities_name").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*活动名称不得为空</span>");
				return false;
			}
			if($("#activities_url").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*活动链接不得为空</span>");
				return false;
			}	
			if($("#dis_order").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*显示顺序不得为空</span>");
				return false;
			}	
						
			var r = /^\d+$/g;　　//正整数
			var t = $("#dis_order").val();
			 // 如果判断为正整数，则flag为true
			if(!r.test(t)){
				$container.append("<span class='formtips' style='color:red;'>*显示顺序必须为正整数</span>");
				return false;	
			}
					
			if($("#startTime").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*活动起始时间不得为空</span>");
				return false;
			}
			var d = new Date();
			var year=d.getFullYear(); 
			var month=d.getMonth()+1; 
			var day=d.getDate(); 			 
			if(month<10) month="0" + month 
			if(day<10) day="0" + day 			
			var now = year + "-" + month + "-" + day;		
/*			if($("#startTime").val() <= now) {
				$container.append("<span class='formtips' style='color:red;'>*活动开始时间必须大于系统时间</span>");
				return false;
			}*/
			if($("#endTime").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*活动结束时间不得为空</span>");
				return false;
			}
			if($("#startTime").val() > $("#endTime").val()) {
				$container.append("<span class='formtips' style='color:red;'>*活动结束时间不能小于起始时间</span>");
				return false;
			}
			if($("#minStep").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*最小步数不得为空</span>");
				return false;
			}	
			if($("#maxStep").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*最大步数不得为空</span>");
				return false;
			}	
			var channel = $("#all_channel").val();
			if(channel == "") {
				$container.append("<span class='formtips' style='color:red;'>*添加的渠道不得为空</span>");
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
	
	$(".activitiesType").change(function(){
		var value=$(this).children('option:selected').val();//这就是selected的值
		if(value == '13')//导航菜单标示
		{
		$("#wenzi").show();
		}else{
		$("#wenzi").hide();
		}
		});
