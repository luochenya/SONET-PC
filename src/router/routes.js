const routes = {
  // 登录
  Login: () =>
    import(
      /* webpackChunkName: "Login" */
      "@/views/Login/Login.vue"
    ),
  // 注册
  Registered: () =>
    import(
      /* webpackChunkName: "Registered" */
      "@/views/Login/Registered.vue"
    ),
  // 忘记密码
  ForgetPassword: () =>
    import(
      /* webpackChunkName: "ForgetPassword" */
      "@/views/Login/ForgetPassword.vue"
    ),
  // 重置密码
  ResetPassword: () =>
    import(
      /* webpackChunkName: "ResetPassword" */
      "@/views/Login/ResetPassword.vue"
    ),
  // 首页
  Home: () =>
    import(
      /* webpackChunkName: "Home" */
      "@/views/Home/Home.vue"
    ),
  // 讯息中心菜单
  // 通知设定
  NotificationSettings: () =>
    import(
      /* webpackChunkName: "NotificationSettings" */
      "@/views/MessageCenter/NotificationSettings/NotificationSettings.vue"
    ),
  // 系统公告
  SystemNotification: () =>
    import(
      /* webpackChunkName: "SystemNotification" */
      "@/views/MessageCenter/SystemNotification/SystemNotification.vue"
    ),
  // 基本功能菜单
  // 变更密码
  ChangePassword: () =>
    import(
      /* webpackChunkName: "ChangePassword" */
      "@/views/BasicSkills/ChangePassword/ChangePassword.vue"
    ),
  // 偏好设定
  Preferences: () =>
    import(
      /* webpackChunkName: "Preferences" */
      "@/views/BasicSkills/Preferences/Preferences.vue"
    ),
  // 账号设定
  AccountSettings: () =>
    import(
      /* webpackChunkName: "AccountSettings" */
      "@/views/BasicSkills/AccountSettings/AccountSettings.vue"
    ),
  // 使用Q&A
  UseQA: () =>
    import(
      /* webpackChunkName: "UseQA" */
      "@/views/BasicSkills/UseQA/UseQA.vue"
    ),
  // 电商功能菜单
  // 点数记录
  PointsRecord: () =>
    import(
      /* webpackChunkName: "PointsRecord" */
      "@/views/ECommerce/PointsRecord/PointsRecord.vue"
    ),
  // 礼物发送
  GiftSending: () =>
    import(
      /* webpackChunkName: "GiftSending" */
      "@/views/ECommerce/GiftSending/GiftSending.vue"
    ),
  // 邀请码发送
  SendInvitationCode: () =>
    import(
      /* webpackChunkName: "SendInvitationCode" */
      "@/views/ECommerce/SendInvitationCode/SendInvitationCode.vue"
    ),
  // 订阅收藏菜单
  // 订阅管理
  SubscriptionManagement: () =>
    import(
      /* webpackChunkName: "SubscriptionManagement" */
      "@/views/SubscribeFavorites/SubscriptionManagement/SubscriptionManagement.vue"
    ),
};

export default routes;
