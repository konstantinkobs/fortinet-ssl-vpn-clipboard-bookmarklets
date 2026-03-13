// name: ↓ Get VPN clipboard | description: Fetch the shared Fortinet clipboard text and copy it into your local clipboard.
const reqButton = document.getElementById("frds_clipboard_req_remote");
const toLocalButton = document.getElementById("frds_clipboard_to_local");
const textBox = document.getElementById("frds_clipboard_text");
const clearButton = document.getElementById("frds_clipboard_clear");

if (reqButton) reqButton.click();

if (textBox && toLocalButton) {
  const initialValue = textBox.value;
  const interval = setInterval(() => {
    if (textBox.value !== initialValue) {
      clearInterval(interval);
      toLocalButton.click();
      if (clearButton) clearButton.click();
    }
  }, 50);
}
