<script lang="ts" setup>
import { appStore } from "../store.ts";
import { useRouter } from "vue-router";
import { ApiClient } from "../api/apiClient.ts";
import { handleError } from "../utils/handleError.ts";
import { onMounted, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ILoginResponse } from "../interfaces";
import { ILoginPayload } from "../api/types";

const router = useRouter();

const formState = reactive<ILoginPayload>({
  email: "",
  password: "",
});

const onSuccess = (data: ILoginResponse) => {
  appStore.username = data.username;
  appStore.accessToken = data.accessToken;
  router.push({ name: "main" });
};

const submitForm = async (data: ILoginPayload) => {
  try {
    const response: ILoginResponse = await ApiClient.login(data);
    onSuccess(response);
  } catch (e: any) {
    handleError(e);
  }
};

onMounted(() => {
  if (appStore.accessToken) {
    return router.push({ name: "main" });
  }
});
</script>

<template>
  <transition name="slide" appear>
    <div class="login-container">
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
