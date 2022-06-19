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
    await navigator.clipboard.writeText(text);
    onSuccess?.();
  } catch (error) {
    console.log(error);
    onFail?.();
  }
};
