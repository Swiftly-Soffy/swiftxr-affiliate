import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // cache for 1 hour

export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.method !== "GET") {
      return next(); // only cache GET requests
    }

    const key = ctx.url;
    const cached = cache.get(key);

    if (cached) {
      ctx.body = cached;
      return;
    }

    await next();

    cache.set(key, ctx.body);
  };
};
