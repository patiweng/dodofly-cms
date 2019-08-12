
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
	$("#product_name").prop("value", "");
	$("#campaign_id").prop("value", "");
	$("#channel_id").prop("value", "");
	$("#healthcampaign-id").prop("value", "");
	$(":radio[value=1][class=status]").prop("checked",true);
	$("#status1").attr("disabled",false);
	$("#status2").attr("disabled",false);
	$("#totalModal").modal("show");
  });
  
  //删除运营活动
  $(".deleteOne").click(function(){
	   var campaignid = $(this).attr("value");
		 if(window.confirm('你确定要删除吗？')){
			 var url = "/run/cms/health/campaign/delete/campaignlist/"+campaignid;
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
		var url = "/run/cms/health/campaign/selectone/campaignlistone/" + $(this).attr("value");
	    $.get(url, function (data) {
	      $("#healthcampaign-id").prop("value", data.id);
	      $("#channelNo").find("option[value=" + data.channelNo + "]").prop("selected",true);
		  $("#product_name").prop("value", data.productName);
		  $("#campaign_id").prop("value", data.campaignId);
		  $("#package_id").prop("value", data.packageId);
		  $("#channel_id").prop("value", data.channelId);
		  $(":radio[value=" + data.status + "][class=status]").prop("checked",true);
		 
	  	});
		$("#totalModal").modal("show");
	  });
	  
	 //保存操作的校验条件
		$("#save").click(function(){	
			var $container = $("#inputcontent").parent();						
			$(".formtips").remove();
			
			if($("#product_name").val().replace(/^\s+|\s+$/g,"") == "") {
				$container.append("<span class='formtips' style='color:red;'>*产品名称不得为空</span>");
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
		});

	function postData() {
		$("#eventForm").ajaxSubmit(function(data) {  	
			alert(data.errorMessage);
			 location.reload();
		}); 
	    return false;
	}