'use client';

import Pagination from '@/components/features/dashboard/ContentPagenation';
import { MenuCreateDialog } from '@/components/features/menu/MenuCreateDialog';
import { MenuImageBox } from '@/components/features/menu/MenuImageBox';
import { MenuStatusToggle } from '@/components/features/menu/MenuStatusToggle';
import {
  formatPrice,
  MenuFormState,
  MenuStatus,
  MenuTab,
  parsePriceValue,
  SellerMenuItem,
} from '@/components/features/menu/menuTypes';
import DashBoardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, Copy, Package2, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const PAGE_SIZE = 5;

const MENU_TABS: Array<{ id: MenuTab; label: string }> = [
  { id: 'all', label: '전체' },
  { id: 'single', label: '단품' },
  { id: 'set', label: '세트' },
];

export default function SellerMenuPage() {
  const [activeTab, setActiveTab] = useState<MenuTab>('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [menuItems, setMenuItems] = useState<SellerMenuItem[]>([]);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);
  const [menuDraft, setMenuDraft] = useState<MenuFormState | null>(null);

  const filteredMenus = useMemo(() => {
    if (activeTab === 'all') {
      return menuItems;
    }

    return menuItems.filter((menu) => menu.category === activeTab);
  }, [activeTab, menuItems]);

  const totalPages = Math.max(1, Math.ceil(filteredMenus.length / PAGE_SIZE));

  const pagedMenus = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    return filteredMenus.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredMenus]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (filteredMenus.length === 0) {
      setSelectedMenuId(null);
      return;
    }

    if (!selectedMenuId || !filteredMenus.some((menu) => menu.id === selectedMenuId)) {
      setSelectedMenuId(filteredMenus[0].id);
    }
  }, [filteredMenus, selectedMenuId]);

  const handleAddMenu = () => {
    setIsMenuDialogOpen(true);
  };

  const handleSaveDraft = (form: MenuFormState) => {
    setMenuDraft(form);
  };

  const handleSaveMenu = (form: MenuFormState) => {
    const newMenuId = Date.now();

    setMenuItems((prev) => [
      {
        id: newMenuId,
        name: form.name.trim(),
        category: form.category,
        description: form.description.trim(),
        price: parsePriceValue(form.price),
        status: 'ON_SALE',
        imageUrl: form.imageUrl,
        setItems: form.setItems,
      },
      ...prev,
    ]);

    setSelectedMenuId(newMenuId);
    setMenuDraft(null);
    setActiveTab('all');
    setCurrentPage(0);
  };

  const handleToggleStatus = (menuId: number, nextStatus: MenuStatus) => {
    setMenuItems((prev) => prev.map((menu) => (menu.id === menuId ? { ...menu, status: nextStatus } : menu)));
  };

  const handleDuplicateMenu = (menuId: number) => {
    setMenuItems((prev) => {
      const target = prev.find((menu) => menu.id === menuId);
      if (!target) {
        return prev;
      }

      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(target.name).catch(() => undefined);
      }

      return [
        {
          ...target,
          id: Date.now(),
          name: `${target.name} 복사본`,
        },
        ...prev,
      ];
    });

    setCurrentPage(0);
  };

  const hasAnyMenus = menuItems.length > 0;
  const isEmpty = pagedMenus.length === 0;

  return (
    <>
      <DashBoardLayout>
        <div className='flex w-full max-w-[1280px] min-w-[1200px] flex-col px-10 pb-20 pt-10'>
          <div className='mb-10 flex items-center justify-between gap-6'>
            <h1 className='title7 text-[#262626]'>메뉴 관리</h1>

            <Button
              type='button'
              onClick={handleAddMenu}
              className='h-[40px] rounded-[6px] bg-[#8749FE] px-4 py-[10px] text-white hover:bg-[#7A3EF0]'>
              <Plus className='icon-s' />
              메뉴 추가하기
            </Button>
          </div>

          <section className='rounded-[10px] bg-white px-10 py-5'>
            <div className='flex min-h-[760px] flex-col'>
              <div className='border-b border-[#E1E1E1]'>
                <div className='flex items-end'>
                  {MENU_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type='button'
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'body4 h-[44px] border-b-[3px] px-[50px] py-[10px] transition-colors',
                        activeTab === tab.id
                          ? 'border-[#5929BA] font-semibold text-[#5929BA]'
                          : 'border-transparent text-[#4C4C4C]'
                      )}>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className='mt-10 flex items-center gap-1 rounded-[10px] bg-[#F9F5FF] p-4 text-[#4C4C4C]'>
                <AlertCircle className='icon-l text-[#8749FE]' />
                <p className='body3'>메뉴 클릭 시 상세 내용을 수정할 수 있습니다.</p>
              </div>

              {isEmpty ? (
                <div className='flex flex-1 flex-col items-center justify-center gap-3 text-center'>
                  <Package2 className='h-8 w-8 text-[#BDBDBD]' />
                  <p className='body3 text-[#A3A3A3]'>
                    {hasAnyMenus ? '선택한 분류에 등록된 메뉴가 없습니다.' : '메뉴 추가하기 버튼을 눌러 메뉴를 등록해주세요'}
                  </p>
                </div>
              ) : (
                <div className='mt-5 flex-1 space-y-5'>
                  {pagedMenus.map((menu) => {
                    const isSoldOut = menu.status === 'SOLD_OUT';
                    const isSelected = selectedMenuId === menu.id;

                    return (
                      <div
                        key={menu.id}
                        role='button'
                        tabIndex={0}
                        onClick={() => setSelectedMenuId(menu.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedMenuId(menu.id);
                          }
                        }}
                        className={cn(
                          'flex w-full cursor-pointer items-center justify-between gap-6 rounded-[16px] border border-[#F6F6F6] bg-white p-6 text-left shadow-4 transition-all',
                          isSelected && 'border-[#8749FE] ring-1 ring-[#8749FE]'
                        )}>
                        <div className='flex min-w-0 items-center gap-4'>
                          <MenuImageBox name={menu.name} imageUrl={menu.imageUrl} disabled={isSoldOut} />

                          <div className='min-w-0'>
                            <div className='mb-[6px] flex items-center gap-2'>
                              <p className={cn('body8 truncate', isSoldOut ? 'text-[#C6C6C6]' : 'text-[#262626]')}>
                                {menu.name}
                              </p>
                              <span
                                className={cn(
                                  'caption3 rounded-[20px] px-3 py-1',
                                  menu.category === 'set' ? 'bg-[#F9F5FF] text-[#8749FE]' : 'bg-[#F9F9F9] text-[#4C4C4C]'
                                )}>
                                {menu.category === 'set' ? '세트' : '단품'}
                              </span>
                            </div>

                            <p className={cn('body3 break-keep text-left', isSoldOut ? 'text-[#C6C6C6]' : 'text-[#4C4C4C]')}>
                              {menu.description}
                            </p>
                            <p className={cn('body5 mt-[6px]', isSoldOut ? 'text-[#C6C6C6]' : 'text-[#262626]')}>
                              {formatPrice(menu.price)}
                            </p>
                          </div>
                        </div>

                        <div className='flex shrink-0 items-center gap-[10px]' onClick={(event) => event.stopPropagation()}>
                          <MenuStatusToggle status={menu.status} onChange={(nextStatus) => handleToggleStatus(menu.id, nextStatus)} />

                          <button
                            type='button'
                            onClick={() => handleDuplicateMenu(menu.id)}
                            className='rounded-[6px] border border-[#C6C6C6] p-[7px] transition-colors hover:bg-[#F9F9F9]'
                            aria-label={`${menu.name} 복제`}>
                            <Copy className='icon-l text-[#4C4C4C]' />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} className='py-0 pt-5' />
            </div>
          </section>
        </div>
      </DashBoardLayout>

      <MenuCreateDialog
        open={isMenuDialogOpen}
        onOpenChange={setIsMenuDialogOpen}
        initialDraft={menuDraft}
        onSaveDraft={handleSaveDraft}
        onSaveMenu={handleSaveMenu}
      />
    </>
  );
}
