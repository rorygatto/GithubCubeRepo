cube(`line_items`, {
  sql_table: `public.line_items`,
  
  joins: {
    orders: {
      sql: `${CUBE}.order_id = ${orders}.id`,
      relationship: `many_to_one`
    },
    
    products: {
      sql: `${CUBE}.product_id = ${products}.id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    order_id: {
      sql: `order_id`,
      type: `string`
    },
    
    product_id: {
      sql: `product_id`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    price: {
      sql: `price`,
      type: `sum`
    },
    
    quantity: {
      sql: `quantity`,
      type: `sum`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
