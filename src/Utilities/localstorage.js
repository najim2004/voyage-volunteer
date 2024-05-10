const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    return JSON.parse(theme);
  } else {
    return false;
  }
};

const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
};

export { getTheme, setTheme };
