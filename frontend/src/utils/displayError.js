import { notification } from "ant-design-vue";

export const displayError = (data) => {
  if (Array.isArray(data)) {
    data.forEach((error) => notification.error({ message: error }));
    return;
  }

  if (typeof data === "string") {
    notification.error({ message: data });
    return;
  }

  notification.error({ message: data.message });
};
