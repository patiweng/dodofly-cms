
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
	$("#channel-id").prop("value", "");
	$("#pay").val("");
	$("#menu_namearray").val("");
	$("#backConfigure").multiselect("uncheckAll");
	$("#moments_url").prop("src", "/img/no_img.jpg");
	$("#friend_url").prop("src", "/img/no_img.jpg");
	$("#uploadImg").hide();
	$("#uploadTwoImg").hide();
	$("#uploadTwoPre").show();
	$("#uploadPre").show();
	$("#sabe").show();
	$("#name").prop("value", "");
	$("#no").prop("value", "");
	$("#type").prop("value", "1");
	$("#title").prop("value", "");
	$("#moments_title").prop("value", "");
	$("#friend_title").prop("value", "");
	$("#friend_describe").prop("value", "");
	$("#url").prop("value", "");
	$(":radio[value=1][class=ownPlatFormRadio]").prop("checked",true);
	$(":radio[value=1][class=isGetFlagRadio]").prop("checked",true);
	$("#totalModal").modal("show");
  });
  
  
  /**支付多选框初始化**/
  function initMenuSelect(menuStr){
  	if(menuStr != ""){
  		var arr=menuStr.split('^');
  		$('#backConfigure').val(arr);
  		$('#backConfigure').multiselect("refresh");
  	}
  }	
  /**支付多选框配置**/
  $("#backConfigure").multiselect({
 	header: false,
 	height: 200,
 	minWidth: 200,
 	selectedList: 5,//预设值最多显示10被选中项
 	hide: ["explode", 500],
 	noneSelectedText: '请选择支付方式',
 	close: function(){
 			var values= $("#backConfigure").val();
 			var namevalues = "";
 			$("#backConfigure").find("option:selected").each(function(){
 				namevalues = namevalues + $(this).text() + "^";
 			});
 			$("#pay").val(values);
 			$("#menu_namearray").val(namevalues);
 		},
 		click: function(){
 		},
 	});
  
  //删除运营活动
  $(".deleteOne").click(function(){
	   var channelid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/channel/delete/channellist/"+channelid;
			 $.get(url, function (data){
				 if(data!=null){
					 location.reload(); 
				 }
			 });			
         }else{            
            return false;
        }	 
	});
	
  //修改运营活动
	  $(".edit").click(function(){
		$(".formtips").remove();	
		var url = "/run/cms/channel/select/channellistOne/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#channel-id").prop("value", data.id);
	      $("#name").prop("value", data.name);
	      $("#no").prop("value", data.no);
	      $("#moments_title").prop("value", data.momentsTitle);
	      $("#friend_title").prop("value", data.friendTitle);
	      $("#friend_describe").prop("value", data.friendDescribe);		 
		  $("#url").prop("value", data.url);
	      $("#type").find("option[value=" + data.type + "]").prop("selected",true);
	      $("#title").prop("value", data.title);
	      //alert(data);
	      $(":radio[value=" + data.ownPlatForm + "][class=ownPlatFormRadio]").prop("checked",true);
	      $(":radio[value=" + data.isGetFlag + "][class=isGetFlagRadio]").prop("checked",true);
	      $("#pay").val(data.pay);
		  var meun=data.pay;
		  /**初始化支付方式选择**/
		  initMenuSelect(meun); 
		  /**支付方式选择功能下拉框值被选中**/
		  var menumodule=data.pay.split("^");
		  if(menumodule.length>1){
		  for(i=0;i<menumodule.length;i++){
			  $("#backConfigure").find("option[value=" + menumodule[i]+ "]").prop("selected",true);
		  }
		  }else if(menumodule.length==1){
			  $("#backConfigure").find("option[value=" + data.pay+ "]").prop("selected",true);
		  }
		  $("#moments_url").prop("src", data.momentsUrl);
		  $("#uploadImg").hide(); 
		  $("#friend_url").prop("src", data.friendUrl);
		  $("#uploadTwoImg").hide(); 	      
	  	});
		$("#totalModal").modal("show");
	  });
	  
	 //保存操作的校验条件
		$("#save").click(function(){					
			var $container = $("#inputcontent").parent();						
			$(".formtips").remove();
			
			if($("#name").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*渠道名称不得为空</span>");
				return false;
			}
			if($("#no").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*渠道号不得为空</span>");
				return false;
			}		
			if($("#title").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*活动名称不得为空</span>");
				return false;
			}
			var pay = $("#pay").val();
			if(pay == "") {
				$container.append("<span class='formtips' style='color:red;'>*支付方式不得为空</span>");
				return false;
			}
			if($("#moments_title").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*朋友圈标题不能为空</span>");
				return false;
			}
			if($("#friend_title").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*好友标题不能为空</span>");
				return false;
			}
			if($("#friend_describe").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*好友描述不能为空</span>");
				return false;
			}  
			if($("#url").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*分享链接不能为空</span>");
				return false;
			} 
			if($("#friend_describe").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*好友描述不能为空</span>");
				return false;
			} 
			if($("#friend_describe").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*好友描述不能为空</span>");
				return false;
			} 
			if($("#channel-id").val() == "" && $("#uploadImgId").attr("src") == undefined) {
				$container.append("<span class='formtips' style='color:red;'>*朋友圈图片不能为空</span>");
				return false;
			}
			if($("#channel-id").val() == "" && $("#uploadTwoImgId").attr("src") == undefined) {
				$container.append("<span class='formtips' style='color:red;'>*朋友圈图片不能为空</span>");
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