$(function(){
	$("#select").click(function(){
		if($("#selectStartTime").val() != "" && $("#selectEndTime").val() != "") {
			if($("#selectStartTime").val() > $("#selectEndTime").val()) {
				alert("结束时间不得小于起始时间");
				return false;
			}
		}
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
});

$(function(){
  $("#add").click(function(){
	$(".formtips").remove();
	$("#banner-id").prop("value", "");
	$("#banner-name").prop("value", "");
	$("#banner-tag").find("option[value=0]").prop("selected",true);
	$("#banner-url").prop("value", "");
	$(":radio[value=1][class=inlineRadio]").prop("checked",true);
	$("#banner-img").prop("src", "/img/no_img.jpg");
	$("#imgUpload").hide();
    $("#imgPre").show();
	$("#totalModal").modal("show");
  });
});

$(function(){
  $(".edit").click(function(){
	$(".formtips").remove();
	var url = "/b2g/bops/banner/selectbyid/banner/" + $(this).attr("value");
    $.get(url, function (data) {
      $("#banner-id").prop("value", data.id);
	  $("#banner-name").prop("value", data.bannerName);
	  $("#banner-tag").find("option[value=" + data.bannerTag + "]").prop("selected",true);
	  $("#banner-url").prop("value", data.bannerUrl);
	  $(":radio[value=" + data.status + "][class=inlineRadio]").prop("checked",true);
	  var imgUrl = data.bannerImage;
	  if(imgUrl.indexOf("b2g/banner/") == 0) {
		  imgUrl = imgUrl.replace("b2g/banner/","");
		  $("#banner-img").prop("src", "/b2g/bops/banner/getimg/banner/" + imgUrl);
	  }
	  $("#imgUpload").hide();
	  $("#imgPre").show();
  	});
	$("#totalModal").modal("show");
  });
});

$(function(){
	$("#save").click(function(){
		$(".formtips").remove();
		var $parentArea = $("#access-party").parent();
		if($("#access-party").val() == 0) {
			$parentArea.append("<span class='formtips' style='color:red;'>*接入方不能为空</span>");
			return false;
		}
		
		var $parentName = $("#banner-name").parent();
		if($("#banner-name").val().replace(/^\s+|\s+$/g,"") == "") {
			$parentName.append("<span class='formtips' style='color:red;'>*banner名称不能为空</span>");
			return false;
		}
		if($("#banner-name").val().length > 15) {
			$parentName.append("<span class='formtips' style='color:red;'>*banner名称字数不得超过15个</span>");
			return false;
		}
		
		var $parentTag = $("#banner-tag").parent();
		if($("#banner-tag").val() == 0) {
			$parentTag.append("<span class='formtips' style='color:red;'>*banner标签不能为空</span>");
			return false;
		}
		
		var $parentImg = $("#banner-img").parent();
		if($("#banner-id").val() == "" && $("#newImg").attr("src") == undefined) {
			$parentImg.append("<span class='formtips' style='color:red;'>*banner图片不能为空</span>");
			return false;
		}
		
		var $parentNewImg = $("#newImg").parent();
		var src = $("#newImg").attr("src");
		if(src != undefined) {
			var theImage = new Image();
			theImage.src = src;
			if(theImage.width != 750 || theImage.height != 400) {
				$parentNewImg.append("<span class='formtips' style='color:red;'>*banner图片规定尺寸为750*400</span>");
				return false;
			}
		}
	});

	$("form :input").focus(function(){
    	$(".formtips").remove();
    });
	
	$(".selectAct").change(function(){
    	$(".formtips").remove();
    });
});

function postData() {
	$("#bannerForm").ajaxSubmit(function(data) {
		if(data.errorMessage == "00") {
			location.reload();
		} else if(data.errorMessage == "03") {
			var $parentStatus = $("#inlineRadio2").parent();
			$parentStatus.append("<span class='formtips' style='color:red;'>*" + data.errorDescription + "</span>");
		} else if(data.errorMessage == "100006") {
			var $parentNewImg = $("#newImg").parent();
			$parentNewImg.append("<span class='formtips' style='color:red;'>*" + data.errorDescription + "</span>");
		} else {
			alert(data.errorDescription);
		}
	});
    return false;
}