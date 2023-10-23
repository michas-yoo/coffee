<script lang="ts" setup>
import { reactive } from "vue";
import { LockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { MainInfo } from "../interfaces";

type RegisterStepOneProps = {
  data: MainInfo
};

const { data } = defineProps<RegisterStepOneProps>();

const formState = reactive(data);

const emit = defineEmits(["finish"]);

const submitForm = (data: MainInfo) => {
  emit("finish", data);
};
</script>

<template>
  <ASpace direction="vertical">
    <ALayoutHeader class="tal mb30">
      <ATypographyTitle>Создать аккаунт 👩‍💻</ATypographyTitle>
      <ATypographyText>Зарегистрируйтесь, чтобы войти в мир вкусного кофе</ATypographyText>
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
          Уже есть аккаунт?
          <RouterLink :to="{ name: 'login' }">Войти</RouterLink>
        </ATypographyText>
      </AFormItem>

      <AFormItem>
        <AButton
          size="large" block
          type="primary" html-type="submit"
        >
          Продолжить
        </AButton>
      </AFormItem>
    </AForm>
  </ASpace>
</template>

<style scoped>

</style>
