// // src/app/sample-html/page.tsx
// import React from 'react';

// const data = [
//   {
//     float_date: 'Wed Jun 26 2024 02:00:00 GMT+0200 (Central Africa Time)',
//     float_amount: 200000,
//     float_week_monday: 'Mon Jun 24 2024 02:00:00 GMT+0200 (Central Africa Time)',
//     float_week_saturday: 'Sat Jun 29 2024 02:00:00 GMT+0200 (Central Africa Time)',
//     open_account: 191000,
//     currency: 'Rwandan Francs',
//   },
//   // Add more data objects as needed
// ];

// export default function SampleHtml({data}:any) {
//   return (
//     <html>
//       <head>
//         <title>Sample HTML</title>
//       </head>
//       <body>
//         <div className="container mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4">This is a sample HTML page</h1>
//           <p className="mb-4">This page will be converted to PDF using Puppeteer.</p>
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Float Date</th>
//                 <th className="py-2 px-4 border-b">Float Amount</th>
//                 <th className="py-2 px-4 border-b">Float Week Monday</th>
//                 <th className="py-2 px-4 border-b">Float Week Saturday</th>
//                 <th className="py-2 px-4 border-b">Open Account</th>
//                 <th className="py-2 px-4 border-b">Currency</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="py-2 px-4 border-b">{new Date(item.float_date).toLocaleString()}</td>
//                   <td className="py-2 px-4 border-b">{item.float_amount}</td>
//                   <td className="py-2 px-4 border-b">{new Date(item.float_week_monday).toLocaleString()}</td>
//                   <td className="py-2 px-4 border-b">{new Date(item.float_week_saturday).toLocaleString()}</td>
//                   <td className="py-2 px-4 border-b">{item.open_account}</td>
//                   <td className="py-2 px-4 border-b">{item.currency}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </body>
//     </html>
//   );
// }
