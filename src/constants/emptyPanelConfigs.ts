/**
 * 빈 패널 가이드 설정
 * - 각 페이지별로 표시할 컨텐츠를 정의
 */

export type EmptyPanelVariant = 'error' | 'warning' | 'info' | 'default' | 'success';

export interface EmptyPanelConfigContent {
  title: string;
  description?: string;
  guideTitle: string;
  tips: string[];
}

export interface EmptyPanelConfig {
  info: EmptyPanelConfigContent;
  warning?: EmptyPanelConfigContent;
  error?: EmptyPanelConfigContent;
  success?: EmptyPanelConfigContent;
  default?: EmptyPanelConfigContent;
}

/**
 * 예약 관리 페이지 (/seller)
 */
export const SELLER_PANEL_CONFIG: EmptyPanelConfig = {
  info: {
    title: '현재 노쇼 처리할 예약이 없습니다.',
    description: '모든 예약이 정상적으로 진행 중이에요.',
    guideTitle: '예약은 이렇게 관리돼요',
    tips: [
        '손님이 도착하면 예약 상태가 \'방문완료\'로 바뀝니다.',
        '예약 시간이 15분 지나면 노쇼 여부를 확인할 수 있어요.',
        '노쇼가 발생하면 알림으로 안내해 드려요.',
    ],
  },
  warning: {
    title: '노쇼 확인 대기중인 예약이 있습니다.',
    description: '예약 시간이 15분 지났습니다.\n아직 노쇼로 확정되지 않았어요.',
    guideTitle: '예약은 이렇게 관리돼요',
    tips: [
               '손님이 아직 도착하지 않았다면 노쇼로 등록하거나,\n설정에 따라 자동으로 처리될 수 있습니다.',
    ],
  },
  error: {
    title: '유예시간이 종료되어\n노쇼 여부 판단이 필요합니다.',
    description: '손님이 아직 도착하지 않았다면 노쇼로 등록하거나 더 기다릴 수 있습니다.',
    guideTitle: '예약은 이렇게 관리돼요',
    tips: [
           '손님이 도착하지 않았다면\n지금 바로 노쇼로 등록할 수 있습니다.\n또는 10분 더 기다린 후 다시 판단할 수도 있어요.',
    ],
  },
  success: {
    title: '현재 노쇼처리된 주문이 있습니다.',
    guideTitle: '예약은 이렇게 관리돼요',
    tips: [
        '설정한 노쇼 정책에 따라\n예약 시간 15분 초과 후 10분 유예가 지나\n자동으로 노쇼 등록 및 할인 판매가 시작되었습니다.',
        '이제 추가로 처리하실 내용은 없습니다.'
    ],
  },
  
};

/**
 * 주문 관리 페이지 (/seller/order)
 */
export const ORDER_PANEL_CONFIG: EmptyPanelConfig = {
  info: {
    title: '현재 관리 중인 노쇼 메뉴가 없습니다.',
    description: '노쇼로 등록된 메뉴가 있으면 이곳에서 상태를 관리할 수 있어요.',
    guideTitle: '노쇼 메뉴는 이렇게 관리돼요',
    tips: [
        '예약이 노쇼로 등록되면 자동으로 노쇼 메뉴가 생성돼요.',
        '생성된 노쇼 메뉴는 이 페이지에서 수량, 할인율, 판매 시간을 수정할 수 있어요.',
        '아직 노쇼가 발생하지 않았다면, 관리할 메뉴가 표시되지 않습니다.',
    ],
  },
  success: {
    title: '노쇼 메뉴가 등록되었습니다.',
    guideTitle: '노쇼 메뉴는 이렇게 관리돼요',
    tips: [
        // 추후 자동 등록 혹은 수동 등록에 따라 문구 변경 필요
        '현재 수량, 할인율, 판매시간을 이 패널에서 수정할 수 있습니다.',
    ],
  },
};

/**
 * 노쇼 관리 페이지 (/seller/no-show)
 */
export const NOSHOW_PANEL_CONFIG: EmptyPanelConfig = {
  info: {
    title: '노쇼 주문 내역이 없습니다.',
    // description: '고객 방문 시 [노쇼 방문 완료]로 처리해 주세요.',
    guideTitle: '',
    tips: [
        '방문 완료 처리를 해야 매출과 정산이 정확하게 반영됩니다.',
    ],
  },
  warning: {
    title: '노쇼 주문이 완료된 내역이 있습니다.',
    description: '고객 방문 시 [노쇼 방문 완료]로 처리해 주세요.',
    guideTitle: '',
    tips: [
        '방문 완료 처리를 해야 매출과 정산이 정확하게 반영됩니다.',
    ],
  },
  success: {
    title: '노쇼 주문 방문이 완료되었습니다.',
    guideTitle: '',
    tips: [
        '이 주문은 정상적으로 처리되었으며,\n매출과 정산에 반영됩니다.',
    ],
  },
  
};
