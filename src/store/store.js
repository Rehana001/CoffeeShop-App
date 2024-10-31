// import { create } from 'zustand';
// import { produce } from 'immer';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CoffeeData from '../data/CoffeeData';
// import BeansData from '../data/BeansData';

// export const useStore = create(
//     persist(
//         (set, get) => ({
//             CoffeeList: CoffeeData,
//             BeansList: BeansData,
//             CartPrice: 0,
//             FavoriteList: [],
//             CartList: [],
//             OrderHistoryList: [],
//             addToCart: (cartItem) => set(produce(state => {
//                 let found = false;
//                 for (let i = 0; i < state.CartList.length; i++) {
//                     if (state.CartList[i].id == cartItem.id) {
//                         found = true;
//                         let size = false;
//                         for (let j = 0; j < state.CartList[i].prices.length; j++) {
//                             if (state.CartList[i].prices[j].size == cartItem.prices[0].size) {
//                                 size = true;
//                                 state.CartList[i].prices[j].quantity++;
//                                 break;
//                             }
//                         }
//                         if (size == false) {
//                             state.CartList[i].prices.push(cartItem.prices[0]);
//                         }
//                         state.CartList[i].prices.sort((a, b) => {
//                             if (a.size > b.size) {
//                                 return -1;
//                             }
//                             if (a.size < b.size) {
//                                 return 1;
//                             }
//                             return 0;
//                         })
//                         break;
//                     }
//                 }
//                 if (found == false) {
//                     state.CartList.push(cartItem);
//                 }
//             }),
//             ),
//             calculateCartPrice: () => set(produce(state => {
//                 let totalprice = 0;
//                 for (let i = 0; i < state.CartList.length; i++) {
//                     tempprice = 0;
//                     for (let j = 0; j < state.CartList[i].prices.length; j++) {
//                         tempprice = tempprice +
//                             parseFloat(state.CartList[i].prices[j].price) *
//                             state.CartList[i].prices[j].quantity;
//                     }
//                     state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
//                     totalprice = totalprice + tempprice
//                 }
//                 state.CartPrice = totalprice.toFixed(2).toString();
//             }),
//             ),
//             addToFavoriteList: (type, id) =>
//                 set(produce(state => {
//                     if (type == "Coffee") {
//                         for (let i = 0; i < state.CoffeeList.length; i++) {
//                             if (state.CoffeeList[i].id == id) {
//                                 if (state.CoffeeList[i].favourite == false) {
//                                     state.CoffeeList[i].favourite = true;
//                                     state.FavoriteList.unshift(state.CoffeeList[i]);
//                                 }
//                                 break;
//                             }
//                         }
//                     } else if (type == "Bean") {
//                         for (let i = 0; i < state.BeansList.length; i++) {
//                             if (state.BeansList[i].id == id) {
//                                 if (state.BeansList[i].favourite == false) {
//                                     state.BeansList[i].favourite = true;
//                                     state.BeansList.unshift(state.BeansList[i]);
//                                 }
//                                 break;
//                             }
//                         }
//                     }
//                 })),
//             deleteFromFavoriteList: (type, id) => {
//                 set(produce(state => {
//                     if (type == 'Coffee') {
//                         for (let i = 0; i < state.CoffeeList.length; i++) {
//                             if (state.CoffeeList[i].id == id) {
//                                 if (state.CoffeeList[i].favourite == true) {
//                                     state.CoffeeList[i].favourite = false;
//                                     state.FavoriteList.unshift(state.CoffeeList[i]);
//                                 }
//                                 break;
//                             }
//                         }
//                     } else if (type == 'Beans') {
//                         for (let i = 0; i < state.BeansList.length; i++) {
//                             if (state.BeansList[i].id == id) {
//                                 if (state.BeansList[i].favourite == true) {
//                                     state.BeansList[i].favourite = false;
//                                     state.FavoriteList.unshift(state.BeansList[i]);
//                                 }
//                                 break;
//                             }
//                         }
//                     }
//                     let spliceIndex = -1;
//                     for (let i = 0; i < state.FavoriteList.length; i++) {
//                         if (state.FavoriteList[i].id == id) {
//                             spliceIndex = i;
//                             break;
//                         }
//                     }
//                     state.FavoriteList.splice(spliceIndex, 1);
//                 }),
//                 )
//                 incrementCartItemQuantity: (id, size) => set(produce(
//                     state => {
//                         for (let i = 0; i < state.CartList.length; i++) {
//                             if (state.CartList[i].id == id) {
//                                 for (let j = 0; j < state.CartList[i].prices.length; j++) {
//                                     if (state.CartList[i].prices[j].size == size) {
//                                         state.CartList[i].prices[j].quantity++;
//                                         break;
//                                     }
//                                 }
//                             }
//                         }
//                     }))
//                 decrementCartItemQuantity: (id, size) => {
//                     set(produce(state => {
//                         for (let i = 0; i < state.CartList.length; i++) {
//                             if (state.CartList[i].id == id) {
//                                 for (let j = 0; j < state.CartList[i].prices.length; j++) {
//                                     if (state.CartList[i].prices[j].size == size) {
//                                         if (state.CartList[i].prices.length > 1) {
//                                             if (state.CartList[i].prices[j].quantity > 1) {
//                                                 state.CartList[i].prices[j].quantity--;
//                                             } else {
//                                                 state.CartList[i].prices.splice(j, 1);
//                                             }
//                                         } else {
//                                             if (state.CartList[i].prices[j].quantity > 1) {
//                                                 state.CartList[i].prices[j].quantity--;
//                                             } else {
//                                                 state.CartList.splice(i, 1);
//                                             }
//                                         }
//                                         break;
//                                     }
//                                 }
//                             }
//                         }
//                     })
//                     )
//                     addToOrderHistoryListFromCart: () => set(produce(state => {
//                         let temp = state.CartList.reduce((accumulator, currentValue) =>
//                             accumulator + parseFloat(currentValue.ItemPrice),
//                             0,
//                         );
//                         let CurrentCartListTotalPrice 
//                         if(state.OrderHistoryList.length > 0){
//                             state.OrderHistoryList.unshift({
//                                 orderDate: new Date().toDateString()+" "+new Date().toLocaleTimeString(),
//                                 CartList: state.CartList,
//                                 CartListPrice: temp.toFixed(2).toString(),
//                             })
//                         }else {
//                             state.OrderHistoryList.push({
//                                 orderDate: new Date().toDateString()+" "+new Date().toLocaleTimeString(),
//                                 CartList: state.CartList,
//                                 CartListPrice: temp.toFixed(2).toString(),
//                             })
//                         }
//                         state.CartList =[];
//                     }))
//                 }
//             }

            



