cube(`orders`, {
  sql_table: `public.orders`,
  
  pre_aggregations: {

    main:{
      measures: [CUBE.one1, CUBE.one2],
      time_dimension: CUBE.created_at,
      granularity: `day`,
    }

  },
  
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
  
  measures: {
    count: {
      type: `count`
    },
    
    number: {
      sql: `number`,
      type: `sum`
    },
    
    DoesThisWork1:{
      sql: `id`,
      type: `number`,
      rolling_window: {
        trailing: `unbounded`,
      },
    },

    DoesThisWork2:{
      sql: `id`,
      type: `number`,
      rolling_window:{
        trailing: `1 month`,
      },
    },

    ThisShouldWork1:{
      sql: `id`,
      type: `count`,
      rolling_window:{
        trailing: `unbounded`,
      },
    },

    ThisShouldWork2:{
      sql: `id`,
      type: `count`,
      rolling_window:{
        trailing: `1 month`,
      },
    },

    Doh1:{
      sql: `${CUBE.one1} / ${CUBE.one2}`,
      type: `number`,
      rolling_window:{
        trailing: `unbounded`
      }
    },

    Doh2:{
      sql: `${CUBE.one1} / ${CUBE.one2}`,
      type: `number`,
      rolling_window:{
        trailing: `1 month`
      }
    },

    one1:{
      sql:`1`,
      type: `number`,
      rolling_window:{
        trailing: `unbounded`
      }
    },

    one2:{
      sql:`1`,
      type: `number`,
      rolling_window:{
        trailing: `unbounded`
      }
    }

  },
  
  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `number`
    },
    
    product_id: {
      sql: `product_id`,
      type: `number`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true,
      shown: true
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
  }
});
