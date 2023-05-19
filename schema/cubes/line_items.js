cube(`line_items`, {
  sql_table: `public.line_items`,
  
  pre_aggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  
  joins: {
    products: {
      sql: `${CUBE}.product_id = ${products}.id`,
      relationship: `many_to_one`
    },
    
    orders: {
      sql: `${CUBE}.order_id = ${orders}.id`,
      relationship: `many_to_one`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    quantity: {
      sql: `quantity`,
      type: `sum`
    },
    
    price: {
      sql: `price`,
      type: `sum`
    }
  },
  
  dimensions: {
    product_id: {
      sql: `product_id`,
      type: `number`
    },
    
    order_id: {
      sql: `order_id`,
      type: `number`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    }
  }
});
