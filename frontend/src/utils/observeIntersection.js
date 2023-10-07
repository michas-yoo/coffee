export function observeIntersection(element, callback, once = false) {
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
