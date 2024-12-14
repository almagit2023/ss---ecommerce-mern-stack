const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)

export const user = {
    LOGIN : `${BASE_URL}/user/login`,
    REGISTER : `${BASE_URL}/user/register` ,
    ALL : `${BASE_URL}/user/all` ,
    ADMIN_NOT : `${BASE_URL}/user/check-admin` ,
    GET_PROFILE : `${BASE_URL}/user/me` ,
    CHANGE_PROFILE_PICTURE : `${BASE_URL}/user/change-profile-pic` ,
    UPDATE_PROFILE : `${BASE_URL}/user/update-profile`
}

export const product = {
    ALL : `${BASE_URL}/product/all`,
    GET_SINGLE : `${BASE_URL}/product/getSingle` ,
    MENS_PRODUCT : `${BASE_URL}/product/mens-product` ,
    WOMENS_PRODUCT : `${BASE_URL}/product/womens-product` ,
    CHILDRENS_PRODUCT : `${BASE_URL}/product/childrens-product` ,
    FETCH_CART_ITEMS : `${BASE_URL}/product/cart`,
    ADD_REMOVE_TO_CART : `${BASE_URL}/product/add-remove`,
    CREATE_PRODUCT : `${BASE_URL}/product/create` ,
    DELETE_PRODUCT : `${BASE_URL}/product/delete` ,
    PURCHASES : `${BASE_URL}/product/all/purchases`,
}

export const purchasePaymentEndpoints = {
    CAPTURE_PAYMENT : `${BASE_URL}/payment/capture-payment` ,
    VERIFY_SIGNATURE : `${BASE_URL}/payment/verify-signature`
}