import Cookies from "js-cookie";

// Save tokens
export const setTokens = (accessToken: string) => {
  Cookies.set("accessToken", accessToken, {
    secure: true,
    sameSite: "strict",
    expires: 1,
  });
};


// Get tokens and expiration
export const getAccessToken = () => Cookies.get("accessToken");

// Clear tokens
export const clearTokens = () => {
  Cookies.remove("accessToken");
};
