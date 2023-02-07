cube(`Suppliers`, {
  sql: `SELECT * FROM public.suppliers`,
  
  preAggregations: {
    products: {
      measures: [Products.count],
      dimensions: [Products.id, Products.tomato],
      timeDimension: Products.createdAt,
      granularity: `year`
    }
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
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
    
    createdAt: {
      sql: `created_at`,
      type: `time`
    }
  }
});
