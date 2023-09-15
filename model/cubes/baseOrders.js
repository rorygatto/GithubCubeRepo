cube(`baseOrders`, {
  sql_table: `public.orders`,
  
  joins: {},
  
  dimensions: {
    
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
  },
  
  measures: {

    count: {
      type: `count`
    },

  },
  
  pre_aggregations: {}
});