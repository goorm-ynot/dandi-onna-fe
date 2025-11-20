'use client';

import React, { useState } from 'react';

export default function PaymentPolicyAccordion() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='flex flex-col gap-5 w-full'>
      {/* Header */}
      <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
        <p className='title5 text-[#262626]'>예약 및 환불 규정</p>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <path d='M6 9L12 15L18 9' stroke='#262626' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </div>

      {/* Content */}
      {isOpen && (
        <div className='bg-[#f6f6f6] rounded-[6px] px-4 py-5 flex flex-col gap-5'>
          {/* Section 1 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5'>
              <li className='body2 text-[#262626]'>노쇼 메뉴(할인 상품)의 특성</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                노쇼 메뉴는 기존 예약 취소로 인해 남은 음식을 당일 한정, 할인된 가격으로 재판매하는 상품입니다.
              </li>
              <li className='list-disc'>
                재고 및 유통기한 특성상, 노쇼 메뉴는 당일 내 방문·수령을 전제로 한 상품입니다.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={2}>
              <li className='body2 text-[#262626]'>노쇼 메뉴 결제 후 취소·환불 규정</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                노쇼 메뉴는 결제 완료 시점부터 단순 변심, 일정 변경, 지연 도착 등을 이유로 한 취소·환불이 불가능합니다.
              </li>
              <li className='list-disc'>주문 후 메뉴, 수량, 방문시간, 방문 인원 등은 변경할 수 없습니다.</li>
              <li className='list-disc'>
                방문 가능 시간(앱에 표시된 방문시간)까지 매장에 방문하지 않을 경우, 이는 소비자 측 노쇼로 간주되며, 결제
                금액은 환불되지 않습니다.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={3}>
              <li className='body2 text-[#262626]'>일반 예약(정상가 주문) 취소·노쇼 규정</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                일반 예약의 취소 가능 시간 및 수수료 정책은 매장별 정책을 따르며, 앱 내 예약 화면에서 별도로 안내합니다.
              </li>
              <li className='list-disc'>
                매장 정책상 노쇼로 처리된 예약 건은 이후 환불 또는 노쇼 메뉴 등록 취소가 불가능합니다.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={4}>
              <li className='body2 text-[#262626]'>예외적으로 취소·환불이 가능한 경우</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                다음과 같은 경우에는 매장 또는 본 서비스의 확인 후 결제 취소 또는 환불이 진행될 수 있습니다.
              </li>
              <li className='list-disc'>
                매장 사정으로 인해 주문한 메뉴를 제공할 수 없는 경우 (예: 조기 폐점, 설비 고장, 위생 문제, 재고 관리
                오류 등)
              </li>
              <li className='list-disc'>
                결제 시스템 오류, 중복 결제 등 기술적 문제로 인해 정상 금액 이상이 청구된 것이 확인된 경우
              </li>
              <li className='list-disc'>
                주문 내용과 전혀 다른 메뉴 제공 등, 매장 과실이 명백하다고 판단되는 경우 → 위 사유로 취소·환불이 승인된
                경우, 결제는 PG사/카드사 기준으로 영업일 N일 이내 순차 처리됩니다.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={5}>
              <li className='body2 text-[#262626]'>방문 및 이용 관련 안내</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                소비자는 매장 방문 시 반드시 앱 내 주문/예약 화면(또는 번호 등)을 제시해야 합니다.
              </li>
              <li className='list-disc'>
                방문시간은 매장을 이용할 수 있는 마감 시간을 의미하며, 해당 시간 이후 방문 시 매장은 서비스를 제공하지
                않을 수 있습니다. 이 경우에도 환불은 불가합니다.
              </li>
              <li className='list-disc'>
                노쇼 메뉴 특성상, 매장은 품질 유지를 위해 포장/보관 방식 또는 즉시 섭취 권장 등의 조건을 안내할 수
                있습니다.
              </li>
            </ul>
          </div>

          {/* Section 6 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={6}>
              <li className='body2 text-[#262626]'>식품 안전 및 알레르기 안내</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                알레르기 유발 가능 성분에 대한 정보는 매장에서 제공하는 안내를 우선으로 하며, 알레르기 확인 없이
                주문·섭취한 경우의 책임은 소비자 본인에게 있습니다.
              </li>
              <li className='list-disc'>
                상품 수령 후 보관·섭취 과정에서 발생하는 변질 및 이상에 대해서는 매장 또는 서비스가 책임지기 어렵습니다.
              </li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className='flex flex-col gap-[6px]'>
            <ol className='list-decimal ml-5' start={7}>
              <li className='body2 text-[#262626]'>분쟁 처리</li>
            </ol>
            <ul className='caption3 text-[#4c4c4c] ml-[18px] space-y-0'>
              <li className='list-disc'>
                주문/방문 과정에서 문제가 발생한 경우, 먼저 매장과 직접 협의하는 것을 원칙으로 합니다.
              </li>
              <li className='list-disc'>
                매장과의 협의가 어려운 경우, 앱 내 고객센터를 통해 문의해주시면, 서비스 정책 범위 내에서 조정·안내를
                도와드립니다.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
