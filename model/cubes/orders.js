cube(`orders`, {
  sql_table: `public.orders`,
  
  joins: {
    users: {
      sql: `${CUBE}.user_id = ${users}.id`,
      relationship: `many_to_one`
    },
    
    products: {
      sql: `${CUBE}.product_id = ${products}.id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {

    ten:{
      sql:`10`,
      type:`number`
    },

    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    product_id: {
      sql: `product_id`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    completed_at: {
      sql: `completed_at`,
      type: `time`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    number: {
      sql: `number`,
      type: `sum`
    }
  },
  
  pre_aggregations: {

        cronTest: {
      measures: [CUBE.count],
      dimensions: [CUBE.product_id, CUBE.status, CUBE.user_id],
      timeDimension: CUBE.created_at,
      granularity: `day`,
      partitionGranularity: `month`,
      refreshKey: {
        every: "30 5 * * 5",
        timezone: "America/Los_Angeles",
      },
    },

  
  }
});
