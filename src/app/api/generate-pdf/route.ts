import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  const { exchanges } = await req.json();

  if (!exchanges) {
    return new NextResponse('No data provided', { status: 400 });
  }

  console.log('data:', exchanges); 

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PDF Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h1>Report on: ${new Date()}</h1>
        <table>
          <thead>
            <tr>
              <th>Float Date</th>
              <th>Float Amount</th>
              <th>Float Week Monday</th>
              <th>Float Week Saturday</th>
              <th>Open Account</th>
              <th>Currency</th>
            </tr>
          </thead>
          <tbody>
            ${exchanges.map((item: any) => `
              <tr>
                <td>${new Date(item.float_date).toLocaleString()}</td>
                <td>${item.float_amount}</td>
                <td>${new Date(item.float_week_monday).toLocaleString()}</td>
                <td>${new Date(item.float_week_saturday).toLocaleString()}</td>
                <td>${item.open_account}</td>
                <td>${item.currency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
    </body>
    </html>
  `);

  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();

  return new NextResponse(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    },
  });
}
