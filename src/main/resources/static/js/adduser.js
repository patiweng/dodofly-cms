function check() {
	$(".formtips").remove();
	var $loginName = $("#loginName").parent();
	if($("#loginName").val().replace(/^\s+|\s+$/g,"") == "") {
		$loginName.append("<span class='formtips'>*用户名不能为空</span>");
		return false;
	}
    var phone = $("#loginName").val();
	if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
		$loginName.append("<span class='formtips'>*手机号码格式不对</span>");
		return false;
	}
    var $container = $("#loginPassword").parent();
	if($("#loginPassword").val().replace(/^\s+|\s+$/g,"") == ""){
		$container.append("<span class='formtips'>*密码不得为空</span>");
		return false;
	}
	var password =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}/;
	if(!password.test($("#loginPassword").val())|| $("#loginPassword").val().length!=8){
		$container.append("<span class='formtips'>*密码为8位字母和数字组合</span>");
		return false;
	}
	var $accessPartyId = $("#accessPartyId").parent();
	if($("#accessPartyId").val() == 0) {
		$accessPartyId.append("<span class='formtips' style='color:red;'>*接入方不能为空</span>");
		return false;
	}
	
	$("form :input").focus(function(){
    	$(".formtips").remove();
    });
	
	$("#form").submit();
}

function postData() {
	$("#form").ajaxSubmit(function(data) {
		myAlert = $('.myalert');
		if(data.errorMessage == "00") {
			if (myAlert.is(':hidden')) {
			    myAlert.show();
			    $('document').addClass('modal-open');
			    setTimeout(function () {
			        myAlert.fadeOut(500);
			        $('document').removeClass('modal-open');
			    }, 3000)
			}
			location.reload();
		} else if(data.errorMessage == "100201") {
			var $loginName = $("#loginName").parent();
			$loginName.append("<span class='formtips' style='color:red;'>*" + data.errorDescription + "</span>");
		} else {
			alert(data.errorDescription);
		}
	});
    return false;
}

