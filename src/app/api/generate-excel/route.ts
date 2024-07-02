import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function POST(req: NextRequest) {
  try {
    const { exchanges } = await req.json();

    if (!exchanges) {
      return new NextResponse('No data provided', { status: 400 });
    }

    console.log("data:  ", exchanges)

    // Create a new workbook and a new worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exchanges);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Report');

    // Write the workbook to a buffer
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    return new NextResponse(wbout, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename=report.xlsx',
      },
    });
  } catch (error) {
    console.error('Error generating Excel:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
