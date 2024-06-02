// checkValidData
export const checkLoginData = (email, password) => {
  // REGEX STANDS FOR REGULAR EXPRESSION
  // const regex = /pattern/;
  // Why Slashes?
  // Delimitation: The slashes clearly define the boundaries of the regular expression.
  // Simplicity: This notation is concise and easier to read for simple patterns.

  const isEmailValid = /^([a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

export const checkSignUpData = (email, password, name) => {
  if (!name) {
    return "Please fill your name";
  }

  const isEmailValid = /^([a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
