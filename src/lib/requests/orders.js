// import { getConfig } from "lib";

// const ordersConfig = (action) => getConfig({ module: "Orders", action });

const prefix = `/api/v1/admin/orders`;
const otprefix = "/api/v1/admin/ordertemplates";

export const getOrdersConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: "",
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: [""],
  },
  // config: ordersConfig('View'),
});

export const createOrderConfig = () => ({
  url: `${prefix}`,
  // config: ordersConfig('Create'),
});

export const getOrderConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: ordersConfig('Create'),
});

export const getOrderTemplatesConfig = () => ({
  url: `${otprefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: "",
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: [""],
  },
  // config: ordersConfig('View'),
});

export const createOrderTemplateConfig = () => ({
  url: `${otprefix}`,
  // config: ordersConfig('Create'),
});

export const editOrderTemplateConfig = ({ id }) => ({
  url: `${otprefix}/${id}`,
  // config: ordersConfig('Update'),
});
