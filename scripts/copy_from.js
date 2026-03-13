// name: ↓ Get VPN clipboard | description: Fetch the shared Fortinet clipboard text and copy it into your local clipboard.
const reqButton = document.getElementById("frds_clipboard_req_remote");
const textBox = document.getElementById("frds_clipboard_text");
const clearButton = document.getElementById("frds_clipboard_clear");

if (reqButton) reqButton.click();

if (textBox) {
  const initialValue = textBox.value;
  let attempts = 0;
  const maxAttempts = 10;

  const interval = setInterval(async () => {
    attempts += 1;

    if (textBox.value !== initialValue && textBox.value !== "") {
      clearInterval(interval);
      await navigator.clipboard.writeText(textBox.value);
      if (clearButton) clearButton.click();
      return;
    }

    if (attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 700);
}
