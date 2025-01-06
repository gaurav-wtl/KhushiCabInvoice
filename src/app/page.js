'use client'

import React, { useState } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const [data, setData] = useState({
    passengerName: "", journeyType: "", companyName: "",
    companyEmail: "", companyGST: "", companyMobile: "", pickupLocation: "", dropLocation: "",
    distance: "", startDate: "", startTime: "", endDate: "", vehicleType: "", baseFare: "", driverAllownce: "", toll: "",
    serviceCharge: "", subtotal: "", paidAmount: "", companyType: "",        // For WTL or AimCab selection
    invoiceFor: "",         // For passenger or organization selection
  });

  console.log("submit button click", data)

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get("/api/id");
    const { id } = res.data;

    if (typeof window !== 'undefined') {
      
      
      const invoiceHtml = `<div style="font-family: Arial, sans-serif;margin:0px; padding:0px; box-sizing: border-box;">
    <div id="invoice" style="margin:0px;padding:0px;">
        <div class="header" style="display: flex; justify-content: space-between;padding: 20px;background-color: #3d3938;align-items: center;">
            <img src="/img-logo.webp" alt="" style="max-height: 200px; max-width: 200px;">
            <div style="text-align: center;">
              <p style="font-size: 30px; font-weight: bolder;color:white">Khushi Cab</p>
              <p style="font-size: 30px; font-weight: bolder;color:white">Private Limited</p>
            </div>
            <div>
                <p style="font-size: xx-large; font-weight: bolder;color:white">INVOICE</p>
                <p style="color:white">Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</p>
            </div>
        </div>
    </div>
    <hr style="background-color: rgb(255, 51, 0); height: 15px;border:none; margin:0px">
    <div style="padding: 20px; display: flex; justify-content: space-between;">
        <div style="width: 48%; text-align: left; font-size: 14px; line-height: 1.6; color: #333;">
              <strong style="font-size: 16px;">Khushi Cab Pvt. Ltd.</strong><br />
              Mobile: 8888299923<br />
              Email: galbeketan@gmail.com<br />
              Website: khushicabservices.com<br />
              GST No.: 27AATCA5944R1ZL
          </div>
        <div style="width: 48%; text-align: right; font-size: 14px; line-height: 1.6; color: #333; padding-right: 10px;">
    <strong style="font-size: 16px; display: block; margin-bottom: 4px; margin-right: 27px;">${data.companyName}</strong>
    <span style="display: block; margin-bottom: 4px; margin-right: 70px;">Customer Name: ${data.passengerName}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 63px">Company Name: ${data.companyEmail}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 40px">Company Mobile: ${data.companyMobile}</span>
    <span style="display: block; margin-bottom: 4px; margin-right: 108px">Company GST: ${data.companyGST}</span>
    <span style="display: block; margin-right: 130px">Invoice No: #${id.id}</span>
</div>



    </div>
    <div style="width: 98%; margin:auto;">
        <table style="border-collapse: collapse;width: 100%;">
            <thead>
              <tr>
                <th style="padding: 12px; width: 150px; background-color: rgb(255, 51, 0); color: white; text-align: left; border: 1px solid #ddd; text-align: center;">Sr. No.</th>
                <th style="padding: 12px; background-color: rgb(255, 51, 0); color: white; text-align: left; border: 1px solid #ddd;">Item</th>
                <th style="padding: 12px; background-color: rgb(255, 51, 0); color: white; text-align: left; border: 1px solid #ddd;">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">1</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Pickup Location</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.pickupLocation}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">2</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Drop Location</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.dropLocation}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">3</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Journey Type</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.journeyType}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">4</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Distance (Km)</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.distance}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">5</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Pickup Date</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.startDate}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">6</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Return Date</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.endDate}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">7</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Vehicle Type</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.vehicleType}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">8</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Base Fare</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.baseFare}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">9</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Driver Allowance</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.driverAllownce}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">10</td>
                <td style="padding: 8px; border: 1px solid #ddd;">Toll, Parking & Tax</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${data.toll}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td></td>
                <td style="padding: 8px; border: 1px solid #ddd;">GST</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${((12 /100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllownce))).toFixed(2)}</td>
              </tr>
              <tr style="background-color: #ffffff;">
                <td></td>
                <td style="padding: 8px; border: 1px solid #ddd;">SUBTOTAL</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${((+data.toll) + (+data.baseFare) + (+data.driverAllownce)) + ((12 /100) * ((+data.toll) + (+data.baseFare) + (+data.driverAllownce)))}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td></td>
                <td style="padding: 8px; border: 1px solid #ddd;">Paid Amount</td>
                <td style="padding: 8px; border: 1px solid #ddd;">0</td>
              </tr>
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

  }

  return (
    <div className="mx-auto min-h-[100vh] p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Invoice</h2>
      <form onSubmit={handleFormSubmit} action="" className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        

        {/* Passenger Name */}
        <div>
          <label htmlFor="pname" className="block text-sm font-medium text-gray-600">Passenger Name</label>
          <input
            type="text"
            name='pname'
            value={data.passengerName}
            onChange={(e) => setData({ ...data, passengerName: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* vehicle Type */}
        <div>
          <label htmlFor="vtype" className="block text-sm font-medium text-gray-600">Vehicle Type</label>
          <input
            type="text"
            name='vtype'
            value={data.vehicleType}
            onChange={(e) => setData({ ...data, vehicleType: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/*company gst */}
        <div>
          <label htmlFor="cGST" className="block text-sm font-medium text-gray-600">Company GST</label>
          <input
            type="text"
            name='cGST'
            value={data.companyGST}
            onChange={(e) => setData({ ...data, companyGST: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Journey Type */}
        <div>
          <label htmlFor="jtype" className="block text-sm font-medium text-gray-600">
            Journey Type
          </label>
          <select
            id="jtype"
            name="jtype"
            onChange={(e) => setData({ ...data, journeyType: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Journey Type</option>
            <option value="oneway">One Way Trip</option>
            <option value="roundtrip">Round Trip</option>
            <option value="rental">Rental Trip</option>
          </select>
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor="cname" className="block text-sm font-medium text-gray-600">Company Name</label>
          <input
            type="text"
            name='cname'
            value={data.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Company Email */}
        <div>
          <label htmlFor="cemail" className="block text-sm font-medium text-gray-600">Company Email</label>
          <input
            type="text"
            name='cemail'
            value={data.companyEmail}
            onChange={(e) => setData({ ...data, companyEmail: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Company Mobile */}
        <div>
          <label htmlFor="cmobile" className="block text-sm font-medium text-gray-600">Company Mobile Number</label>
          <input
            type="tel"
            name='cmobile'
            value={data.companyMobile}
            onChange={(e) => setData({ ...data, companyMobile: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Pickup Location</label>
          <input
            type="text"
            name='pickup'
            value={data.pickupLocation}
            onChange={(e) => setData({ ...data, pickupLocation: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Drop Location */}
        <div>
          <label htmlFor="drop" className="block text-sm font-medium text-gray-600">Drop Location</label>
          <input
            type="text"
            name='drop'
            value={data.dropLocation}
            onChange={(e) => setData({ ...data, dropLocation: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Distance */}
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Distance (km)</label>
          <input
            type="number"
            name='distance'
            value={data.distance}
            onChange={(e) => setData({ ...data, distance: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">Start Date</label>
          <input
            type="date"
            name='startDate'
            value={data.startDate}
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">End Date</label>
          <input
            type="date"
            name='endDate'
            value={data.endDate}
            onChange={(e) => setData({ ...data, endDate: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Base Fare */}
        <div>
          <label htmlFor="baseFare" className="block text-sm font-medium text-gray-600">Base Fare</label>
          <input
            type="number"
            name='baseFare'
            value={data.baseFare}
            onChange={(e) => setData({ ...data, baseFare: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Driver Allowance */}
        <div>
          <label htmlFor="driverAllownce" className="block text-sm font-medium text-gray-600">Driver Allowance</label>
          <input
            type="number"
            name='driverAllownce'
            value={data.driverAllownce}
            onChange={(e) => setData({ ...data, driverAllownce: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Toll */}
        <div>
          <label htmlFor="toll" className="block text-sm font-medium text-gray-600">Toll</label>
          <input
            type="number"
            name='toll'
            value={data.toll}
            onChange={(e) => setData({ ...data, toll: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Service Charge */}
        {/* <div>
              <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-600">Service Charge</label>
              <input
                  type="number"
                  name='serviceCharge'
                  value={data.serviceCharge}
                  onChange={(e) => setData({ ...data, serviceCharge: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
          </div> */}

        {/* Subtotal */}
        {/* <div>
              <label htmlFor="subtotal" className="block text-sm font-medium text-gray-600">Subtotal</label>
              <input
                  type="number"
                  name='subtotal'
                  value={data.subtotal}
                  onChange={(e) => setData({ ...data, subtotal: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
          </div> */}

        {/* Paid Amount */}
        {/* <div>
              <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-600">Paid Amount</label>
              <input
                  type="number"
                  name='paidAmount'
                  value={data.paidAmount}
                  onChange={(e) => setData({ ...data, paidAmount: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
          </div> */}

        {/* Submit Button */}
        <div className="col-span-3">
          <input
            type="submit"
            value={"SUBMIT"}
            className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateInvoice;
