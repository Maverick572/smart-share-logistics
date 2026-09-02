import { useEffect, useState } from "react";
import { Button, Modal } from "./ui-kit";

export type BookingDetails = {
  provider: string;
  item: string;
  when: string;
  price: string;
  logistics: string;
};

type Stage = "sent" | "approved" | "confirmed";

export function BookingFlow({
  open,
  onClose,
  details,
}: {
  open: boolean;
  onClose: () => void;
  details: BookingDetails;
}) {
  const [stage, setStage] = useState<Stage>("sent");

  useEffect(() => {
    if (!open) return;
    setStage("sent");
    const t = setTimeout(() => setStage("approved"), 1400);
    return () => clearTimeout(t);
  }, [open, details.provider]);

  return (
    <Modal open={open} onClose={onClose}>
      {stage !== "confirmed" ? (
        <div>
          <span className="inline-flex rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-sky">
            Request
          </span>
          <h3 className="mt-4 font-serif text-2xl font-semibold">
            Request sent to {details.provider}.
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            {details.item} · {details.when} · {details.price}
          </p>

          <div className="mt-6 rounded-xl border border-line bg-mist/60 p-4">
            {stage === "sent" ? (
              <p className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="size-2 animate-pulse rounded-full bg-amber" />
                Awaiting provider approval…
              </p>
            ) : (
              <div className="fade-up">
                <p className="text-sm font-semibold text-pine">
                  {details.provider} responded
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Stock and slot confirmed on their side. Accept to lock the booking.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="pine"
              className="flex-1"
              disabled={stage !== "approved"}
              onClick={() => setStage("confirmed")}
            >
              Accept
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="fade-up">
          <span className="inline-flex rounded-full bg-pine-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-pine">
            Confirmed
          </span>
          <h3 className="mt-4 font-serif text-2xl font-semibold">Booking Confirmed</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-muted">Resource</dt>
              <dd className="font-medium">{details.item}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Provider</dt>
              <dd className="font-medium">{details.provider}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Schedule</dt>
              <dd className="font-medium">{details.when}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Price</dt>
              <dd className="font-medium">{details.price}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-muted">Logistics</dt>
              <dd className="font-medium">{details.logistics}</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-center justify-between rounded-xl bg-pine-soft p-4">
            <span className="text-sm text-ink-muted">Status</span>
            <span className="rounded-full bg-pine px-3 py-1 text-xs font-semibold text-white">
              Confirmed
            </span>
          </div>
          <Button variant="primary" className="mt-6 w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      )}
    </Modal>
  );
}
