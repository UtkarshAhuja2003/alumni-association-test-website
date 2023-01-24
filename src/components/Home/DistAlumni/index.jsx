import React, { useState } from "react";
import Card from "./Card";
import {FaRegCaretSquareRight, FaRegCaretSquareLeft} from "react-icons/fa";
import data from "../../../config/distAlumni"


const CardCarousel = () => {
 let length = data.length;
 let checkLength;
 const [currentIndex, setCurrentIndex] = useState(0);
 let cardsToShow;
 const [deviceSize, setDeviceSize] = useState(window.innerWidth);
if(deviceSize<700)
{
    checkLength = 2;
    cardsToShow = data.slice(currentIndex, currentIndex + 1);
}
else
{
    checkLength = 4;
    cardsToShow = data.slice(currentIndex, currentIndex + 3);
}
 const handlePrevClick = () => {
    if(deviceSize<700)
    {
        setCurrentIndex(currentIndex-1);
    }
    else
    {
        setCurrentIndex(currentIndex - 3);
    }
 };
 const handleNextClick = () => {
    if(deviceSize<700)
    {
        setCurrentIndex(currentIndex+1);
    }
    else
    {
        setCurrentIndex(currentIndex + 3);
    }
 };

 return (
<div className={`font-[MerriWeather] w-[95%] m-[auto]`}>
    <div className=" p-[auto] text-center">
        <div  className="text-2xl font-[700] text-[#064663]">Distinguished Alumni</div>
        <div className="w-48 h-[2px] mx-[auto] mt-3 mb-6 bg-[#112D4E]"></div>
    </div>
    <div className="flex mb-8 w-[100%] m-[auto]">
        <button disabled={currentIndex==0} className={`${currentIndex==0 && `opacity-0`} text-blue-500 hover:text-blue-800`} onClick={handlePrevClick}><FaRegCaretSquareLeft className="h-8 w-8 text-[#064663]"></FaRegCaretSquareLeft></button>
        <div className="flex items-center justify-between">
        {cardsToShow.map(card => (
            <Card key={card.name}
                    image = {card.image}
                    {...card}
                    batch={card.batch}
                    branch={card.branch}
                    currentPosition={card.currentPosition}
                    company={card.company} />
        ))}
</div>
        <button disabled={currentIndex>(length-checkLength)} className={`${currentIndex>(length-checkLength) && `opacity-0`} text-blue-500 hover:text-blue-800`} onClick={handleNextClick}><FaRegCaretSquareRight className=" text-[#064663] h-8 w-8"></FaRegCaretSquareRight></button>
    </div>
</div>
);
};
export default CardCarousel;