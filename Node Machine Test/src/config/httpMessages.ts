export default {
  LOGIN: {
    SUCCESS: "Login successfully.",
    INCORRECT_EMAIL_OR_PASS: "Incorrect email or password!"
  },
  REGISTER: {
    SUCCESS: "You have successfully registered.",
    INVALID_EMAIL: "",
    INVALID_PHONE:
      "Invalid phone number!, Please enter valid format (XXX)XXX-XXXX",
    SHORT_PASSWORD: "Password must be at least 8 characters!",
    PASSWORD_MISMATCH: "Confirm password does not match!",
    EMAIL_ALREADY_TAKEN: "Email already taken!"
  },
  REFRESH_TOKEN_SUCCESS: "Refresh token fetch successfully.",
  REFRESH_TOKEN_ERROR: "Invalid refresh token",
  USER: {
    AUTH: {
      UNAUTHORIZED: "Unauthorized",
      FORBIDDEN: "Forbidden",
      TOKEN: {
        NOT_FOUND: "Token not found",
      },
      SSO: {
        OUTSIDE_PRACTICE_GROUP: "You are not the part of Viapromed!",
        AUTH_FAILURE: "Unauthorized for SSO!",
        LOGIN_FAILURE: "SSO login failure!",
      }
    },
    SUCCESS: "Users retrieved successfully.",
    EMAIL_NOT_FOUND: "No users found with this email!",
    NOT_FOUND: "User not found!",
    PROFILE: {
      SUCCESS: "User profile retrieved successfully.",
      UPDATE_SUCCESS: "User profile updated successfully.",
      PASSWORD_DOES_NOT_MATCH: "passwords do not match!",
      PASSWORD_UPDATE_SUCCESS: "password updated successfully.",
      RESET_PASSWORD_SUCCESS: "Reset password successfully.",
      RESET_PASSWORD_FAILURE: "Password reset failed!",
      AGE_RANGE_FAILURE: "Age should be in range 25-60 !",
    },
    ADDRESS: {
      NOT_FOUND: "Address not found.",
      GET_ALL_SUCCESS: "Addresses retrieved successfully.",
      GET_SUCCESS: "Address retrieved successfully.",
      ADD_SUCCESS: "Address added successfully.",
      UPDATE_SUCCESS: "Address updated successfully.",
      DELETE_SUCCESS: "Address deleted successfully.",
    },
    PHOTO: {
      SUCCESS: "Photo uploaded successfully.",
    },
  },
  
  CATEGORY: {
    SUCCESS: "Get categories successfully.",
    NOT_FOUND: "Category not found!",
  },
  PRODUCT: {
    SUCCESS: "Get products successfully.",
    DETAILS: {
      SUCCESS: "Get product details successfully.",
    },
  },
  GEOLOCATION: {
    COUNTRY: {
      SUCCESS: "Get countries successfully."
    },
    STATE: {
      SUCCESS: "Get state successfully."
    },
    CITY: {
      SUCCESS: "Get cities successfully."
    },
  },
  
};
