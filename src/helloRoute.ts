import Hapi from "@hapi/hapi";

const helloRoute: Hapi.ServerRoute<Hapi.ServerApplicationState> = {
  method: "GET",
  path: "/hello",
  handler: async (request, h) => {
    return "Hello from hapi";
  },
};

export default helloRoute;
