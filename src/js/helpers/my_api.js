const NAME = 'localhost',
    PORT = 3000,
    DOMAIN = `http://${NAME}:${PORT}`,
    SITE = `${DOMAIN}`,
    API = `${SITE}/api`,
    PRODUCTS = `${API}/productos`,
    PRODUCT = `${API}/productos/producto`,
    PRODUCTBYORDER = `${API}/productos/orden`,
    CLIENTS = `${API}/clientes`,
    CLIENTBYRUT = `${API}/clientes/rut`,
    ORDERS = `${API}/ordenes`,
    ORDERSBYRUT = `${API}/ordenes/rut`,
    ADDRRESSBYRUT = `${API}/direcciones/rut`,
    DISPATCHBYORDER = `${API}/despachos/orden`,
    SENDORDER = `${API}/compra/orden`,
    LOGIN = `${SITE}/login`,
    CLIENT = `${API}/usuario/cliente`
    
export default { DOMAIN, 
    SITE,
    API, 
    PRODUCT, 
    PRODUCTS, 
    PRODUCTBYORDER,
    CLIENTS, 
    CLIENTBYRUT, 
    ORDERS, 
    ORDERSBYRUT, 
    ADDRRESSBYRUT, 
    DISPATCHBYORDER,
    SENDORDER,
    LOGIN,
    CLIENT,
}