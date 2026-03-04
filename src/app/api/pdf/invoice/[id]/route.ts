/**
 * 인보이스 PDF 다운로드 API 라우트
 */

import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 현재 서버의 base URL 가져오기
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const printUrl = `${protocol}://${host}/print/invoice/${id}`;

    // Puppeteer 브라우저 실행
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // 인쇄 페이지 로드
    try {
      await page.goto(printUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
      // console.log('페이지 로드 성공');
    } catch (pageError) {
      console.error('페이지 로드 실패:', pageError);
      throw pageError;
    }

    // PDF 생성
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '12mm',
        right: '12mm',
        bottom: '12mm',
        left: '12mm',
      },
    });

    await browser.close();

    // PDF 파일로 응답
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'PDF 생성 실패' },
      { status: 500 }
    );
  }
}