import { notification } from "ant-design-vue";

export const displayError = (data) => {
  if (Array.isArray(data)) {
    data.forEach((error) => notification.error({ message: error }));
    return;
  }

  notification.error({ message: data.message });
};
