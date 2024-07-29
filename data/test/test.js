async get(query) {
  // 1
  query = queryPreparationMultiple(query);
  // 2
  const where = queryPreparationPrice(query);
  // 3 - get selection
  const list = await Product
      .find(query)
      .sort({ _id: -1 })
      .$where(where)
      .skip(query.skip)
      .limit(query.limit);
  // 4 - get length of collection
  // const collectionLlength = await Product.countDocuments({});

  // 5 - get length of selection
  const sampleLength = await Product
      .find(query)
      .$where(where)
      .count();
  // 6 - aggregation
  const all = await Product.find()
  const listAggregated = list.map(product => {
      const isDerivative = !product.isBasic;
      const without = !product.articleOfBasicProduct;
      if (without && isDerivative) product.basicProduct = { withoutBasicProduct: true, msg: 'without article of basic product' };
      if (isDerivative && !without) product.basicProduct = all.find(p => p.article == product.articleOfBasicProduct);
      // -------------------------
      const isArray = Array.isArray(product.relatedColors);
      if (isArray) product.relatedColors.forEach((colorGroup, i) => {
          try {
              colorGroup.products.forEach((relatedProduct, ii) => {
                  const isWidthID = relatedProduct?.id;
                  if (isWidthID) {
                      const findedProduct = all.find(p => p._id == relatedProduct.id);
                      if (findedProduct) product.relatedColors[i].products[ii].product = findedProduct
                      else product.relatedColors[i].products[ii].msg = 'no finded';
                  }
              })
          } catch (error) { log(error) };
      });
      return product
  })
  // 7
  return { ok: true, list: listAggregated, sampleLength };
}



const queryPreparationPrice = (query) => `
    ${!!query.minPrice} && ${!!query.maxPrice}
        ? this.isDiscount
            ? this.payment.find(p => p.currency == 'UAH').priceDiscount > ${query.minPrice} && this.payment.find(p => p.currency == 'UAH').priceDiscount < ${query.maxPrice} 
            : this.payment.find(p => p.currency == 'UAH').price > ${query.minPrice} && this.payment.find(p => p.currency == 'UAH').price < ${query.maxPrice} 
        : true                    
    `;


    const queryPreparationMultiple = (query) => {
      // log('QUERY BEFORE TRANSFORMATION', { query });
      try {
          let multiple = [];
          multiple = query.multiple ? JSON.parse(query.multiple) : [];
          multiple.forEach(item => query[item.key] = { $in: item.value });
          let multipleOr = [];
          multipleOr = query.multipleOr ? JSON.parse(query.multipleOr) : [];
          if (multipleOr.length > 0) {
              query.$or = [];
              multipleOr.forEach(item => query.$or.push({ [item.key]: item.value[0] }));
          };
      } catch (error) {
          log('Error in product.service: Can not parse multiple json ');
          log(error);
      };
      // log('QUERY AFTER TRANSFORMATION', { query });
      return query
  };