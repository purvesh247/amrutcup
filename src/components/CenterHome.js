import React from "react";
import { useParams } from "react-router-dom";
import centerData from "../utils/centreData.json";
import Player from "./player";

function CenterHome() {
  const { centerId } = useParams();
  const centerInfo = centerData[centerId];

  if (!centerInfo) {
    return <div>Center not found.</div>;
  }
// eslint-disable-next-line
const { title, regularFeeEnds, eventInfo, centreName, amount, lateFee, lateFeeFeature } = centerInfo;

  return (
    <div className="center-home p-4 text-center max-w-3xl mx-auto">
      {centreName === "Saskatoon1" || centreName === "Toronto1" ? (
        <div className="text-2xl font-semibold text-red-600">
          Registration is closed as capacity has been reached
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>

          <div className="event-info bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-[rgb(1,55,100)]">Event Information</h3>

            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">{eventInfo.date}</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-semibold">Location</td>
                  <td className="border p-4">
                    {eventInfo.location}
                  </td>

                </tr>
              </tbody>
            </table>

            {/* <div className="fees bg-gray-50 p-4 rounded-lg shadow-sm mt-10">
              <h4 className="font-semibold text-xl mb-4 text-[rgb(1,55,100)] border-b pb-2">
                Fees
              </h4>
               <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium text-gray-700">
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium text-gray-700">
                      Registration Fee
                    </td>
                    <td className="py-1">${amount}</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            { lateFeeFeature ? (
               <div className="fees bg-gray-50 p-4 rounded-lg shadow-sm mt-10">
               <h4 className="font-semibold text-xl mb-4 text-[rgb(1,55,100)] border-b pb-2">
                 Fees
               </h4>
                <table className="w-full">
                 <tbody>
                   <tr>
                     <td className="py-1 font-medium text-gray-700">
                     </td>
                     <td className="py-1 font-semibold">Early Bird Registration</td>
                     <td className="py-1 font-semibold">Late Registration</td>
                   </tr>
                   <tr>
                     <td className="py-1 font-medium text-gray-700">
                       Fee
                     </td>
                     <td className="py-1">${amount}</td>
                     <td className="py-1">${lateFee}</td>
                   </tr>
                   <tr>
                     <td className="py-1 font-medium text-gray-700">
                       Deadline
                     </td>
                     <td className="py-1">{regularFeeEnds}</td>
                     <td className="py-1 ">{eventInfo.registrationLastDate}</td>
                   </tr>

                 </tbody>
               </table>
             </div>
            ) : (
              <div className="fees mt-4">
              <h4 className="font-semibold text-xl mb-2">Fees</h4>
              <p>
                <strong>Registration Fee:</strong>{" "}
                ${amount}
              </p>
              <p>
                <strong>Last day of Registration:</strong>{" "}
                {eventInfo.registrationLastDate}
              </p>
            </div>
            )
            }

            <Player centreData={centerInfo} />

          </div>
        </>
      )}
    </div>
  );
}

export default CenterHome;
