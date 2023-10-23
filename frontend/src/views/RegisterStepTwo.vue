<script lang="ts" setup>
import { reactive } from "vue";
import { ProfileInfo } from "../interfaces";
import { ArrowLeftOutlined } from "@ant-design/icons-vue";

type RegisterStepTwoProps = {
  data: ProfileInfo
};

const { data } = defineProps<RegisterStepTwoProps>();

const formState = reactive(data);

const emit = defineEmits(["finish", "back"]);

const submitForm = (data: ProfileInfo) => {
  emit("finish", data);
};
</script>

<template>
  <ASpace direction="vertical">
    <ALayoutHeader class="tal mb30">
      <AButton
        size="large" @click="$emit('back')"
      >
        <ArrowLeftOutlined />
      </AButton>
      <ATypographyTitle>Заполните профиль 👤</ATypographyTitle>
      <ATypographyText>Расскажите немного о себе!</ATypographyText>
    </ALayoutHeader>

    <AForm
      name="profile"
      layout="vertical"
      :model="formState"
      :label-col="{span: 8}"
      @finish="submitForm"
    >
      <AFormItem
        label="Имя" name="name"
        :rules="[
        { required: true, message: 'Пожалуйста, введите ваше имя' },
      ]"
      >
        <AInput placeholder="Имя" v-model:value="formState.name" />
      </AFormItem>

      <AFormItem
        label="Номер телефона" name="phone"
        :rules="[{ required: true, message: 'Пожалуйста, введите ваш номер телефона' }]"
      >
        <AInput placeholder="+7 (999) 999-99-99" v-model:value="formState.phone" />
      </AFormItem>

      <ADivider />

      <AFormItem>
        <AButton
          size="large" block
          type="primary" html-type="submit"
        >
          Зарегистрироваться
        </AButton>
      </AFormItem>
    </AForm>
  </ASpace>
</template>

<style scoped>
h1 {
  margin-top: 0;
}

header {
  margin-bottom: 0 !important;
}
</style>
