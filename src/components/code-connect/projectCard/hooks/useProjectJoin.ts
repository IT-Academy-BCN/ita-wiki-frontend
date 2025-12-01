import { useState } from "react";
import type { PendingSlot } from "../types/projectTypes";
import { joinProject } from "../../../../api/endPointJoinProject";

export function useProjectJoin(projectId: number) {
  const [pendingSlots, setPendingSlots] = useState<PendingSlot[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<PendingSlot | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (slot: PendingSlot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const handleConfirmJoin = async () => {
    if (!selectedSlot) return;
    setIsSubmitting(true);
    try {
      await joinProject(projectId, selectedSlot.role);
      setPendingSlots((prev) => {
        if (
          prev.some(
            (p) =>
              p.area === selectedSlot.area && p.index === selectedSlot.index,
          )
        ) {
          return prev;
        }
        return [...prev, selectedSlot];
      });
      setModalOpen(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error joining project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSlotPending = (area: "frontend" | "backend", index: number) =>
    pendingSlots.some((slot) => slot.area === area && slot.index === index);

  return {
    pendingSlots,
    modalOpen,
    selectedSlot,
    isSubmitting,
    handleOpenModal,
    handleConfirmJoin,
    isSlotPending,
    setModalOpen,
  };
}
