cube(`LineItemsCountByStates`, {
  sql: `SELECT * FROM public.line_items_count_by_states`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    
    lineItemsCount: {
      sql: `line_items_count`,
      type: `sum`
    }
  },
  
  dimensions: {
    usersState: {
      sql: `users_state`,
      type: `string`,
      primaryKey: true
    }
  }
});
