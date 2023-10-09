<script setup>
import { Modal } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { makeRequest } from "../api/apiClient.js";
import { displayError } from "../utils/displayError.js";
import { NETWORK_ERROR_TEXT } from "../constants.js";
import RegisterStepOne from "./RegisterStepOne.vue";
import RegisterStepTwo from "./RegisterStepTwo.vue";

const MAIN_STEP = "main";
const PROFILE_STEP = "profile";

const router = useRouter();

const registration = reactive({
  step: MAIN_STEP,
  mainInfo: {
    email: "",
    password: "",
  },
  profileInfo: {
    name: "",
    phone: "",
  },
});

const onStepOneFinished = (data) => {
  registration.step = PROFILE_STEP;
  registration.mainInfo = data;
};

const onComeBack = () => {
  registration.step = MAIN_STEP;
};

const onSuccess = () => {
  const modal = Modal.success({
    title: "Вы успешно зарегистрировались!",
    content: "Теперь можно авторизоваться",
    onOk: () => router.push({ name: "login" }),
  });

  setTimeout(() => {
    modal.destroy();
    router.push({ name: "login" });
  }, 2000);
};

const sendRegisterRequest = async (data) => {
  registration.profileInfo = data;

  try {
    const response = await makeRequest("register", {
      ...registration.mainInfo,
      ...registration.profileInfo,
    });
    onSuccess(response);
  } catch (message) {
    displayError(message);
    if (message === NETWORK_ERROR_TEXT) {
      return router.push({ name: "bad-request" });
    }
  }
};
</script>

<template>
  <transition class="transition-container" name="move" appear>
    <ALayout class="registration-container">
      <RegisterStepOne
        @finish="onStepOneFinished"
        :data="registration.mainInfo"
        v-if="registration.step === MAIN_STEP"
      />
      <RegisterStepTwo
        v-else
        @back="onComeBack"
        @finish="sendRegisterRequest"
        :data="registration.profileInfo"
      />
    </ALayout>
  </transition>
</template>

<style scoped>
.registration-container {
  max-width: 800px;
  margin: 0 auto 20px;
}

.transition-container {
  position: relative;
}
</style>
