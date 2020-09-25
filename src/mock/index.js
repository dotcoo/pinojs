import { Request, Response, Server } from './Server';
import XMLHttpRequest from './XMLHttpRequest';
import fetch from './fetch';

export default function mock(pino) {
  // ====== register ======

  pino.Request = Request;
  pino.Response = Response;
  pino.Server = Server;
  pino.XMLHttpRequest = XMLHttpRequest;
  pino.fetch = fetch;

  // ====== Server ======

  pino.server = new pino.Server(window.location.host);
  pino.addRequestMiddleware = pino.server.addRequestMiddleware.bind(pino.server);
  pino.addResponseMiddleware = pino.server.addResponseMiddleware.bind(pino.server);
  pino.request = pino.server.request.bind(pino.server);
  pino.get = pino.server.get.bind(pino.server);
  pino.post = pino.server.post.bind(pino.server);
  pino.put = pino.server.put.bind(pino.server);
  pino.delete = pino.server.delete.bind(pino.server);

  pino.servers = [pino.server];

  pino.addServer = function(server) {
    this.servers.push(server);
  };

  pino.route = function(req) {
    for (const server of this.servers) {
      if (server.isHost(req.uri.host) && server.route(req)) {
        return true;
      }
    }
    return false;
  }

  pino.handle = async function(req) {
    for (const server of this.servers) {
      if (server.isHost(req.uri.host) && await server.handle(req)) {
        return true;
      }
    }
    return false;
  };

  // ====== XMLHttpRequest ======

  pino.XMLHttpRequest.route = pino.route.bind(pino);
  pino.XMLHttpRequest.handle = pino.handle.bind(pino);

  // ====== fetch ======

  pino.fetch.route = pino.route.bind(pino);
  pino.fetch.handle = pino.handle.bind(pino);

  // ====== intercept ======

  pino.intercept = function() {
    window.XMLHttpRequest = pino.XMLHttpRequest;
    window.fetch = pino.fetch;
  };

  pino.unintercept = function() {
    window.XMLHttpRequest = window.XMLHttpRequestReal;
    window.fetch = window.fetchReal;
  };

  // ====== now ======
  pino.intercept();
};
