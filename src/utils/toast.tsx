import { Toast, toaster } from "@kobalte/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "~/components";

export const showToast = (title: string, msg: string) => {
  toaster.show((props) => (
    <Toast.Root
      class="flex flex-col items-center justify-between gap-2 rounded-md border bg-white p-3 shadow"
      toastId={props.toastId}
    >
      <div class="flex w-full items-start">
        <div>
          <Toast.Title class="font-semibold">{title}</Toast.Title>
          <Toast.Description class="text-xs">{msg}</Toast.Description>
        </div>
        <Toast.CloseButton class="ml-auto h-4 w-4 flex-shrink-0 text-pink-600">
          <Icon name={faXmark} />
        </Toast.CloseButton>
      </div>
      <Toast.ProgressTrack class="h-2 w-full rounded-sm bg-pink-100">
        <Toast.ProgressFill class="h-full w-[var(--kb-toast-progress-fill-width)] rounded-sm bg-pink-200" />
      </Toast.ProgressTrack>
    </Toast.Root>
  ));
};
