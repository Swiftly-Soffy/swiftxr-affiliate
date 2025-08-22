import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); 

export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.method !== "GET") {
      return next();
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
