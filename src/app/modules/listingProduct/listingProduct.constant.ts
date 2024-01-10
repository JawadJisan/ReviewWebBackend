export const listingProductRelationalFields: string[] = ['serviceId'];

export type IListingProductFilters = {
  searchTerm?: string;
  categoryId?: string;
};
export const listingProductSearchableFields = ['serviceName'];

export const listingProductRelationalFieldsMapper: { [key: string]: string } = {
  serviceId: 'service',
};
