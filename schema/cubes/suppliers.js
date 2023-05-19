cube(`suppliers`, {
  sql_table: `public.suppliers`,
  
  pre_aggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    email: {
      sql: `email`,
      type: `string`
    },
    
    company: {
      sql: `company`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    }
  }
});
