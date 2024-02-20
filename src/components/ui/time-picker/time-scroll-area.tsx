"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { ScrollArea } from "../scroll-area";
import { TimeScrollAreaItem } from "./time-scroll-area-item";

const START_OF_SCROLL_ITEM_VALUE = -1;
const END_OF_SCROLL_ITEM_VALUE = 100;

export type TimeScrollAreaProps = {
  selectorValues: string[];
  setValue: Dispatch<SetStateAction<number>>;
};

export const TimeScrollArea = ({
  selectorValues,
  setValue,
}: TimeScrollAreaProps) => {
  const [itemsOnViewport, setItemsOnViewport] = useState<number[]>([
    -1, -1, -1, -1, -1, -1, -1,
  ]);

  const onViewportEnter = useCallback(
    (itemValue: number) => {
      const _itemsOnViewport = itemsOnViewport;
      const [firstElement] = _itemsOnViewport;

      if (
        itemValue !== START_OF_SCROLL_ITEM_VALUE &&
        itemValue !== END_OF_SCROLL_ITEM_VALUE &&
        itemsOnViewport.some((item) => item === itemValue)
      ) {
        return;
      }

      if (itemValue > firstElement) {
        _itemsOnViewport.shift();
        _itemsOnViewport.push(itemValue);
      } else {
        _itemsOnViewport.pop();
        _itemsOnViewport.unshift(itemValue);
      }

      let newValue = _itemsOnViewport[3];
      if (
        newValue !== START_OF_SCROLL_ITEM_VALUE &&
        newValue !== END_OF_SCROLL_ITEM_VALUE
      ) {
        setValue(newValue);
      }
      setItemsOnViewport(_itemsOnViewport);
    },
    [itemsOnViewport, setValue]
  );

  const onClickItem = useCallback(
    (itemValue: number) => {
      const _itemsOnViewport = [
        itemValue - 3,
        itemValue - 2,
        itemValue - 1,
        itemValue,
        itemValue + 1,
        itemValue + 2,
        itemValue + 3,
      ];
      const _itemsOnViewportWithoutInvalidValue = _itemsOnViewport.map(
        (value) => {
          if (value < 0) {
            return START_OF_SCROLL_ITEM_VALUE;
          }
          if (value > selectorValues.length - 1) {
            return END_OF_SCROLL_ITEM_VALUE;
          }
          return value;
        }
      );
      setItemsOnViewport(_itemsOnViewportWithoutInvalidValue);
      setValue(itemValue);
    },
    [selectorValues, setValue]
  );

  return (
    <ScrollArea className="flex flex-col h-40">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-8"
          onViewportEnter={() => onViewportEnter(START_OF_SCROLL_ITEM_VALUE)}
        ></motion.div>
      ))}
      {selectorValues.map((value, index) => (
        <TimeScrollAreaItem
          value={value}
          key={index}
          onViewportEnter={() => onViewportEnter(index)}
          placeOnViewport={itemsOnViewport.indexOf(index)}
          onClick={() => onClickItem(index)}
        />
      ))}
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.div
          key={index}
          className="h-8"
          onViewportEnter={() => onViewportEnter(END_OF_SCROLL_ITEM_VALUE)}
        ></motion.div>
      ))}
    </ScrollArea>
  );
};
