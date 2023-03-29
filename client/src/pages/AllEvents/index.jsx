import React from 'react'
import Navbar from "../../components/common/Navbar";
import Footer from '../../components/common/Footer';
import Card from '../../components/AllEvents/EventCard';
import { useState , useEffect} from 'react';
// import { eventsList } from '../../config/eventsData';
import {URL} from "../../App"
import SearchBar from '../../components/AllEvents/SearchBar';
import { Link } from 'react-router-dom';

export default function Index() {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    fetch(`${URL}/AllEvent`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setEventsList(data.events);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  console.log(eventsList);
    let categories =[
        {name:"All Events",id:0},
        {name:"Past Events",id:1},
        {name:"Upcoming Events",id:2},
        {name:"Category 1",id:3},
        {name:"Category 2",id:4},
        {name:"Category 3",id:5},
      ];

    const [currentCategory, change] = useState(0);
    const [searchKey, setSearchKey] = useState('');

    const handleSearchSubmit = (event) => {
      console.log(searchKey);
      event.preventDefault();
      handleSearchResults();
    }
    var filteredEventsList;
    var newEventsList;
    
  // blogs by category
    const handleSearchResults = () =>{
      change(-1);
    }

    const handleCategoryClick = (e) => {
      change(e.target.id);
    }

    let correctedCategory;
    if(currentCategory == -1)
    {
      correctedCategory = 0;
    }
    else
    {
      correctedCategory = currentCategory;
    }


    function cat(category,i) {
      if (correctedCategory == category.id) {
        return <button key={i} id={category.id} className='py-3 my-2 mr-4 pl-4 text-xl bg-[#DBE2EF] border-l-[5px] w-full text-left border-[#041C32]'>{category.name}</button>
      }
      return <button key={i} id={category.id} onClick={(handleCategoryClick)} className='py-3 my-2 mr-4 pl-4 text-xl bg-[#DBE2EF] border-l-[5px] w-full text-left border-[#DBE2EF] hover:border-[#041C32]'>{category.name}</button>
    }

    
    if(currentCategory == -1)
    {
      newEventsList = eventsList.filter((data) => 
      data.title.toLowerCase().includes(searchKey.toLowerCase().trim()));
      console.log(searchKey + " old");    
    }
    else if(currentCategory == 0)
    {newEventsList = eventsList;}
    else if(currentCategory == 1)
    {newEventsList = eventsList.filter(data => data.status == "Past");}
    else if(currentCategory == 2)
    {newEventsList = eventsList.filter(data => data.status == "Upcoming");}
    else {newEventsList = eventsList.filter(data => data.category == categories[currentCategory].name);}
    
    


  return (
    <div className='font-defaultFont'>
      <Navbar />
      <div className='h-[140px]'></div>
      <div className='w-[80%] mx-auto'>
        <div className='flex'>
            <div className='w-[30%]'>
                <div>
                <SearchBar
                  value={searchKey} 
                  formSubmit={handleSearchSubmit}
                  handleSearchKey ={e=>setSearchKey(e.target.value)}
                />
                <div className='mt-6'>
                  <h1 className='text-2xl text-[#064663] '>Event Categories</h1>
                  <div className='w-32 h-[2px] ml-8 mt-2 rounded bg-[#064663]'></div>

                </div>

                <div className='pt-4'>
                    {
                        categories.map((category,i)=>(
                          cat(category,i)
                        ))
                    }
                </div>
                </div>
            </div>
            <div className='w-[70%] p-4'>
            {
              newEventsList.map((data) => (
                <Card
                  key = {data._id}
                  _id = {data._id}
                  title = {data.title}
                  image = {data.image}
                  location = {data.location}
                  category = {data.category}
                  date = {data.date}
                  shortdesc = {data.shortdesc}
                  desc = {data.desc}
                  status = {data.status}
                />
              ))
            }
            </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}
