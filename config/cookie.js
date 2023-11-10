const date = new Date();
date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

export const COOKIE_PROPS = {
  path: "/",
  // httpOnly: true,
  secure: true,
  expires: date,
  sameSite: "strict",
};

export const DELETE_COOKIE_PROPS = {
  path: "/",
  expires: new Date(0),
};
