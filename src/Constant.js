export const EmailRegExp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";

export const PhoneNumberRegExp = "^[+]?[\\d]+[ -\\d]*[\\d]$";

export const ValidTextRegExp = "^[^;%<>\\$'\"]*$";

export const lngs = {
  en: { nativeName: "English", code: "en" },
  sv: { nativeName: "Svenska", code: "sv" },
};

export const roles = {
  user: "user",
  admin: "admin",
};

export const users = [
  {
    username: "admin",
    password: "admin",
    role: roles.admin,
  },
  {
    username: "user",
    password: "user",
    role: roles.user,
  },
];
