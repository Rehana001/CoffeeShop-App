import {create} from 'zustand';
import {produce} from 'immer';
import { persist,createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
    persist(
        (set,get) =>({
            CoffeeList: CoffeeData,
            BeansList: BeansData,
            CartPrice:0,
            FavoriteList:[],
            CartList:[],
            OrderHistoryList:[],
            addToCart:(cartItem)=>set(produce(state=>{
                let found= false;
                for(let i=0;i< state.CartList.length;i++){
                    if(state.CartList[i].id==cartItem.id){
                        found =true;
                        let size=false;
                        for(let j=0;j<state.CartList[i].prices.length;j++){
                            if(state.CartList[i].prices[j].size== cartItem.prices[0].size){
                                size=true;
                                state.CartList[i].prices[j].quantity++;
                                break;
                            }
                        }
                        if(size==false){
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        state.CartList[i].price.sort((a,b)=>{
                            if(a.size>b.size){
                                return -1;
                            }
                            if(a.size<b.size){
                                return 1;
                            }
                            return 0;
                        })
                        break;
                    }
                }
                if(found==false){
                    state.CartList.push(cartItem);
                }
            }),
        ),
        calculateCartPrice:()=> set(produce(state=>{
            let totalprice=0;
            for(let i = 0; i< state.CartList.length ; i++){
                tempprice=0;
                for(let j = 0; j < state.CartList[i].prices.length; j++){
                    tempprice= tempprice +
                     parseFloat(state.CartList[i].prices[j].price) *
                      state.CartList[i].prices[j].quantity;
                }
                state.CartList[i].ItemPrice= tempprice.toFixed(2).toString();
                totalprice = totalprice+tempprice 
            }
            state.CartPrice= totalprice.toFixed(2).toString();
        }),
    ),
    addToFavoriteList:(type,id) => 
        set(produce(state=>{
            if(type=="Coffee"){
                for(let i=0; i < state.CoffeeList.length; i++){
                    if(state.CoffeeList[i].id == id){
                        if(state.CoffeeList[i].favourite== false){
                            state.CoffeeList[i].favourite=true;
                            state.FavoriteList.unshift(state.CoffeeList[i]);
                        }
                        break;
                    }
                }
            }else  if(type=="Bean"){
                for(let i=0; i < state.BeansList.length; i++){
                    if(state.BeansList[i].id == id){
                        if(state.BeansList[i].favourite== false){
                            state.BeansList[i].favourite=true;
                            state.BeansList.unshift(state.BeansList[i]);
                        }
                        break;
                    }
                }
            }
        })),
        deleteFromFavoriteList:(type,id)=>{
            set(produce(state=>{
                if(type=='Coffee'){
                    for(let i=0; i < state.CoffeeList.length; i++){
                        if(state.CoffeeList[i].id == id){
                            if(state.CoffeeList[i].favourite== true){
                                state.CoffeeList[i].favourite=false;
                                state.FavoriteList.unshift(state.CoffeeList[i]);
                            }
                            break;
                        }
                    }
                } else  if(type=='Beans'){
                    for(let i=0; i < state.BeansList.length; i++){
                        if(state.BeansList[i].id == id){
                            if(state.BeansList[i].favourite== true){
                                state.BeansList[i].favourite=false;
                                state.FavoriteList.unshift(state.BeansList[i]);
                            }
                            break;
                        }
                    }
                }
                let spliceIndex =-1;
                for(let i=0;i<state.FavoriteList.length;i++){
                    if(state.FavoriteList[i].id==id){
                        spliceIndex=i;
                        break;
                    }
                }
                state.FavoriteList.splice(spliceIndex,1);
            }))
        }

        

        }),{name:'coffee-app', 
            storage:createJSONStorage(()=>AsyncStorage)
        }
    )
)