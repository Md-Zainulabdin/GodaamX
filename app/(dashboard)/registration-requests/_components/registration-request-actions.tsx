"use client";

import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  requestId: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
};

export function RegistrationRequestActions({
  requestId,
  onApprove,
  onReject,
  isApproving = false,
  isRejecting = false,
}: Props) {
  const [confirmType, setConfirmType] = useState<"approve" | "reject" | null>(null);

  const handleApprove = () => {
    onApprove(requestId);
    setConfirmType(null);
  };

  const handleReject = () => {
    onReject(requestId);
    setConfirmType(null);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
          disabled={isApproving || isRejecting}
          onClick={() => setConfirmType("approve")}
        >
          {isApproving && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isApproving ? "Approving..." : <CheckCircle className="mr-2 size-4" />}
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          disabled={isApproving || isRejecting}
          onClick={() => setConfirmType("reject")}
        >
          {isRejecting && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isRejecting ? "Rejecting..." : <XCircle className="mr-2 size-4" />}
          Reject
        </Button>
      </div>

      <AlertDialog open={confirmType !== null} onOpenChange={(open) => !open && setConfirmType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmType === "approve" ? "Approve Registration?" : "Reject Registration?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmType === "approve"
                ? "This user will be approved and can now log in to the system."
                : "This user will be rejected and will need to reapply."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={confirmType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              disabled={isApproving || isRejecting}
              onClick={confirmType === "approve" ? handleApprove : handleReject}
            >
              {confirmType === "approve"
                ? isApproving
                  ? "Approving..."
                  : "Approve"
                : isRejecting
                  ? "Rejecting..."
                  : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