//         }), {
//             name: 'coffee-app',
//         storage: createJSONStorage(() => AsyncStorage)
//     }
//     )
// )

import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],

      addToCart: (cartItem) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;
                let sizeExists = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === cartItem.prices[0].size) {
                    sizeExists = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (!sizeExists) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a, b) => (a.size > b.size ? -1 : 1));
                break;
              }
            }
            if (!found) {
              state.CartList.push(cartItem);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice += parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2);
              totalprice += tempprice;
            }
            state.CartPrice = totalprice.toFixed(2);
          }),
        ),

      addToFavoriteList: (type, id) =>
        set(
          produce(state => {
            if (type === 'Coffee') {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  state.CoffeeList[i].favourite = !state.CoffeeList[i].favourite;
                  if (state.CoffeeList[i].favourite) {
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  } else {
                    const index = state.FavoritesList.findIndex(item => item.id === id);
                    if (index !== -1) state.FavoritesList.splice(index, 1);
                  }
                  break;
                }
              }
            } else if (type === 'Bean') {
              for (let i = 0; i < state.BeanList.length; i++) {
                if (state.BeanList[i].id === id) {
                  state.BeanList[i].favourite = !state.BeanList[i].favourite;
                  if (state.BeanList[i].favourite) {
                    state.FavoritesList.unshift(state.BeanList[i]);
                  } else {
                    const index = state.FavoritesList.findIndex(item => item.id === id);
                    if (index !== -1) state.FavoritesList.splice(index, 1);
                  }
                  break;
                }
              }
            }
          }),
        ),

      incrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id, size) =>
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList[i].prices.splice(j, 1);
                      if (state.CartList[i].prices.length === 0) {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            const total = state.CartList.reduce((acc, item) => acc + parseFloat(item.ItemPrice), 0);
            state.OrderHistoryList.unshift({
              OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
              CartList: [...state.CartList],
              CartListPrice: total.toFixed(2),
            });
            state.CartList = [];
            state.CartPrice = '0.00';
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
