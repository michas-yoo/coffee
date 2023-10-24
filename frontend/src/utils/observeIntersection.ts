type Callback = () => void;

/**
 * @function
 * @description Добавляет IntersectionObserver на элемент
 * @param element - На какой элемент нужно добавить обзервер
 * @param callback - Что нужно сделать, когда элемент войдет в зону видимости
 * @param once - Должен ли сработать коллбек только один раз
 */
export function observeIntersection(element: HTMLElement, callback: Callback, once = false) {
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      callback?.();

      if (once) {
        observer.unobserve(element);
      }
    }
  });

  observer.observe(element);
}
