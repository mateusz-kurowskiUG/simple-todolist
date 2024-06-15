import axios from "axios";
import config from "../keycloak.json";

const { realm } = config;
const username = process.env.KC_ADMIN_USER || "";
const password = process.env.KC_ADMIN_PASS || "";
const clientId = config.resource;
const grant_type = "client_credentials";
const tokenUrl = `http://keycloak:8080/realms/${realm}/protocol/openid-connect/token`;
const client_secret = config.credentials.secret;
const getToken = async () =>
  axios
    .get(tokenUrl, {
      params: {
        client_id: clientId,
        client_secret,
        grant_type,
      },
    })
    .then((res) => res.data)
    .catch((e) => {
      console.log(e);
      throw e;
    });

const KeycloakF = { getToken };
export default KeycloakF;
