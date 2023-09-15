cube(`baseOrdersExt`, {
  sql_table: `public.products`,
  extends: baseOrders,
  
  joins: {},
  
  dimensions: {},
  
  measures: {},
  
  pre_aggregations: {}
});