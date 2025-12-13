import { useState } from "react";
import type { PendingSlot } from "../types/projectTypes";
import { joinProject } from "../../../../api/endPointJoinProject";

type PendingStatus = "pending" | "accepted" | "rejected";

type PendingSlotWithStatus = PendingSlot & {
  status: PendingStatus;
};

export function useProjectJoin(projectId: number) {
  const [pendingSlots, setPendingSlots] = useState<PendingSlotWithStatus[]>([]);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] =
    useState<PendingSlotWithStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = (slot: PendingSlot) => {
    setSelectedSlot({ ...slot, status: "pending" });
    setJoinModalOpen(true);
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
      setJoinModalOpen(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error joining project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSlotPending = (area: "frontend" | "backend", index: number) =>
    pendingSlots.some((slot) => slot.area === area && slot.index === index);

  const isSlotAccepted = (area: "frontend" | "backend", index: number) =>
    pendingSlots.some(
      (slot) =>
        slot.area === area &&
        slot.index === index &&
        slot.status === "accepted",
    );

  const getSlotStatus = (
    area: "frontend" | "backend",
    index: number,
  ): PendingStatus | null => {
    const found = pendingSlots.find(
      (slot) => slot.area === area && slot.index === index,
    );
    return found?.status ?? null;
  };

  const handleOpenDecisionModal = (
    area: "frontend" | "backend",
    index: number,
  ) => {
    const found = pendingSlots.find(
      (slot) => slot.area === area && slot.index === index,
    );
    if (!found) return;
    setSelectedSlot(found);
    setDecisionModalOpen(true);
  };

  const handleAcceptContributor = () => {
    if (!selectedSlot) return;
    setPendingSlots((prev) =>
      prev.map((slot) =>
        slot.area === selectedSlot.area && slot.index === selectedSlot.index
          ? { ...slot, status: "accepted" }
          : slot,
      ),
    );
    setDecisionModalOpen(false);
    setSelectedSlot(null);
  };

  const handleRejectContributor = () => {
    if (!selectedSlot) return;
    setPendingSlots((prev) =>
      prev.filter(
        (slot) =>
          !(
            slot.area === selectedSlot.area && slot.index === selectedSlot.index
          ),
      ),
    );
    setDecisionModalOpen(false);
    setSelectedSlot(null);
  };

  return {
    pendingSlots,
    joinModalOpen,
    decisionModalOpen,
    selectedSlot,
    isSubmitting,
    handleOpenModal,
    handleConfirmJoin,
    isSlotPending,
    isSlotAccepted,
    getSlotStatus,
    handleOpenDecisionModal,
    handleAcceptContributor,
    handleRejectContributor,
    setJoinModalOpen,
    setDecisionModalOpen,
  };
}
