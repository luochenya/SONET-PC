import Vue from "vue";
import VueRouter from "vue-router";
import routeMap from "@/router/routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/Login"
  },
  // 404
  {
    path: "/404",
    component: routeMap["404"]
  },
  {
    path: "*",
    redirect: "/404"
  },
  // 404
  // pc端
  {
    path: "/Login",
    name: "Login",
    component: routeMap["Login"]
  },
  {
    path: "/Registered",
    name: "Registered",
    component: routeMap["Registered"]
  },
  {
    path: "/ForgetPassword",
    name: "ForgetPassword",
    component: routeMap["ForgetPassword"]
  },
  {
    path: "/ResetPassword",
    name: "ResetPassword",
    component: routeMap["ResetPassword"]
  },
  {
    path: "/Home",
    name: "Home",
    component: routeMap["Home"]
  },
  // 通知设定（讯息中心）
  {
    path: "/NotificationSettings",
    name: "NotificationSettings",
    component: routeMap["NotificationSettings"]
  },
  // 系统公告（讯息中心）
  {
    path: "/SystemNotification",
    name: "SystemNotification",
    component: routeMap["SystemNotification"]
  },
  // 变更密码（基本功能）
  {
    path: "/ChangePassword",
    name: "ChangePassword",
    component: routeMap["ChangePassword"]
  },
  // 偏好设定（基本功能）
  {
    path: "/Preferences",
    name: "Preferences",
    component: routeMap["Preferences"]
  },
  // 账号设定（基本功能）
  {
    path: "/AccountSettings",
    name: "AccountSettings",
    component: routeMap["AccountSettings"]
  },
  // 使用Q&A（基本功能）
  {
    path: "/UseQA",
    name: "UseQA",
    component: routeMap["UseQA"]
  },
  // 点数记录（电商功能）
  {
    path: "/PointsRecord",
    name: "PointsRecord",
    component: routeMap["PointsRecord"]
  },
  // 礼物发送（电商功能）
  {
    path: "/GiftSending",
    name: "GiftSending",
    component: routeMap["GiftSending"]
  },
  // 邀请码发送（电商功能）
  {
    path: "/SendInvitationCode",
    name: "SendInvitationCode",
    component: routeMap["SendInvitationCode"]
  },
  // 订阅管理（订阅收藏）
  {
    path: "/SubscriptionManagement",
    name: "SubscriptionManagement",
    component: routeMap["SubscriptionManagement"]
  },
];

const router = new VueRouter({
  routes
});

export default router;
