import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "../Layout/Modal";

function Harness({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        title="Confirm deletion"
      >
        <button type="button">First action</button>
        <button type="button">Second action</button>
      </Modal>
    </>
  );
}

describe("Modal", () => {
  it("renders nothing while closed", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden">
        <p>Body</p>
      </Modal>
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("exposes a dialog with an accessible name from the title", () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Confirm deletion">
        <p>Body</p>
      </Modal>
    );
    expect(
      screen.getByRole("dialog", { name: /confirm deletion/i })
    ).toHaveAttribute("aria-modal", "true");
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm deletion">
        <p>Body</p>
      </Modal>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Confirm deletion">
        <p>Body</p>
      </Modal>
    );

    await user.click(screen.getByRole("button", { name: /close/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("moves focus into the dialog when opened", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: /open modal/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("restores focus to the trigger when closed", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const trigger = screen.getByRole("button", { name: /open modal/i });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(trigger).toHaveFocus();
  });

  it("keeps Tab focus cycling within the dialog", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: /open modal/i }));

    const close = screen.getByRole("button", { name: /close/i });
    const first = screen.getByRole("button", { name: /first action/i });
    const second = screen.getByRole("button", { name: /second action/i });

    close.focus();
    await user.tab();
    expect(first).toHaveFocus();
    await user.tab();
    expect(second).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.tab({ shift: true });
    expect(second).toHaveFocus();
  });

  it("locks body scroll while open and restores it on close", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Harness />);

    expect(document.body.style.overflow).toBe("");

    await user.click(screen.getByRole("button", { name: /open modal/i }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    expect(document.body.style.overflow).toBe("");

    unmount();
  });
});
