export const copyClipboard = async ({
  text,
  onSuccess,
  onFail,
}: {
  text: string;
  onSuccess?: () => void;
  onFail?: () => void;
}) => {
  try {
    const inputHasClipboardText = <HTMLInputElement>document.createElement('input');
    inputHasClipboardText.id = 'clipboardText';

    document.body.appendChild(inputHasClipboardText);
    if (!inputHasClipboardText) return alert(404);
    inputHasClipboardText.value = text;
    inputHasClipboardText.setSelectionRange(0, text.length);
    inputHasClipboardText.select();
    document.execCommand('copy');
    document.body.removeChild(inputHasClipboardText);

    onSuccess?.();
  } catch (error) {
    console.log(error);
    onFail?.();
  }
};
