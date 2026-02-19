// ── ConvertKit (Kit) Configuration ─────────────────
// Para configurar:
// 1. Acesse https://app.kit.com/account/edit → copie sua API Key pública
// 2. Crie um formulário em Kit → Forms → pegue o Form ID na URL (ex: /forms/7654321/edit → ID é 7654321)
// 3. Substitua os valores abaixo:
const CONVERTKIT_API_KEY = 'ACToNRKxQcIk8S6Brww_QA';
const CONVERTKIT_FORM_ID = '9067445';

async function handleSignup() {
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.querySelector('.form-wrapper button');
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    emailInput.style.borderColor = '#c0392b';
    emailInput.focus();
    setTimeout(() => {
      emailInput.style.borderColor = '#28514D';
    }, 2000);
    return;
  }

  // Disable form while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  emailInput.disabled = true;

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
        }),
      }
    );

    if (!response.ok) throw new Error('Erro ao cadastrar');

    window.location.href = '/confirmacao';
  } catch (err) {
    console.error('ConvertKit error:', err);
    emailInput.style.borderColor = '#c0392b';
    submitBtn.textContent = 'Tente novamente';
    emailInput.disabled = false;
    submitBtn.disabled = false;
    setTimeout(() => {
      submitBtn.textContent = 'Quero receber';
      emailInput.style.borderColor = '#28514D';
    }, 3000);
  }
}

// Event listener for email input on index.html
document.addEventListener('DOMContentLoaded', function() {
  const emailInput = document.getElementById('email-input');
  if (emailInput) {
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSignup();
    });
  }

  // Story page download handler
  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn && document.querySelector('.story')) {
    downloadBtn.addEventListener('click', async () => {
      const btn = document.getElementById('download-btn');
      btn.style.display = 'none';

      const story = document.querySelector('.story');
      const canvas = await html2canvas(story, {
        width: 1080,
        height: 1920,
        scale: 1,
        useCORS: true,
        backgroundColor: '#E0DBC6',
      });

      const link = document.createElement('a');
      link.download = 'story-kevin-eger.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      btn.style.display = 'block';
    });
  }

  // Destaque page download handler
  if (downloadBtn && document.querySelector('.cover')) {
    downloadBtn.addEventListener('click', async () => {
      const btn = document.getElementById('download-btn');
      const safeZone = document.querySelector('.safe-zone');
      btn.style.display = 'none';
      safeZone.style.display = 'none';

      const cover = document.querySelector('.cover');
      const canvas = await html2canvas(cover, {
        width: 1080,
        height: 1080,
        scale: 1,
        useCORS: true,
        backgroundColor: '#E0DBC6',
      });

      const link = document.createElement('a');
      link.download = 'destaque-kevin-eger.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      btn.style.display = 'block';
      safeZone.style.display = 'block';
    });
  }
});
