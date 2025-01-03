import React, { useState } from "react";
import Badge from "../component/atom/badge/badge";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { ConsultingList } from "@/app/business/consulting-room/customer-consulting.service";

interface HistoryCardProps {
  cardItem: ConsultingList;
}

export default function HistoryCard({ cardItem }: HistoryCardProps) {
  // const { title, category, date, content } = cardItem;
  const {consultingRoomId,createdAt,title,categoryName,summary,customerName} = cardItem;
  const [isOpen, setIssOpen] = useState(false);

  const toggleOpen = () => {
    setIssOpen((prev) => !prev);
  };

  if(!consultingRoomId&&!customerName){
    return (
      <p>데이터가 없습니다.</p>
    )
  }

  return (
    <div
      className={`rounded-lg shadow-md ${isOpen ? "rounded-b-none" : ""}`}
      onClick={toggleOpen}
    >
      <div className="flex justify-between items-center p-5">
        <div>
          <div className="text-lg font-medium">{title}</div>
          <div className="flex space-x-4 mt-3 items-center">
            <Badge className="bg-hwachang-lightgreen1 rounded-sm px-6 text-sm font-normal text-black hover:bg-hwachang-lightgreen1">
              {categoryName}
            </Badge>
            <div className="text-sm">{createdAt.slice(0, 19).replace("T", " ")}</div>
          </div>
        </div>
        <div className="mr-3">
          {isOpen ? <SlArrowUp size="27" color="gray" /> : <SlArrowDown size="27" color="gray" />}
        </div>
      </div>

      {/* 구분선 */}
      {isOpen && (
        <hr className="shadow-md" />
      )}

      {/* 카드를 펼쳤을 때 나타날 공간 */}
      {isOpen && (
        <div className="p-4 font-medium">
          {summary}
        </div>
      )}
    </div>
  );
}