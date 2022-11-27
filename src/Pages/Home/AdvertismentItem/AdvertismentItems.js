import { useQuery } from "@tanstack/react-query";
import React from "react";
import SingleItem from "./SingleItem";

const AdvertismentItems = () => {
  const {
    data: advertisementItems = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["advertisementItem"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertisementItem");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return (
      <div className=" my-5 mx-auto w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
    );
  }
  console.log(advertisementItems);
  return (
    <div>
      {advertisementItems.length > 0 ? (
        <div className="my-7">
          <h2 className="font-bold text-3xl text-center">
            Products Advertisement
          </h2>
          <div className="grid gap-6 ml-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10">
            {advertisementItems.map((advertisementItem) => (
              <SingleItem
                key={advertisementItem._id}
                advertisementItem={advertisementItem}
              ></SingleItem>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdvertismentItems;
