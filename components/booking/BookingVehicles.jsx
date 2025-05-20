"use client";
import Pagination from "../common/Pagination";
import { cars, features } from "@/data/cars";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import DatePickerComponent from "@/components/common/DatePicker";
import PlacePicker from "@/components/common/PlacePicker";
import TimePickerComponent from "@/components/common/TimePicker";
import PlaceFinderBlank from "@/components/common/PlaceFinderBlank";






export default function BookingVehicles() {
  const [distance, setDistance] = useState("0.00");  
  const [placeInput, setPlaceInput] = useState("");
  const [origin, setOrigin] = useState(null); // Optional: could be from PlacePicker
  const [destination, setDestination] = useState(null);
  const BASE_PRICE = 40;
const PER_KM_PRICE = 1.2;
const totalPrice = Math.max(BASE_PRICE, distance * PER_KM_PRICE).toFixed(2);

  useEffect(() => {
    // Set default origin ONLY
    setOrigin({
      lat: 45.8150, // e.g., Zagreb center
      lng: 15.9819,
    });
  
    // Keep this part for preserving the input
    const params = new URLSearchParams(window.location.search);
    const inputValue = params.get("input");
    if (inputValue) {
      setPlaceInput(inputValue);
    }
  }, []);
  
  
  
  // useEffect(() => { //promjena sa originala_24_4_2025_MATIJA_MARIĆ
  //   setOrigin({
  //     lat: 45.8150,
  //     lng: 15.9819,
  //   });
  //   setDestination({
  //     lat: 46.8150,
  //     lng: 17.9819,
      
  //   });
  //   const params = new URLSearchParams(window.location.search);
  //   const inputValue = params.get("input");
  //   if (inputValue) {
  //     setPlaceInput(inputValue);
  //   }
  // }, []);

  // This will run every time origin or destination changes
  useEffect(() => {
    if (!origin || !destination) return;

    const getDistance = (lat1, lon1, lat2, lon2, unit) => {
      if ((lat1 === lat2) && (lon1 === lon2)) return 0;
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) +
                 Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) dist = 1;
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") dist = dist * 1.609344;
      if (unit === "N") dist = dist * 0.8684;
      return dist;
    };

    const d = getDistance(origin.lat, origin.lng, destination.lat, destination.lng, "K");
    setDistance(d.toFixed(2));
  }, [origin, destination]);
  return (
    <div className="box-row-tab mt-50">
      <div className="box-tab-left">
        <div className="box-content-detail">
          <h3 className="heading-24-medium color-text mb-30 wow fadeInUp">
            Select Your Car
          </h3>
          <div className="list-vehicles wow fadeInUp">
            {cars.map((elm, i) => (
              <div key={i} className="item-vehicle wow fadeInUp">
                <div className="vehicle-left">
                  <div className="vehicle-image">
                    <Image
                      width={1530}
                      height={711}
                      style={{ height: "fit-content" }}
                      src={elm.imgSrc}
                      alt="luxride"
                    />
                  </div>
                  <div className="vehicle-facilities">
                    <div className="text-fact meet-greeting">
                      Meet & Greet included
                    </div>
                    <div className="text-fact free-waiting">
                      15 Minute Waiting time
                    </div>
                    <div className="text-fact safe-travel">
                      Safe and secure travel
                    </div>
                  </div>
                </div>
                <div className="vehicle-right">
                  <h5 className="text-20-medium color-text mb-10">
                    {elm.title}
                  </h5>
                  <p className="text-14 color-text mb-20">{elm.description}</p>
                  <div className="vehicle-passenger-luggage mb-10">
                    <span className="passenger">
                      {elm.passenger}
                    </span>
                    <span className="luggage">{elm.luggageL} <br></br>{elm.luggageS}</span>
                  </div>
                  <div className="vehicle-price">
                    <h4 className="heading-30-medium color-text">
                      Minimum price: 40€ - €1.20 / km
                    </h4>
                  </div>
                  <div className="price-desc mb-20">
                    All prices include VAT and road expenses
                  </div>

                  <Link
  className="btn btn-primary w-100"
  href={{
    pathname: "/booking-passenger",
    query: {
      originLat: origin?.lat,
      originLng: origin?.lng,
      destinationLat: destination?.lat,
      destinationLng: destination?.lng,
      distance: distance,
      input: placeInput,
    },
  }}
>
  Select
  <svg
    className="icon-16 ml-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
    ></path>
  </svg>
</Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
<div className="box-tab-right">
      <div className="sidebar">
        <div className="d-flex align-items-center justify-content-between wow fadeInUp">
          <h6 className="text-20-medium color-text">Ride Summary</h6>
        </div>
        <div className="mt-20 wow fadeInUp">
          <ul className="list-routes">
            <li>
              <span className="location-item">A </span>
              <span className="info-location text-14-medium">
              <PlacePicker onSelect={setOrigin} />
              </span>
            </li>
            <li>
              <span className="location-item">B </span>
              <span className="info-location text-14-medium"><PlaceFinderBlank 
                    onSelect={setDestination}
                    defaultValue={placeInput}
                  /></span>
            </li>
          </ul>
        </div>
        <div className="mt-20 wow fadeInUp">
          <ul className="list-icons">
            <li>
              <span className="icon-item icon-plan"> </span>
              <span className="info-location text-14-medium">
                <DatePickerComponent />
              </span>
            </li>
            <li>
              <span className="icon-item icon-time"></span>
              <span className="info-location text-14-medium"><TimePickerComponent /></span>
            </li>
          </ul>
        </div>
        <div className="mt-20 wow fadeInUp">
          <div className="box-map-route">
          <iframe
                className="map-contact"
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d11120.727283665392!2d16.142688!3d45.827642000000004!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDXCsDQ5JzM3LjAiTiAxNsKwMDgnMzIuNiJF!5e0!3m2!1sen!2sus!4v1744805782391!5m2!1sen!2sus"
                style={{ border: "0px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
          <div className="box-info-route">
            <div className="info-route-left">
              <span className="text-14 color-grey">Total Distance</span>
              <span className="text-14-medium color-text">
                {totalPrice} €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
