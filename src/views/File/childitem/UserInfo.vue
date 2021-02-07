<template>
  <div id="user-info">
    <slot name="user-icon">
      <div class="privateImage-svg left"></div>
    </slot>
    <div class="login-info left">
      <slot name="user-nickname">
        <div>登录/注册</div>
      </slot>
      <div class="phone">
        <span class="icon-mobile">
          <i class="fas fa-mobile-alt"></i>
        </span>
        <slot name="user-phone">暂无绑定手机号</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info {
  background-color: #ee9595;
  padding: 15px;
  width: 100%;
  height: 90px;
  /* padding: 10px;
   */
  /* margin-top: -5px; */
}

#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  /* margin-bottom: 5px; */
}

.left {
  float: left;
}

#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  padding-right: 4px;
}
</style>
