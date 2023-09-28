import jwt from 'jsonwebtoken';

export function checkAdminRole(token) {
  const decodedToken = jwt.decode(token);
  return decodedToken && decodedToken.roles.includes('admin');
}
