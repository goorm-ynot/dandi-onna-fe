"use client";

import { useEffect, useState } from "react";
import { fetchInvoiceDetailsById } from "@/actions/billing";
import { InvoiceDocument } from "@/components/invoice/InvoiceDocument";
import { billingInvoiceType } from "@/types/paymentType";
import { useParams, useSearchParams } from "next/navigation";

export default function PrintInvoicePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [data, setData] = useState<billingInvoiceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const id = params.id as string;
  const mode = searchParams.get("mode");

  useEffect(() => {
    async function loadData() {
      const result = await fetchInvoiceDetailsById(id);
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(true);
      }
      setLoading(false);
    }
    loadData();
  }, [id]);

  useEffect(() => {
    if (!loading && data) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="p-24">
        <div className="title6 text-foreground-normal">로딩 중...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-24">
        <div className="title6 text-foreground-normal">영수증을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print-hidden {
            display: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
      
      <div className="min-h-screen bg-white text-foreground-normal">
        <main className="mx-auto w-[210mm] px-[12mm] py-[12mm]">
          <header className="mb-16 flex items-start justify-between">
            <div>
              <h1 className="text-20 font-bold">결제 영수증</h1>
            </div>
            
            <div className="print-hidden flex gap-8">
              <button
                onClick={() => window.print()}
                className="border border-border-normal px-12 py-6 rounded-md hover:bg-gray-50"
              >
                {mode === 'download' ? 'PDF 저장' : '인쇄'}
              </button>
              <button
                onClick={() => window.close()}
                className="border border-border-normal px-12 py-6 rounded-md hover:bg-gray-50"
              >
                닫기
              </button>
            </div>
          </header>

          <InvoiceDocument data={data} />
        </main>
      </div>
    </>
  );
}
