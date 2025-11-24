// hooks/useSubmitDialog.ts
import { useState, useCallback } from 'react';

export function useSubmitDialog<T>() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<T | null>(null);

  const openDialog = useCallback((data: T) => {
    setPendingFormData(data);
    setIsSubmitDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsSubmitDialogOpen(false);
    setPendingFormData(null);
  }, []);

  const handleConfirm = useCallback(
    (onConfirm: (data: T) => void) => {
      if (!pendingFormData) return;
      onConfirm(pendingFormData);
      closeDialog();
    },
    [pendingFormData, closeDialog]
  );

  return {
    isSubmitDialogOpen,
    pendingFormData,
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
