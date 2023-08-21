import { Toast, toaster } from "@kobalte/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "~/components";

export const showToast = (title: string, msg: string) => {
  toaster.show((props) => (
    <Toast.Root
      class="flex flex-col items-center justify-between gap-2 border rounded-md p-3 bg-white shadow"
      toastId={props.toastId}
    >
      <div class="flex items-start w-full">
        <div>
          <Toast.Title class="font-semibold">
            {title}
          </Toast.Title>
          <Toast.Description class="text-xs">
            {msg}
          </Toast.Description>
        </div>
        <Toast.CloseButton class="flex-shrink-0 h-4 w-4 ml-auto text-pink-600">
          <Icon name={faXmark} />
        </Toast.CloseButton>
      </div>
      <Toast.ProgressTrack class="h-2 w-full bg-pink-100 rounded-sm">
        <Toast.ProgressFill class="bg-pink-200 rounded-sm h-full w-[var(--kb-toast-progress-fill-width)]" />
      </Toast.ProgressTrack>
    </Toast.Root>
  ));
};
