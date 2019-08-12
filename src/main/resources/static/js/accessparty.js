/**菜单功能多选框初始化**/
function initMenuSelect(menuStr){
	if(menuStr != ""){
		var arr=menuStr.split(',');
		$('#backConfigure').val(arr);
		$('#backConfigure').multiselect("refresh");
	}
}	
/**菜单功能多选框初始化**/
function initLiveSelect(liveStr){
	if(liveStr != ""){
		var arr=liveStr.split(',');
		$('#lifemodelfunction').val(arr);
		$('#lifemodelfunction').multiselect("refresh");
	}
}
$(function(){
	
 /**菜单功能多选框配置**/
 $("#backConfigure").multiselect({
	header: false,
	height: 200,
	minWidth: 200,
	selectedList: 10,//预设值最多显示10被选中项
	hide: ["explode", 500],
	noneSelectedText: '请进行后台功能配置',
	close: function(){
			var values= $("#backConfigure").val();
			var namevalues = "";
			$("#backConfigure").find("option:selected").each(function(){
				namevalues = namevalues + $(this).text() + ",";
			});
			$("#sysMenuIdsSelected").val(values);
			$("#menu_namearray").val(namevalues);
		},
		click: function(){
		},
	});
 /**生活模块功能多选框配置**/
 $("#lifemodelfunction").multiselect({
		header: false,
		height: 200,
		minWidth: 200,
		selectedList: 10,//预设值最多显示10被选中项
		hide: ["explode", 500],
		noneSelectedText: '请进行生活模块配置',
		close: function(){
				var values= $("#lifemodelfunction").val();
				var namevalues = "";
				$("#lifemodelfunction").find("option:selected").each(function(){
					namevalues = namevalues + $(this).text() + ",";
				});
				$("#liveIdsSelected").val(values);
				$("#lifemodel_namearray").val(namevalues);
			},
			click: function(){
			},
		});
  $(".edit").click(function(){
	  $(".formtips").remove();
	  var id = $(this).attr("value");
	  var url = "/b2g/bops/accessparty/selectbyid/" + id;
    $.get(url, function (data, status) {
      $("#access-id").prop("value",id); 
	  $("#access-name").prop("value", data.accessPartyName);
	  $("#company-id").prop("value", data.companyId);
	  $("#company-token").prop("value", data.companyToken);
	  $("#liveIdsSelected").val(data.liveIdsSelected);
	  $("#sysMenuIdsSelected").val(data.sysMenuIdsSelected);
	  var meun=data.sysMenuIdsSelected;
	  /**初始化后台配置功能**/
	  initMenuSelect(meun); 
	  /**后台配置功能下拉框值被选中**/
	  var menumodule=data.sysMenuIdsSelected.split(",");
	  if(menumodule.length>1){
	  for(i=0;i<menumodule.length;i++){
		  $("#backConfigure").find("option[value=" + menumodule[i]+ "]").prop("selected",true);
	  }
	  }else if(menumodule.length==1){
		  $("#backConfigure").find("option[value=" + data.sysMenuIdsSelected+ "]").prop("selected",true);
	  }
	  var livemodule=data.liveIdsSelected;
	  /**初始化生活模块功能**/
	  initLiveSelect(livemodule);
	  /**生活模块功能下拉框值被选中**/
	  var lifemodule=data.liveIdsSelected.split(",");
	  if(lifemodule.length>1){
		  for(i=0;i<lifemodule.length;i++){
			  $("#lifemodelfunction").find("option[value=" + lifemodule[i]+ "]").prop("selected",true);
		  }
	  }else if(lifemodule.length==1){
		  $("#lifemodelfunction").find("option[value=" +data.liveIdsSelected+ "]").prop("selected",true);
	  }
	  $(":radio[value=" + data.accessStatus + "][class=inlineRadio]").prop("checked",true);
	  
	  
	  var lifemodel = [];
	  var backconfigure = [];
	  
	//判断生活模块是否选中，并赋值
	  /**重新选择生活模块功能,进行赋值**/
	    var selectlifemodule = document.getElementById("lifemodelfunction");
	    var $lifemodule =  $("#lifemodelfunction").parent();
	    for(i=0;i<selectlifemodule.length;i++){
	        if(selectlifemodule.options[i].selected){
	            lifemodel.push(selectlifemodule[i].value);
	        }
	    }
		if(lifemodel.length==0||selectlifemodule.length==0){
			$lifemodule.append("<span class='formtips'>*请选择生活模块</span>");
			return false;
		}
		
		$("#liveIdsSelected").val(lifemodel);

		/**重新选择后台配置功能,进行赋值**/
		 var selectbackconfigure = document.getElementById("backConfigure");
		 var $backConfigure = $("#backConfigure").parent();
		    for(i=0;i<selectbackconfigure.length;i++){
		        if(selectbackconfigure.options[i].selected){
		        	backConfigure.push(selectbackconfigure[i].value);
		        }
		    }
			if(backConfigure.length==0||selectbackconfigure.length==0){
				$backConfigure.append("<span class='formtips'>*请选择后台配置功能</span>");
				return false;
	     }
	    $("#sysMenuIdsSelected").val(backConfigure);
		 
  	});
	$("#exampleModal").modal("show");
     });
});

