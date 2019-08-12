package com.dodofly.cms.constants;

public class CmsConstants {

    /******** 登录模块系统常量 **********/
    public static class LoginModelConst {
        /** 登录标识码 **/
        public static String LOGIN_ZASID     = "za_cms_login_sid";
        /** 拦截器过滤规则 **/
        public static String INTERCPT_FILTER = "/sys/index;/sys/login";
        /** 用户信息 **/
        public static String BOPS_USERINFO   = "userInfo";
        /** 当前选中菜单 **/
        public static String BOPS_NOWMENU    = "nowMenu";
        /** 登录超时时间 **/
        public static int    LOGIN_OUT_TIME  = 1800;

        public static String BOPS_FLAG       = "bopsFlag";

    }

}
