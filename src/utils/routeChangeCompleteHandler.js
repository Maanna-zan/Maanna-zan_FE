const routeChangeCompleteHandler = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(
      `__next_scroll_${router.asPath}`,
      JSON.stringify({
        x: window.pageXOffset,
        y: window.pageYOffset,
      }),
    );
  }
};
