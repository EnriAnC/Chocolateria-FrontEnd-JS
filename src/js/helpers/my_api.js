// const NAME = 'chocolateria-backend-node-production.up.railway.app',
//     DOMAIN = `https://${NAME}`,
const NAME = 'localhost',
    PORT = 3000,
    DOMAIN = `http://${NAME}:${PORT}`,
    SITE = `${DOMAIN}`,
    API = `${SITE}/api`,

    PRODUCTS = `${API}/products`,
    PRODUCT = `${API}/products/product`,
    ADDPRODUCT = `${API}/product`,
    PRODUCTBYORDER = `${API}/products/order`,

    CLIENT = `${API}/client`,
    CLIENTS = `${API}/clients`,
    CLIENTBYRUT = `${API}/client/rut`,
    ALLORDERSBYRUT = `${API}/client/orders`,

    ORDER = `${API}/order`,
    ORDERS = `${API}/orders`,
    ORDERSBYRUT = `${API}/orders/rut`,

    ADDRRESSBYRUT = `${API}/address/rut`,

    DISPATCHBYORDER = `${API}/dispatch/order`,

    SENDORDER = `${API}/send/order`,
    
    USER = `${API}/user`,

    LOGIN = `${SITE}/login`,
    REGISTER = `${SITE}/register`;
    
    
    
export default { DOMAIN, 
    SITE,
    API, 
    PRODUCT, 
    PRODUCTS, 
    PRODUCTBYORDER,
    CLIENTS, 
    CLIENTBYRUT, 
    ORDER,
    ORDERS, 
    ORDERSBYRUT, 
    ADDRRESSBYRUT, 
    DISPATCHBYORDER,
    SENDORDER,
    LOGIN,
    CLIENT,
    ALLORDERSBYRUT,
    USER,
    ADDPRODUCT,
    REGISTER
}