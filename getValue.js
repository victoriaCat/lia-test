async function getValue(cell){
  let signsRegExp = /[^a-zA-Z0-9]+/g;
  let transformedCell = cell.replace(signsRegExp, '').toUpperCase();
  if(/[0-9]/.test(transformedCell[0])){
    transformedCell = transformedCell.replace(/([0-9]+)([A-Z]+)/,'$2$1');
  }
  try {
    let resource = "https://spreadsheets.google.com/feeds/cells/1SFg_58p3gNyH9KZGWci8TvZ6Q7_tTL3gt20ko0c9wIk/od6/public/basic?alt=json";
    let response = await fetch(resource);
    let data = await response.json();
    console.log(data.feed.entry.find(el => {return el.title.$t == transformedCell;}).content.$t);
  } catch(error) {
    console.log("This cell is empty or doesn't exist");
  }
}
getValue('B12');