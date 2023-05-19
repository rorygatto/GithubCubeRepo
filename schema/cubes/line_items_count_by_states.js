cube(`line_items_count_by_states`, {
  sql_table: `public.line_items_count_by_states`,
  
  pre_aggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    line_items_count: {
      sql: `line_items_count`,
      type: `sum`
    }
  },
  
  dimensions: {
    users_state: {
      sql: `users_state`,
      type: `string`,
      primary_key: true
    }
  }
});
