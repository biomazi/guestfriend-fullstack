/*
  Util storage functions that are used to save and retrieve
  redux store state to and from local storage
*/

export const loadState = () => {
  try {
    const storeState = window.localStorage.getItem('state');
    return storeState ? JSON.parse(storeState) : undefined;
  } catch (error) {
    return undefined;
  }
};

export const saveState = value => {
  try {
    window.localStorage.setItem('state', JSON.stringify(value));
  } catch (error) {
    // ignore write errors
  }
};
