export const saveUser = (name) => {
  localStorage.setItem("user_name", name);
};

export const getUser = () => {
  return localStorage.getItem("user_name");
};

export const setHasVoted = () => {
  localStorage.setItem("hasVoted", "true");
};

export const userHasVoted = () => {
  return localStorage.getItem("hasVoted") === "true";
};
