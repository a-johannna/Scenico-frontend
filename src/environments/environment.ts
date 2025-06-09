export const environment = {
  production: false,
  url: 'http://127.0.0.1:9191/api/v1/users', //Mediante esta url se conecta con el backend
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  }
}
