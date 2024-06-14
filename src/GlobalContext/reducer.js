export const loginreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, person: action.person };

    case "LOGOUT":
      return { ...state, person: undefined };

    default:
      return state;
  }
};
