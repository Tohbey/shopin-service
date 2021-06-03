const MSG_TYPES = Object.freeze({
    ACCOUNT_CREATED: "Account Successfully Created.",
    LOGGED_IN: "Successfully logged in",
    DELETED: "Resource Deleted Successfully",
    UPDATED: "Resource Updated Successfully",
    CREATED: "Resource Created Successfully",
    FETCHED: "Resource Fetched Successfully",
    EXIST: "Resource Exist Successfully",
    ACCOUNT_VERIFIED: "Account Successfully Verified",
    ORDER_POSTED: "Order Successfully Posted",
    ACCOUNT_EXIST: "Account already exist.",
    PRODUCT_EXIST: "Product already exist.",
    BRAND_EXIST: "Brand already exist.",
    ACCOUNT_INVALID: "Invalid email or password",
    SUSPENDED: "Account is suspended!",
    INACTIVE: "Account is inactive!",
    DISABLED: "Account is disabled!",
    NOT_FOUND: "Not Found",
    SERVER_ERROR: "Server Error!",
    INVALID_PASSWORD: "Invalid Password",
    RATING_DONE: "Rating submitted successfully.",
    PERMISSION: "You don't have enough permission to perform this action",
    RATING_EXIST: "Rating exists.",
    RATING_RETRIEVED: "Rating retrieved successfully.",
    NOT_ALLOWED: "Operation not allowed",
    ACCESS_DENIED: "Access denied.",
    SESSION_EXPIRED: "Access denied. Your session has expired",
});
  
  
const USER_STATUS = {
    ACTIVE: "active",
    SUSPENDED: "suspended"
}
  
module.exports = {
    MSG_TYPES,
    USER_STATUS
};
  