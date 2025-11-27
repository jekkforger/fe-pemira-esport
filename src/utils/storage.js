export const saveUser = (name) => {
  localStorage.setItem("pemira_user", name);
};

export const getUser = () => {
  return localStorage.getItem("pemira_user");
};

export const setHasVoted = () => {
  localStorage.setItem("hasVoted", "true");
};

export const userHasVoted = () => {
  return localStorage.getItem("hasVoted") === "true";
};
