import { retrieveLaunchParams } from "@tma.js/sdk";

const apiHost = `https://${import.meta.env.VITE_API_DOMAIN}`;
const defaultHeaders = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
  Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
};

const sendInitData = async () => {
  try {
    const params = retrieveLaunchParams();
    return await fetch(`${apiHost}/user`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(params),
    });
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

const getCurrentUserRoute = async () => {
  try {
    return await fetch(`${apiHost}/user/routes/current`, {
      method: "GET",
      headers: defaultHeaders,
    });
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

const getUserBalance = async () => {
  try {
    return await fetch(`${apiHost}/user/balance`, {
      method: "GET",
      headers: defaultHeaders,
    });
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

const getRouteDetails = async (routeId: number) => {
  try {
    return await fetch(`${apiHost}/routes/${routeId}`, {
      method: "GET",
      headers: defaultHeaders,
    });
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

const getRoutesList = async () => {
  try {
    return await fetch(`${apiHost}/routes/list`, {
      method: "GET",
      headers: defaultHeaders,
    });
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

export {
  sendInitData,
  getCurrentUserRoute,
  getUserBalance,
  getRouteDetails,
  getRoutesList,
};
