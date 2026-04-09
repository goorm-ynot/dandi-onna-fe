'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Minus, Package, Package2, Plus, Search, X } from 'lucide-react';
import { FieldLabel } from './FieldLabel';
import { MenuImageBox } from './MenuImageBox';
import {
  createEmptyMenuForm,
  formatPrice,
  MenuFormState,
  parsePriceValue,
  SET_ITEM_LIBRARY,
  toPriceInputValue,
} from './menuTypes';

interface MenuCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDraft: MenuFormState | null;
  onSaveDraft: (form: MenuFormState) => void;
  onSaveMenu: (form: MenuFormState) => void;
}

export function MenuCreateDialog({
  open,
  onOpenChange,
  initialDraft,
  onSaveDraft,
  onSaveMenu,
}: MenuCreateDialogProps) {
  const [form, setForm] = useState<MenuFormState>(createEmptyMenuForm());
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if (open) {
      setForm(
        initialDraft
          ? {
              ...initialDraft,
              setItems: initialDraft.setItems.map((item) => ({ ...item })),
            }
          : createEmptyMenuForm()
      );
      setSearchKeyword('');
    }
  }, [open, initialDraft]);

  const filteredSetOptions = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      return [];
    }

    return SET_ITEM_LIBRARY.filter(
      (item) => item.toLowerCase().includes(keyword) && !form.setItems.some((setItem) => setItem.name === item)
    ).slice(0, 4);
  }, [form.setItems, searchKeyword]);

  const isFormValid =
    form.name.trim().length > 0 &&
    parsePriceValue(form.price) > 0 &&
    form.description.trim().length > 0 &&
    (form.category === 'single' || form.setItems.length > 0);

  const previewName = form.name.trim() || '메뉴명이 여기에 보여요';
  const previewDescription = form.description.trim() || '메뉴 설명을 입력하면 이 영역에 미리보기로 반영됩니다.';
  const previewPrice = parsePriceValue(form.price) > 0 ? formatPrice(parsePriceValue(form.price)) : '가격이 여기에 보여요';

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageUrl: previewUrl }));
  };

  const addSetItem = (name: string) => {
    setForm((prev) => ({
      ...prev,
      setItems: [
        ...prev.setItems,
        {
          id: `${name}-${Date.now()}`,
          name,
          quantity: 1,
        },
      ],
    }));
    setSearchKeyword('');
  };

  const updateSetItemQuantity = (id: string, delta: number) => {
    setForm((prev) => ({
      ...prev,
      setItems: prev.setItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ),
    }));
  };

  const removeSetItem = (id: string) => {
    setForm((prev) => ({
      ...prev,
      setItems: prev.setItems.filter((item) => item.id !== id),
    }));
  };

  const handleDraftClick = () => {
    onSaveDraft({
      ...form,
      setItems: form.setItems.map((item) => ({ ...item })),
    });
    onOpenChange(false);
  };

  const handleSaveClick = () => {
    if (!isFormValid) {
      return;
    }

    onSaveMenu({
      ...form,
      setItems: form.setItems.map((item) => ({ ...item })),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[960px] gap-0 overflow-hidden rounded-[16px] border-none bg-white p-0 shadow-2'>
        <div className='flex items-center justify-between border-b border-[#F1F1F1] px-6 py-5'>
          <DialogTitle className='title5 text-[#262626]'>메뉴 등록</DialogTitle>
          <DialogClose asChild>
            <button type='button' className='rounded-full p-1 text-[#7C7C7C] transition-colors hover:bg-[#F6F6F6]'>
              <X className='icon-l' />
            </button>
          </DialogClose>
        </div>

        <div className='max-h-[78vh] overflow-y-auto px-6 py-5'>
          <div className='grid gap-6 lg:grid-cols-[1fr_260px]'>
            <div className='space-y-5'>
              <div>
                <FieldLabel title='메뉴 유형' required />
                <div className='flex gap-2'>
                  <button
                    type='button'
                    onClick={() => setForm((prev) => ({ ...prev, category: 'single' }))}
                    className={cn(
                      'body3 flex items-center gap-2 rounded-[6px] border px-4 py-[10px] transition-colors',
                      form.category === 'single'
                        ? 'border-[#5929BA] bg-[#F9F5FF] font-semibold text-[#5929BA]'
                        : 'border-[#E1E1E1] text-[#8E8E8E]'
                    )}>
                    <Package className='h-4 w-4' />
                    단품(single)
                  </button>
                  <button
                    type='button'
                    onClick={() => setForm((prev) => ({ ...prev, category: 'set' }))}
                    className={cn(
                      'body3 flex items-center gap-2 rounded-[6px] border px-4 py-[10px] transition-colors',
                      form.category === 'set'
                        ? 'border-[#5929BA] bg-[#F9F5FF] font-semibold text-[#5929BA]'
                        : 'border-[#E1E1E1] text-[#8E8E8E]'
                    )}>
                    <Package2 className='h-4 w-4' />
                    세트(set)
                  </button>
                </div>
              </div>

              <div>
                <FieldLabel title='메뉴 사진' required />
                <div className='flex items-center gap-4'>
                  <label
                    htmlFor='menu-image-upload'
                    className='flex h-[84px] w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-[10px] border border-dashed border-[#D8D8D8] bg-[#FAFAFA]'>
                    {form.imageUrl ? (
                      <img src={form.imageUrl} alt='메뉴 미리보기' className='h-full w-full object-cover' />
                    ) : (
                      <div className='flex flex-col items-center gap-1 text-[#B8B8B8]'>
                        <Package2 className='h-6 w-6' />
                        <span className='caption3'>업로드</span>
                      </div>
                    )}
                  </label>
                  <input id='menu-image-upload' type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                  <p className='caption3 text-[#A3A3A3]'>이미지를 업로드하면 미리보기에 바로 반영됩니다.</p>
                </div>
              </div>

              <div>
                <FieldLabel title='메뉴명' required />
                <Input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder='메뉴명을 입력해주세요.'
                  className='border-[#E1E1E1] text-[#262626] placeholder:text-[#B8B8B8] focus-visible:ring-[#8749FE]'
                />
              </div>

              <div>
                <FieldLabel title='메뉴 가격' required />
                <Input
                  inputMode='numeric'
                  value={form.price}
                  onChange={(event) => setForm((prev) => ({ ...prev, price: toPriceInputValue(event.target.value) }))}
                  placeholder='메뉴 가격을 입력해주세요.'
                  className='border-[#E1E1E1] text-[#262626] placeholder:text-[#B8B8B8] focus-visible:ring-[#8749FE]'
                />
              </div>

              <div>
                <FieldLabel title='메뉴 설명' optional />
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder='메뉴에 대한 설명을 적어주세요.'
                  rows={4}
                  className='body3 min-h-[110px] w-full resize-none rounded-[6px] border border-[#E1E1E1] px-3 py-2 text-[#262626] placeholder:text-[#B8B8B8] focus:outline-none focus:ring-2 focus:ring-[#8749FE]'
                />
              </div>
            </div>

            <div className='h-fit rounded-[10px] bg-[#FCFCFC] p-4'>
              <p className='body2 mb-3 text-[#262626]'>
                옆 화면 미리보기가 <span className='text-[#F05B7F]'>실시간으로 이렇게 보여요!</span>
              </p>

              <div className='rounded-[10px] border border-[#F1F1F1] bg-white p-3 shadow-4'>
                <div className='flex items-start gap-3'>
                  <div className='min-w-0 flex-1'>
                    <div className='mb-1 flex items-center gap-2'>
                      <p className='body5 truncate text-[#262626]'>{previewName}</p>
                      <span
                        className={cn(
                          'caption3 rounded-[20px] px-2 py-[2px]',
                          form.category === 'set' ? 'bg-[#F9F5FF] text-[#8749FE]' : 'bg-[#F9F9F9] text-[#4C4C4C]'
                        )}>
                        {form.category === 'set' ? '세트' : '단품'}
                      </span>
                    </div>

                    <p className='caption3 whitespace-pre-line break-words text-[#4C4C4C]'>{previewDescription}</p>

                    {form.category === 'set' && form.setItems.length > 0 && (
                      <div className='mt-2'>
                        <p className='caption3 font-semibold text-[#262626]'>세트 구성</p>
                        <p className='caption3 break-words text-[#4C4C4C]'>
                          {form.setItems.map((item) => `${item.name}(${item.quantity}개)`).join(', ')}
                        </p>
                      </div>
                    )}

                    <p className='body5 mt-2 text-[#262626]'>{previewPrice}</p>
                  </div>

                  <MenuImageBox
                    name={previewName}
                    imageUrl={form.imageUrl}
                    disabled={false}
                    className='h-[72px] w-[72px] rounded-[8px]'
                  />
                </div>
              </div>
            </div>
          </div>

          {form.category === 'set' && (
            <div className='mt-6 rounded-[10px] bg-[#FCFCFC] p-4'>
              <div className='mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-2'>
                  <Package2 className='icon-s text-[#4C4C4C]' />
                  <div>
                    <p className='body2 text-[#262626]'>세트 구성</p>
                    <p className='caption3 text-[#A3A3A3]'>세트 메뉴를 검색해 추가해주세요.</p>
                  </div>
                </div>

                <div className='relative w-full md:w-[220px]'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A3A3A3]' />
                  <Input
                    value={searchKeyword}
                    onChange={(event) => setSearchKeyword(event.target.value)}
                    placeholder='메뉴 검색'
                    className='border-[#E1E1E1] pl-9 focus-visible:ring-[#8749FE]'
                  />

                  {filteredSetOptions.length > 0 && (
                    <div className='absolute left-0 right-0 top-[44px] z-10 overflow-hidden rounded-[10px] border border-[#EAEAEA] bg-white shadow-4'>
                      {filteredSetOptions.map((item) => (
                        <button
                          key={item}
                          type='button'
                          onClick={() => addSetItem(item)}
                          className='body3 flex w-full items-center justify-between px-3 py-2 text-left text-[#262626] transition-colors hover:bg-[#F9F5FF]'>
                          <span>{item}</span>
                          <Plus className='h-4 w-4 text-[#8749FE]' />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className='overflow-hidden rounded-[10px] border border-[#F1F1F1] bg-white'>
                <div className='grid grid-cols-[56px_1fr_140px_40px] border-b border-[#F4F4F4] bg-[#FCFCFC] px-4 py-3'>
                  <span className='caption3 text-[#8E8E8E]'>No.</span>
                  <span className='caption3 text-[#8E8E8E]'>메뉴명</span>
                  <span className='caption3 text-center text-[#8E8E8E]'>수량</span>
                  <span className='sr-only'>삭제</span>
                </div>

                {form.setItems.length === 0 ? (
                  <div className='flex items-center justify-center px-4 py-6'>
                    <p className='body3 text-[#A3A3A3]'>검색 후 추가한 세트 구성이 여기에 표시됩니다.</p>
                  </div>
                ) : (
                  form.setItems.map((item, index) => (
                    <div key={item.id} className='grid grid-cols-[56px_1fr_140px_40px] items-center px-4 py-3'>
                      <span className='caption3 text-[#8E8E8E]'>{index + 1}</span>
                      <span className='body3 text-[#262626]'>{item.name}</span>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          type='button'
                          onClick={() => updateSetItemQuantity(item.id, -1)}
                          className='flex h-[24px] w-[24px] items-center justify-center rounded-[6px] border border-[#C6C6C6] text-[#8749FE]'>
                          <Minus className='h-3 w-3' />
                        </button>
                        <span className='body3 min-w-4 text-center text-[#262626]'>{item.quantity}</span>
                        <button
                          type='button'
                          onClick={() => updateSetItemQuantity(item.id, 1)}
                          className='flex h-[24px] w-[24px] items-center justify-center rounded-[6px] border border-[#C6C6C6] text-[#8749FE]'>
                          <Plus className='h-3 w-3' />
                        </button>
                      </div>
                      <button
                        type='button'
                        onClick={() => removeSetItem(item.id)}
                        className='ml-auto rounded-full p-1 text-[#B8B8B8] transition-colors hover:bg-[#F6F6F6] hover:text-[#4C4C4C]'>
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='border-t border-[#F1F1F1] px-6 py-4 sm:justify-end sm:space-x-2'>
          {form.category === 'set' ? (
            <Button type='button' variant='outline' className='body3 h-[38px] min-w-[92px]' onClick={handleDraftClick}>
              임시저장
            </Button>
          ) : (
            <Button type='button' variant='outline' className='body3 h-[38px] min-w-[92px]' onClick={() => onOpenChange(false)}>
              취소
            </Button>
          )}

          <Button
            type='button'
            onClick={handleSaveClick}
            disabled={!isFormValid}
            className='body5 h-[38px] min-w-[92px] rounded-[6px] bg-[#8749FE] text-white hover:bg-[#7A3EF0]'>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
