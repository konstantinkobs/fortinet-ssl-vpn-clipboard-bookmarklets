// name: ↑ Send clipboard | description: Read text from your local clipboard and push it to the shared Fortinet clipboard field.
(async () => {
  const text = await navigator.clipboard.readText();
  const input = document.getElementById("frds_clipboard_text");
  if (input) input.value = text;
  const sendBtn = document.getElementById("frds_clipboard_to_server");
  if (sendBtn) sendBtn.click();
  setTimeout(() => {
    const clearBtn = document.getElementById("frds_clipboard_clear");
    if (clearBtn) clearBtn.click();
  }, 300);
})();
