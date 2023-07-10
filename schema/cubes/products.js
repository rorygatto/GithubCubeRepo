cube(`products`, {
  sql_table: `public.products`,
  pre_aggregations: {
    main: {
      measures: [products.CoalesceNullif],
      dimensions: [products.supplier_id],
      timeDimension: products.created_at,
      granularity: `day`
    }
  } // Pre-Aggregations definitions go here
  // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
  ,

  joins: {
    suppliers: {
      sql: `${CUBE}.supplier_id = ${suppliers}.id
      AND
      (${CUBE.supplier_id2} = ${suppliers.id2}
      OR
      ${CUBE.supplier_id3} = ${suppliers.id3})`,
      relationship: `many_to_one`
    },
    product_categories: {
      sql: `${CUBE}.product_category_id = ${product_categories}.id`,
      relationship: `many_to_one`
    }
  },
  measures: {
    CoalesceNullif: {
      sql: `COALESCE(${supplier_id} * 1.0 / NULLIF(${supplier_id},0),0)`,
      type: `number`
    },
    count: {
      type: `count`
    }
  },
  dimensions: {
    supplier_id: {
      sql: `supplier_id`,
      type: `number`
    },
    supplier_id2: {
      sql: `supplier_id`,
      type: `number`
    },
    supplier_id3: {
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