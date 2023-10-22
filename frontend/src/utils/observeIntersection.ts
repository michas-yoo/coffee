type Callback = () => void;

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
