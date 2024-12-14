import React, { useEffect } from "react";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/services/operations/user";
import { setAllUsers } from "@/redux/slice/user";
import { getAllPurchases } from "@/services/operations/product";
import { setAllPurchases } from "@/redux/slice/product";

const OverviewCards = () => {
  const dispatch = useDispatch();

  const { allProducts , purchases } = useSelector((state) => state.product);
  const { allUsers , token } = useSelector((state) => state.user);

  const users = async () => {
    const res = await getAllUsers();
    dispatch(setAllUsers(res));
  };

  const purchase = async()=>{
    const res = await getAllPurchases(token);
    dispatch(setAllPurchases(res))
  }

  
  const purchaseValuation = purchases?.reduce(
    (acc, product) => acc + product.price,
    0
  );


  useEffect(() => {
    users();
    purchase();
  }, []);


  const itemValuation = allProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const cards = [
    { title: "Total Users", value: allUsers?.length },
    { title: "Total Items", value: allProducts.length },
    { title: "Item Valuation", value: itemValuation },
    { title: "Total Purchase", value: purchases?.length },
    { title: "Item Purchase Valuation", value: purchaseValuation },


  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-700">{card.title}</h3>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <Products />
      </div>
    </div>
  );
};

export default OverviewCards;
