
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
	$("#campaign_name").prop("value", "");
	$("#campaign_id").prop("value", "");
	$("#package_id").prop("value", "");
    $("#product_code").prop("value", "");
	$("#version_id").prop("value", "");
	$("#channel_id").prop("value", "");
	$("#activity_require").prop("value", "");
	$("#targetcoverage").prop("value", "");
	$("#campaign-id").prop("value", "");
	$("#activitiesType").prop("value", "1");
	$(":radio[value=1][class=payActivity]").prop("checked",true);
	$(":radio[value=1][class=introName]").prop("checked",true);
    $(":radio[value=0][class=campaignType]").prop("checked",true);
	$("#payActivity1").attr("disabled",false);
	$("#payActivity2").attr("disabled",false);
	$("#introName1").attr("disabled",false);
	$("#introName2").attr("disabled",false);
    $("#campaignType1").attr("disabled",false);
    $("#campaignType2").attr("disabled",false);
	$("#totalModal").modal("show");
  });
  
  //删除运营活动
  $(".deleteOne").click(function(){
	   var campaignid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/campaign/delete/campaignlist/"+campaignid;
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
		var url = "/run/cms/campaign/selectone/campaignlistone/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#campaign-id").prop("value", data.id);
	      $("#channelNo").find("option[value=" + data.channelNo + "]").prop("selected",true);
		  $("#campaign_name").prop("value", data.campaignName);
		  $("#campaign_id").prop("value", data.campaignId);
		  $("#package_id").prop("value", data.packageId);
          $("#product_code").prop("value", data.productCode);
		  $("#version_id").prop("value", data.versionId);
		  $("#channel_id").prop("value", data.channelId);
		  $("#activity_require").prop("value", data.activityRequire);
		  $("#targetcoverage").prop("value",data.targetCoverage);
		  $(":radio[value=" + data.payActivity + "][class=payActivity]").prop("checked",true);
		  $(":radio[value=" + data.introName + "][class=introName]").prop("checked",true);
          $(":radio[value=" + data.campaignType + "][class=campaignType]").prop("checked",true);
		  $("#payActivity1").attr("disabled",true);
		  $("#payActivity2").attr("disabled",true);
		  $("#introName1").attr("disabled",true);
		  $("#introName2").attr("disabled",true);
          $("#campaignType1").attr("disabled",true);
          $("#campaignType2").attr("disabled",true);
		  
	  	});
		$("#totalModal").modal("show");
	  });
	  
	 //保存操作的校验条件
		$("#save").click(function(){					
			var $container = $("#inputcontent").parent();						
			$(".formtips").remove();
			
			if($("#campaign_name").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*营销活动名称不得为空</span>");
				return false;
			}
			if($("#campaign_id").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*营销活动ID不得为空</span>");
				return false;
			}		
			if($("#package_id").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*产品组合ID不得为空</span>");
				return false;
			}
            if($("#product_code").val().replace(/^\s+|\s+$/g,"") == "") {
                $container.append("<span class='formtips' style='color:red;'>*产品组合code不得为空</span>");
                return false;
            }
			if($("#version_id").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*版本ID不得为空</span>");
				return false;
			}
			if($("#activity_require").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*步数不能为空</span>");
				return false;
			}
			if($("#channel_id").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*渠道ID不能为空</span>");
				return false;
			}
			if($("#targetcoverage").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*保额不能为空</span>");
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
