/* Author: ahmadsisfo1@gmail.com */

export default (Menu, order=false) => {
  Menu.forEach((item, index) => {
    if (!('visible' in item)) {
      Menu[index].visible = true;
    }
    if (item.items) {
      item.items.forEach((item2, index2)=>{
        if (!('visible' in item2)) {
            Menu[index].items[index2].visible = true;
        }
      })   
      if(order){
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    }
  });
  return Menu;
}
