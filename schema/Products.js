cube(`Products`, {
  sql: `SELECT * FROM public.products`,
  preAggregations: {// test:{
    //   measures: (CUBE) => [CUBE.count],
    //   dimensions: (CUBE) => [CUBE.id],
    //   timeDimension: (CUBE) => CUBE.created_at,
    //   granularity: `year`,
    // }

    // products: {
    //   measures: [Products.count],
    //   dimensions: [Products.id],
    //   timeDimension: Products.createdAt,
    //   granularity: `year`
    // }
  },
  joins: {
    Suppliers: {
      sql: `${CUBE}.supplier_id = ${Suppliers}.id`,
      relationship: `belongsTo`
    },
    ProductCategories: {
      sql: `${CUBE}.product_category_id = ${ProductCategories}.id`,
      relationship: `belongsTo`
    }
  },
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, createdAt]
    }
  },
  dimensions: {
    supplierId: {
      sql: `supplier_id`,
      type: `number`
    },
    productCategoryId: {
      sql: `product_category_id`,
      type: `number`
    },
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true,
      shown: true
    },
    name: {
      sql: `name`,
      type: `string`
    },
    description: {
      sql: `description`,
      type: `string`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    tomato:{
      sql: `1+1`,
      type:`number`

    }
  }
});