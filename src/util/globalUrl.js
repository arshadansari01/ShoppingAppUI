
var globalUrl = "http://localhost:9000/api";


const login = globalUrl + '/auth/login';

const createProduct = globalUrl + '/product/createProduct';

const signUp = globalUrl + '/user/signUp';
const getAllProducts = globalUrl + '/product/getAllProducts';

const updateProduct = globalUrl + '/product/updateProduct';
const deleteProduct = globalUrl+'/product/deleteProduct';
export { login, globalUrl, createProduct, signUp, getAllProducts, updateProduct,deleteProduct };