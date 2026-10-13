// Shared handle to the page's Lenis instance (created in SmoothScrolling) so components can
// scroll to elements or pause scrolling, e.g. while the contact popup is open.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const getLenis = () => lenis;
