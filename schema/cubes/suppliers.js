cube(`suppliers`, {
  sql_table: `public.suppliers`,

    refresh_key: {
    every: `1 hour`,
  },
  
  pre_aggregations: {},
  
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
      primary_key: true,
      shown: true
    },
    
    address: {
      sql: `address`,
      type: `string`,
      //sql: `email`
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
