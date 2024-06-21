interface IJwtHeader {
  sid: string;
  email: string;
  name: string;
  realm_access: {
    roles: string[];
  };
}
export default IJwtHeader;
// {
//     exp: 1718992011,
//     iat: 1718991711,
//     auth_time: 1718991711,
//     jti: 'f72e1481-8f19-458c-82ac-16ec45a49f28',
//     iss: 'http://localhost:8080/realms/simpleTodoList',
//     aud: 'account',
//     sub: 'ec659493-1bdc-40a4-8db6-0421284aeb36',
//     typ: 'Bearer',
//     azp: 'todolist-nextjs',
//     sid: 'ce0a1960-403c-4949-ba4b-b31613d69133',
//     acr: '1',
//     'allowed-origins': [ '*' ],
//     realm_access: {
//       roles: [
//         'offline_access',
//         'default-roles-simpletodolist',
//         'uma_authorization'
//       ]
//     },
//     resource_access: { account: { roles: [Array] } },
//     scope: 'openid profile email',
//     email_verified: false,
//     name: 'admin admin',
//     preferred_username: 'admin',
//     given_name: 'admin',
//     family_name: 'admin',
//     email: 'admin@admin'
//   }
