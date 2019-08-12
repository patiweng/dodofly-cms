package com.dodofly.cms.service.login;

import com.dodofly.cms.bean.BaseResult;
import com.dodofly.cms.webdto.LoginCmsUserDTO;

public interface RunUserLoginService {

    public BaseResult<LoginCmsUserDTO> login(String userName, String password);

    public BaseResult<LoginCmsUserDTO> checkLogin(String token);

    public BaseResult<String> editPwd(String userName, String oPwd, String nPwd);
}
