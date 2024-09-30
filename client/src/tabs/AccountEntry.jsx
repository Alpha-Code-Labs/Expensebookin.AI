import React from 'react';
import { flattenData } from '../utilis/dataToTable';
import { responseData } from '../utilis/dummyData';
import { splitTripName } from '../utilis/handyFunctions';

const AccountEntry = ({data}) => {
  const tableData = flattenData(data);

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto">
        <table className="table-auto w-full">
          <thead className=" bg-slate-100 font-inter text-xs text-left z-10">
            <tr>
              <th className="font-normal px-4 py-2 rounded-tl-lg">Created By</th>
              <th className="font-normal px-4 py-2">Type</th>
              <th className="font-normal px-4 py-2">Trip Name</th>
              <th className="font-normal px-4 py-2">Expense/Cash-Advance No.</th>
              <th className="font-normal px-4 py-2">Paid By</th>
              <th className="font-normal px-4 py-2 rounded-tr-lg">Total Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {tableData?.map((row, index) => (
              <tr
                key={index}
                className={`divide-y border-y font-cabin text-sm text-neutral-700 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                <td className="px-4 py-2">{row.createdBy}</td>
                <td className="px-4 py-2">{row.type}</td>
                <td className="px-4 py-2">{splitTripName(row.tripName)}</td>
                <td className="px-4 py-2">{row['expense/cash-advance no.']}</td>
                <td className="px-4 py-2">{row.paidBy}</td>
                <td className="px-4 py-2">{row.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountEntry;