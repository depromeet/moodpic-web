export const copyClipboard = ({
  text,
  onSuccess,
  onFail,
}: {
  text: string;
  onSuccess?: () => void;
  onFail?: () => void;
}) => {
  try {
    const el = <HTMLTextAreaElement>document.createElement('textarea');
    document.body.appendChild(el);
    el.value = text;
    el.setSelectionRange(0, text.length);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    onSuccess?.();
  } catch (error) {
    console.log(error);
    onFail?.();
  }
};
