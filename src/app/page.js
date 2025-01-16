'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const [data, setData] = useState({
    passengerName: "", journeyType: "", companyName: "",
    companyEmail: "", companyGST: "", companyMobile: "", pickupLocation: "", dropLocation: "",
    distance: "", startDate: "", startTime: "", endDate: "", endTime: "", vehicleType: "", baseFare: "", driverAllowance: "0", toll: "0", parking: "0",
    serviceCharge: "0", subtotal: "0", paidAmount: "0", remainingAmount: "0", companyType: "",
    invoiceFor: "", bookedBy: "", driverContact:"",extraHrs:"", extraKM:"", rentalType: "", extraPrice:0, totalHrs: 0,extraPriceHrs: 0, totalAmount: 0
  });
  const [total, setTotal] = useState(0);

  
  useEffect(()=>{
    
    if(data.journeyType=="oneway"){
      data.totalAmount = Math.floor((+data.toll) + (+data.parking) + (+data.baseFare) + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllowance) + (+data.parking)))
    }
    else if(data.journeyType=="roundtrip"){
      const day1 = new Date(data.startDate);
      const day2 = new Date(data.endDate);

      const days = Math.abs(day2 - day1) / (1000 * 60 * 60 * 24) + 1;
      let m =0;

      if(days == 1 && data.distance < 300){
        m = data.baseFare * 300;
      }
      else if(days == 1 && data.distance >= 300){
        m = data.baseFare * data.distance
      }
      else if(data.distance < (days * 300)){
        m = data.baseFare * (days * 300);
      }
      else{
        m = data.baseFare * data.distance;
      }

      data.totalAmount = Math.floor((+data.toll) + (+data.parking) + m + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + m + (+data.driverAllowance) + (+data.parking)))
    }
    else{
      const m = (+data.baseFare) + ((+data.extraHrs) * data.extraPriceHrs) + ((+data.extraKM) * data.extraPrice);
      data.totalAmount = Math.floor((+data.toll) + (+data.parking) + m + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + m + (+data.driverAllowance) + (+data.parking)))
    }

    setTotal(data.totalAmount);
    console.log(data.baseFare, "base fair price");
  }, [data.baseFare, data.paidAmount, data.driverAllowance, data.toll, data.parking, data.extraHrs, data.extraKM, data.extraPrice, data.extraPriceHrs, data.distance])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get("/api/id");
    const { id } = res.data;

    if(data.journeyType == "roundtrip"){
      const day1 = new Date(data.startDate);
      const day2 = new Date(data.endDate);

      const days = Math.abs(day2 - day1) / (1000 * 60 * 60 * 24) + 1;

      if(days == 1 && data.distance < 300){
        data.baseFare = data.baseFare * 300;
      }
      else if(days == 1 && data.distance >= 300){
        data.baseFare = data.baseFare * data.distance
      }
      else if(data.distance < (days * 300)){
        data.baseFare = data.baseFare * (days * 300);
      }
      else{
        data.baseFare = data.baseFare * data.distance;
      }


    }

    if(data.journeyType == "rental"){
      data.baseFare = (+data.baseFare) + ((+data.extraHrs) * data.extraPriceHrs) + ((+data.extraKM) * data.extraPrice);
    }

    if (typeof window !== 'undefined') {


      const invoiceHtml = `<div style="font-family: Arial, sans-serif;margin:0px; padding:0px; box-sizing: border-box;">
    <div id="invoice" style="margin:0px;padding:0px;">
        <div class="header" style="display: flex; justify-content: space-between;padding: 20px;background-color: #3d3938;align-items: center;">
            <img src="/img-logo.webp" alt="" style="max-height: 130px; max-width: 130px;">
            <div style="text-align: center;">
              <p style="font-size: 22px; font-weight: bolder;color:white">Khushi Cab</p>
              <p style="font-size: 22px; font-weight: bolder;color:white">Private Limited</p>
            </div>
            <div>
                <p style="font-size: 22px; font-weight: bolder;color:white">INVOICE</p>
                <p style="color:white">Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</p>
            </div>
        </div>
    </div>
    <hr style="background-color: rgb(255, 51, 0); height: 15px;border:none; margin:0px">
    <div style="padding: 20px; padding-top:10px; display: flex; justify-content: space-between;">
        <div style="width: 48%; text-align: left; font-size: 14px; line-height: 1; color: #333;">
              <strong style="font-size: 16px;">Khushi Cab Pvt. Ltd.</strong><br />
              Mobile: 8888299923<br />
              Email: galbeketan@gmail.com<br />
              Website: khushicabservices.com<br />
              GST No.: 27AATCA5944R1ZL
          </div>
        <div style="width: 48%; text-align: right; font-size: 14px; line-height: 1; color: #333; padding-right: 10px;">
    <strong style="font-size: 16px; display: block; margin-bottom: 4px; margin-right: 27px;">${data.companyName}</strong>
    <span style="display: block; margin-bottom: 4px; margin-right: 27px;">Customer Name: ${data.passengerName}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 27px">Company Name: ${data.companyEmail}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 27px">Company Mobile: ${data.companyMobile}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 27px">Company GST: ${data.companyGST}</span>
    <span style="display: block; margin-right: 27px">Invoice No: #${id.id}</span>
</div>



    </div>
    <div style="width: 98%; margin:auto;">
        <table style="border-collapse: collapse;width: 100%;">
            <thead>
              <tr>
                <th style="padding: 12px; background-color: rgb(255, 51, 0); color: white; text-align: left; border: 1px solid #ddd;">Item</th>
                <th style="padding: 12px; background-color: rgb(255, 51, 0); color: white; text-align: left; border: 1px solid #ddd;">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Pickup Location</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.pickupLocation}</td>
              </tr>
              ${data.dropLocation !== "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Drop Location</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.dropLocation}</td>
              </tr>` : ""
              }
              <tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Journey Type</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.journeyType}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Distance (Km)</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.distance}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Pickup Date</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.startDate}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Pickup Time</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.startTime}</td>
              </tr>
              ${
                data.endDate != "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Return Date</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.endDate}</td>
              </tr>` : ""
              }
              ${
                data.endTime != "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Return Time</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.endTime}</td>
              </tr>` : ""
              }
              ${
                data.extraHrs != "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Extra Hours</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.extraHrs}</td>
              </tr>` : ""
              }
              ${
                data.extraKM != "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Extra KM</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.extraKM}</td>
              </tr>` : ""
              }
              ${
                data.rentalType != "" ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Rental Type</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.rentalType}</td>
              </tr>` : ""
              }
              <tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Vehicle Type</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.vehicleType}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Base Fare</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.baseFare}</td>
              </tr>
              ${
                data.driverAllowance != "0" ? `<tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Driver Allowance</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.driverAllowance}</td>
              </tr>` : ""
              }
               ${
                data.totalHrs ? `<tr style="background-color: #f9f9f9;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Total Hours</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.totalHrs}</td>
              </tr>` : ""
              }
              
              <tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Toll</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.toll}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Parking</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.parking}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 6px; border: 1px solid #ddd;">GST</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${Math.floor((12 / 100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllowance) + (+data.parking))).toFixed(2)} (12% GST)</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 6px; border: 1px solid #ddd;">SUBTOTAL</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${Math.floor((+data.toll) + (+data.parking) + (+data.baseFare) + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllowance) + (+data.parking)))}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 6px; border: 1px solid #ddd;">Paid Amount</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${data.paidAmount}</td>
              </tr>
              ${
                (((+data.toll) + (+data.parking) + (+data.baseFare) + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllowance) + (+data.parking)))) - data.paidAmount != 0 ? `<tr style="background-color: #ffffff;">
                
                <td style="padding: 6px; border: 1px solid #ddd;">Remaining Amount</td>
                <td style="padding: 6px; border: 1px solid #ddd;">${((+data.toll) + (+data.parking) + (+data.baseFare) + (+data.driverAllowance)) + Math.floor((12 / 100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllowance) + (+data.parking))) - data.paidAmount}</td>
              </tr>` : ""
              }
            </tbody>
          </table>
    </div>

    <p style="margin: 20px; font-size: 14px; color: #333;">
        <strong>Note:</strong> This is a computer-generated invoice. Toll, Parking, and Extra KM as per the receipt.
    </p>

</div>`;

      // Create a temporary div to hold the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = invoiceHtml;

      // Generate PDF using html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf().from(tempDiv).save('invoice.pdf');

     

    }

    setData({
      passengerName: "", journeyType: "", companyName: "",
      companyEmail: "", companyGST: "", companyMobile: "", pickupLocation: "", dropLocation: "",
      distance: "", startDate: "", startTime: "", endDate: "", endTime: "", vehicleType: "", baseFare: "", driverAllowance: "0", toll: "0", parking: "0",
      serviceCharge: "0", subtotal: "0", paidAmount: "0", remainingAmount: "0", companyType: "",
      invoiceFor: "", bookedBy: "", driverContact:"",extraHrs:"", extraKM:"", rentalType: "", extraPrice:0, totalHrs: 0,extraPriceHrs: 0, totalAmount: 0
    });

  }

  return (
    <div className="mx-auto min-h-[100vh] p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Invoice</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Company Name */}
        <div>
          <label htmlFor="cname" className="block text-sm font-medium text-gray-600">Company Name</label>
          <input
            type="text"
            name="cname"
            value={data.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

         {/* Journey Type */}
         <div>
          <label htmlFor="jtype" className="block text-sm font-medium text-gray-600">Journey Type</label>
          <select
            id="jtype"
            name="jtype"
            value={data.journeyType}
            onChange={(e) => setData({ ...data, journeyType: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Journey Type</option>
            <option value="oneway">One Way Trip</option>
            <option value="roundtrip">Round Trip</option>
            <option value="rental">Rental Trip</option>
          </select>
        </div>

        {/* Company Email */}
        <div>
          <label htmlFor="cemail" className="block text-sm font-medium text-gray-600">Company Email</label>
          <input
            type="text"
            name="cemail"
            value={data.companyEmail}
            onChange={(e) => setData({ ...data, companyEmail: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        

        {/* Passenger Name */}
        <div>
          <label htmlFor="pname" className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            name="pname"
            value={data.passengerName}
            onChange={(e) => setData({ ...data, passengerName: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Company Mobile */}
        <div>
          <label htmlFor="cmobile" className="block text-sm font-medium text-gray-600">Mobile Number</label>
          <input
            type="tel"
            name="cmobile"
            value={data.companyMobile}
            onChange={(e) => setData({ ...data, companyMobile: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Pickup Location */}
        {(data.journeyType === "oneway") && (
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Pickup Location</label>
            <input
              type="text"
              name="pickup"
              value={data.pickupLocation}
              onChange={(e) => setData({ ...data, pickupLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Drop Location</label>
            <input
              type="text"
              name="pickup"
              value={data.dropLocation}
              onChange={(e) => setData({ ...data, dropLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
        {(data.journeyType === "roundtrip") && (
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Pickup Location</label>
            <input
              type="text"
              name="pickup"
              value={data.pickupLocation}
              onChange={(e) => setData({ ...data, pickupLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Drop Location</label>
            <input
              type="text"
              name="pickup"
              value={data.dropLocation}
              onChange={(e) => setData({ ...data, dropLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {(data.journeyType === "rental") && (
          <>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Pickup Location</label>
            <input
              type="text"
              name="pickup"
              value={data.pickupLocation}
              onChange={(e) => setData({ ...data, pickupLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Drop Location</label>
            <input
              type="text"
              name="pickup"
              value={data.dropLocation}
              onChange={(e) => setData({ ...data, dropLocation: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Rental Type</label>
            <input
              type="text"
              name="rentalType"
              value={data.rentalType}
              onChange={(e) => setData({ ...data, rentalType: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Extra Price Per KM</label>
            <input
              type="number"
              name="extraPrice"
              value={data.extraPrice}
              onChange={(e) => {setData({ ...data, extraPrice: e.target.value }); }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Extra Price Per Hrs</label>
            <input
              type="number"
              name="extraPriceHR"
              value={data.extraPriceHrs}
              onChange={(e) => {setData({ ...data, extraPriceHrs: e.target.value }); }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>
          <div>
            <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Total Hours</label>
            <input
              type="number"
              name="totalHrs"
              value={data.totalHrs}
              onChange={(e) => setData({ ...data, totalHrs: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>
          </>
        )}

       



        {/* Vehicle Type */}
        <div>
          <label htmlFor="vtype" className="block text-sm font-medium text-gray-600">Vehicle Type</label>
          <input
            type="text"
            name="vtype"
            value={data.vehicleType}
            onChange={(e) => setData({ ...data, vehicleType: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Conditional Rendering Based on Journey Type */}
        {(data.journeyType === "" || data.journeyType === "oneway" || data.journeyType === "rental" || data.journeyType === "roundtrip") && (
          <div>
            <label htmlFor="startDateTime" className="block text-sm font-medium text-gray-600">
              Choose Start Date & Time
            </label>

            {/* Date Input */}
            <input
              type="date"
              name="startDate"
              value={data.startDate || ""} // Show selected date or leave blank
              onChange={(e) => {
                setData({ ...data, startDate: `${e.target.value.split("T")[0]}` });
              }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Time Input */}
            <input
              type="time"
              name="startTime"
              value={data.startTime || ""} // Display empty if no time is selected
              onChange={(e) => {
                setData({ ...data, startTime: `${e.target.value}` });
              }}
              placeholder="Select Time" // Optional, can also use default browser placeholder
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        )}





        {/* Company GST */}
        <div>
          <label htmlFor="cGST" className="block text-sm font-medium text-gray-600">GST Number</label>
          <input
            type="text"
            name="cGST"
            value={data.companyGST}
            onChange={(e) => setData({ ...data, companyGST: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        

        {(data.journeyType === "roundtrip") && (
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">
              Choose End Date & Time
            </label>

            {/* Date Input */}
            <input
              type="date"
              name="endDate"
              value={data.endDate || ""} // Show selected date or leave blank
              onChange={(e) => {
                setData({ ...data, endDate: `${e.target.value.split("T")[0]}` });
              }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Time Input */}
            <input
              type="time"
              name="endTime"
              value={data.endTime || ""} // Display empty if no time is selected
              onChange={(e) => {
                setData({ ...data, endTime: `${e.target.value}` });
              }}
              placeholder="Select Time" // Optional, can also use default browser placeholder
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        )}


        {/* Distance */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Distance (km)</label>
          <input
            type="number"
            name="distance"
            value={data.distance}
            onChange={(e) => setData({ ...data, distance: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {data.journeyType === "rental" && (
          <div>
            <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Extra km</label>
            <input
              type="number"
              name="extraKM"
              value={data.extraKM}
              onChange={(e) => {setData({ ...data, extraKM: e.target.value }); }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Extra hr</label>
            <input
              type="number"
              name="extraHrs"
              value={data.extraHrs}
              onChange={(e) => {setData({ ...data, extraHrs: e.target.value }); }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Conditional Rendering Based on Journey Type */}



        {/* Base Fare */}
        <div>
          <label htmlFor="baseFare" className="block text-sm font-medium text-gray-600">Base Fare</label>
          <input
            type="number"
            name="baseFare"
            value={data.baseFare}
            onChange={(e) => {setData({ ...data, baseFare: e.target.value }); }}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>



        {/* Driver Allowance (Only for Round Trip and when Journey Type is selected) */}
        {(data.journeyType === "roundtrip") && (
          <div className="mt-4">
            <label htmlFor="driverAllowance" className="block text-sm font-medium text-gray-600">
              Driver Allowance
            </label>
            <input
              type="number"
              name="driverAllowance"
              value={data.driverAllowance}
              onChange={(e) => {setData({ ...data, driverAllowance: e.target.value }); }}
              className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Toll */}
        <div>
          <label htmlFor="toll" className="block text-sm font-medium text-gray-600">Toll</label>
          <input
            type="number"
            name="toll"
            value={data.toll}
            onChange={(e) => {setData({ ...data, toll: e.target.value }); }}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
        </div>

        <div>
        </div>

        {/* Parking */}
        <div>
          <label htmlFor="finalFare" className="block text-sm font-medium text-gray-600">Parking</label>
          <input
            type="number"
            name="parking"
            value={data.parking}
            onChange={(e) => {setData({ ...data, parking: e.target.value }); }}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Parking */}
        <div>
          <label htmlFor="finalFare" className="block text-sm font-medium text-gray-600">Paid Amount</label>
          <input
            type="number"
            name="paid"
            value={data.paidAmount}
            onChange={(e) => setData({ ...data, paidAmount: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="finalFare" className="block text-sm font-medium text-gray-600">Total Amount</label>
          <input
            type="number"
            name="toatl"
            value={total}
            readOnly
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>
        </div>

      </form>
    </div>

  );
};

export default CreateInvoice;
