cube(`products`, {
  sql_table: `public.products`,
  
  joins: {
    product_categories: {
      sql: `${CUBE}.product_category_id = ${product_categories}.id`,
      relationship: `many_to_one`
    },
    
    suppliers: {
      sql: `${CUBE}.supplier_id = ${suppliers}.id`,
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
    
    product_category_id: {
      sql: `product_category_id`,
      type: `string`
    },
    
    supplier_id: {
      sql: `supplier_id`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    description: {
      sql: `description`,
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
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
