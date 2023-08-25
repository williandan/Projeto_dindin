import api from "../services/api"

const configurarToken = (token) => {
  if (token) {
    api.defaults.headers.common["authorization"] = token;
  } else {
    delete api.defaults.headers.common["authorization"];
  }
};

export default configurarToken;