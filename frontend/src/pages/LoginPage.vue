<script setup>
import { appStore } from "../store.js";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { displayError } from "../utils/displayError.js";
import { NETWORK_ERROR_TEXT } from "../constants.js";
import { onMounted, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

const router = useRouter();

const formState = reactive({
  email: "",
  password: "",
  remember: true,
});

const onSuccess = (data) => {
  appStore.username = data.username;
  appStore.accessToken = data.accessToken;
  router.push({ name: "main" });
};

const submitForm = async (data) => {
  try {
    const response = await makeRequest("login", data);
    onSuccess(response);
  } catch (message) {
    displayError(message);

    if (message === NETWORK_ERROR_TEXT) {
      return router.push({ name: "bad-request" });
    }
  }
};

onMounted(() => {
  if (appStore.accessToken) {
    return router.push({ name: "main" });
  }
});
</script>

<template>
  <transition class="login-container" name="move" appear tag="div">
    <div>
      <ALayout>
        <ALayoutHeader class="tal mb30">
          <ATypographyTitle>Добро пожаловать 👋</ATypographyTitle>
          <ATypographyText>Введите почту и пароль, чтобы войти</ATypographyText>
        </ALayoutHeader>

        <AForm
          name="sign-up"
          layout="vertical"
          :model="formState"
          :label-col="{span: 8}"
          @finish="submitForm"
        >
          <AFormItem
            label="Email" name="email"
            :rules="[
              { required: true, message: 'Пожалуйста, введите email' },
              { type: 'email', message: 'Пожалуйста, введите настоящий email' },
            ]"
          >
            <AInput
              placeholder="Email"
              v-model:value="formState.email"
            >
              <template #prefix>
                <UserOutlined />
              </template>
            </AInput>
          </AFormItem>
          <AFormItem
            label="Пароль" name="password"
            :rules="[{required: true, message: 'Пожалуйста, введите пароль'}]"
          >
            <AInputPassword
              placeholder="Пароль"
              v-model:value="formState.password"
            >
              <template #prefix>
                <LockOutlined />
              </template>
            </AInputPassword>
          </AFormItem>
          <AFormItem name="remember" class="tal">
            <ACheckbox v-model:checked="formState.remember">
              Запомнить меня
            </ACheckbox>
          </AFormItem>

          <ADivider />

          <AFormItem class="mb30">
            <ATypographyText>
              Нет аккаунта?
              <RouterLink :to="{ name: 'register' }">Зарегистрироваться</RouterLink>
            </ATypographyText>
          </AFormItem>

          <AFormItem>
            <AButton
              size="large" block
              type="primary" html-type="submit"
            >
              Войти
            </AButton>
          </AFormItem>
        </AForm>
      </ALayout>
    </div>
  </transition>
</template>

<style scoped>
.login-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}
</style>