import { getConfig } from 'lib';
const invoicesConfig = (action) => getConfig({ module: 'Invoices', action });

const prefix = `/api/v1/admin/bills`;

export const getInvoicesConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  // config: invoicesConfig('View'),
});

export const getInvoiceConfig = (id) => ({
  url: `${prefix}/${id}`,
  // config: invoicesConfig('View'),
});
