(function(window) {
  const groupByYear = items => items.reduce((r, v) => {
    const groupItem = r[v.year];
    if (groupItem) {
        groupItem.count++;
        groupItem.amount += v.amount;
    } else {
        r[v.year] = {count: 1, amount: v.amount};
    }
    return r;
  }, {});
  
  window.dividend = {
    groupByYear
  };
})(window);
