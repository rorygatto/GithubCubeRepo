cube(`products`, {
  sql_table: `public.products`,
  
  pre_aggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  },
  
  joins: {
    suppliers: {
      sql: `${CUBE}.supplier_id = ${suppliers}.id`,
      relationship: `many_to_one`
    },
    
    product_categories: {
      sql: `${CUBE}.product_category_id = ${product_categories}.id`,
      relationship: `many_to_one`
    }
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  dimensions: {
    supplier_id: {
      sql: `supplier_id`,
      type: `number`
    },
    
    product_category_id: {
      sql: `product_category_id`,
      type: `number`
    },
    
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
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
  }
});
