cube(`Users`, {
  sql: `SELECT * FROM public.users`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    users1: {
      dimensions: [CUBE.id, CUBE.firstName]
    },
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, city, firstName, lastName, createdAt]
    }
  },
  
  dimensions: {
    age: {
      sql: `age`,
      type: `number`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    
    city: {
      sql: `city`,
      type: `string`
    },
    
    company: {
      sql: `company`,
      type: `string`
    },
    
    gender: {
      sql: `gender`,
      type: `string`
    },
    
    firstName: {
      sql: `first_name`,
      type: `string`
    },
    
    lastName: {
      sql: `last_name`,
      type: `string`
    },
    
    state: {
      sql: `state`,
      type: `string`
    },
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    },

    two: {
      sql: `1+1`,
      type: `number`
    }
  }
});
