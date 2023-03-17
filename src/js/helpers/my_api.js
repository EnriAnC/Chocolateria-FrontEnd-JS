const NAME = 'chocolateria-backend-node-production.up.railway.app',
    DOMAIN = `https://${NAME}`,
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
<<<<<<< HEAD
    ADDPRODUCT,
    REGISTER
}
=======
    ADDPRODUCT
}
>>>>>>> 78ae454d0cb4904289d0b949c8e80c1b2116e866