$(function(){
  $("#add").click(function(){
	//点击添加接入方，将所有的文本框清空，并且所有选中状态的值改为反选
	$(".formtips").remove();
	$("#access-name").prop("value", "");
	$("#company-id").prop("value", "");
	$("#company-token").prop("value", "");
	$(":radio[value=1][class=inlineRadio]").prop("checked",true);
	$("#liveIdsSelected").val("");
	$("#sysMenuIdsSelected").val("");
	$("#menu_namearray").val("");
	$("#lifemodel_namearray").val("");
	$("#backConfigure").multiselect("uncheckAll");
	$("#lifemodelfunction").multiselect("uncheckAll");
	$("#exampleModal").modal("show");
  });
});

$(function(){
	$(".btn").click(function(){
		$(".formtips").remove();
		var $parentName = $("#access-name").parent();
		if($("#access-name").val().replace(/^\s+|\s+$/g,"") == "") {
			$parentName.append("<span class='formtips' style='color:red'>*接入方名称不得为空</span>");
			return false;
		}
		
		var $parentCompany = $("#company-id").parent();
		if($("#company-id").val().replace(/^\s+|\s+$/g,"") == "") {
			$parentCompany.append("<span class='formtips' style='color:red'>*企业号不得为空</span>");
			return false;
		}
		
		var $companyToken = $("#company-token").parent();
		if($("#company-token").val().replace(/^\s+|\s+$/g,"") == "") {
			$companyToken.append("<span class='formtips' style='color:red'>*步步保标识不得为空</span>");
			return false;
		}
		var menuselect = $("#sysMenuIdsSelected").val();
		if(menuselect == ""){
			$("#menu_namearray").after("<span class='formtips' style='color:red'>*请选择后台配置功能</span>");
			return false;
		}
		var liveselect = $("#liveIdsSelected").val();
		if(liveselect == ""){
			$("#lifemodel_namearray").after("<span class='formtips' style='color:red'>*请选择生活模块</span>");
			return false;
		}
	});
	
	$("form :input").focus(function(){
    	$(".formtips").remove();
    });
	
});

function postData() {
	$("#AddAccessparty").ajaxSubmit(function(data) {
		if(data.errorMessage == "0") {
			window.location.reload();
		} else if(data.errorMessage == "111"||data.errorMessage == "112") {
			var $parentStatus = $("#errMsg").parent();
			$parentStatus.append("<span class='formtips' style='color:red;text-align:center';>*" + data.errorDescription + "</span>");
		}else {
			alert(data.errorDescription);
		}
	});
    return false;
}