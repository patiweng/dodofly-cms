package com.dodofly.cms.common;

import com.alibaba.fastjson.JSONObject;
import com.dodofly.cms.bean.BaseResult;
import com.dodofly.cms.constants.CmsConstants;
import com.dodofly.cms.webdto.LogCmsUserDTO;
import com.google.common.collect.Maps;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@Slf4j
public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String bopsFlag = request.getParameter(CmsConstants.LoginModelConst.BOPS_FLAG);
        if (bopsFlag == null || "".equals(bopsFlag)) {
            return true;
        }
        String method = request.getMethod();
        if ("POST".equalsIgnoreCase(method) || "GET".equalsIgnoreCase(method)) {
            log.info("LoginCheckInterceptor method is :" + method);

        } else {
            log.info("LoginCheckInterceptor method is :" + method);
            response.getWriter().write("Error Request");
            return false;
        }
        String uriPath = request.getRequestURI();
        Cookie cks[] = request.getCookies();
        if (checkFilter(uriPath)) {
            return true;
        }
        log.info("request uri -------------- {}", uriPath);
        log.info("request cookieStr -------------- {}", JSONObject.toJSONString(cks));
        /** 读取cookie **/
        Cookie sidCk = getCookeiByName(CmsConstants.LoginModelConst.LOGIN_ZASID, cks);
        if (sidCk == null) {
            log.info("sidCk checklogin fail,sidCk is null");
            /** 未登录、跳转至登录页面 **/
            response.sendRedirect("/dodofly/cms/sys/index");
            return false;
        }
        /** 获取登录标识SID **/
        String sid = sidCk.getValue();
        /** 校验登录是否有效 **/
        BaseResult<LogCmsUserDTO> logRs =null;
        if (!logRs.success()) {
            log.info("sid{} checklogin fail,sid check fail", sid);
            /** 未登录、跳转至登录页面 **/
            response.sendRedirect("/run/cms/sys/index");
            return false;
        }
        /** SID存放在request中、便于后续业务获取 **/
        request.setAttribute(CmsConstants.LoginModelConst.LOGIN_ZASID, sid);
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView)
            throws IOException {
        String bopsFlag = request.getParameter(CmsConstants.LoginModelConst.BOPS_FLAG);
        if (bopsFlag == null || "".equals(bopsFlag)) {
            return;
        }
        /** 将用户菜单信息返回给前端 **/
        String uriPath = request.getRequestURI();
        Cookie cks[] = request.getCookies();
        if (checkFilter(uriPath)) {
            return;
        }
        /** 读取cookie **/
        Cookie sidCk = getCookeiByName(CmsConstants.LoginModelConst.LOGIN_ZASID, cks);
        /** 获取登录标识SID **/
        String sid = sidCk.getValue();
        /** 获取用户信息、返回给前端 **/
        BaseResult<LogCmsUserDTO> logRs = null;
        Map<String, Object> model = Maps.newHashMap();
        model.put(CmsConstants.LoginModelConst.BOPS_USERINFO, logRs.getResult().getPrivmenuList());
        /** 获取当前菜单URI **/
        String uri = request.getRequestURI();
        model.put(CmsConstants.LoginModelConst.BOPS_NOWMENU, uri);
        if (modelAndView == null) {
            modelAndView = new ModelAndView();
        }
        modelAndView.addAllObjects(model);
    }

    private Cookie getCookeiByName(String name, Cookie cks[]) {
        if (name == null || "".equals(name)) {
            return null;
        }
        if (cks == null) {
            return null;
        }
        Cookie rc = null;
        for (Cookie c : cks) {
            if (name.equals(c.getName())) {
                rc = c;
                break;
            }
        }
        return rc;
    }

    private boolean checkFilter(String uriPath) {
        String filter[] = CmsConstants.LoginModelConst.INTERCPT_FILTER.split(";");
        for (int i = 0; i < filter.length; i++) {
            if (uriPath.indexOf(filter[i]) > -1) {
                return true;
            }
        }
        return false;
    }
}
