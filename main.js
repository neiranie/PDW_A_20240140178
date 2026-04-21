// =============================================
// TBHK THEME — main.js
// =============================================

// ---- Tab Switcher (Profile Card) ----
function switchTab(event, tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

  // Activate selected
  event.currentTarget.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');

  // Re-trigger stat bar animations if switching to stats tab
  if (tabId === 'tab-stats') {
    document.querySelectorAll('.stat-bar-fill').forEach(bar => {
      bar.style.animation = 'none';
      bar.offsetHeight; // reflow
      bar.style.animation = '';
    });
  }
}

// ---- Form Submit Handler ----
function handleSubmit() {
  const name     = document.getElementById('name')?.value.trim();
  const email    = document.getElementById('email')?.value.trim();
  const year     = document.getElementById('year')?.value;
  const wish     = document.getElementById('wish')?.value.trim();
  const mystery  = document.querySelector('input[name="mystery"]:checked');
  const interests = document.querySelectorAll('input[name="interest"]:checked');

  // Validation
  if (!name) { showToast('⚠ Please enter your name.', true); return; }
  if (!email || !email.includes('@')) { showToast('⚠ Enter a valid email.', true); return; }
  if (!year) { showToast('⚠ Select your school year.', true); return; }
  if (!mystery) { showToast('⚠ Choose a favorite mystery.', true); return; }
  if (interests.length === 0) { showToast('⚠ Select at least one interest.', true); return; }
  if (!wish) { showToast('⚠ State your wish to Hanako-kun.', true); return; }

  // Success
  showToast(`✦ Contract bound, ${name}! Your wish has been heard.`);

  // Optional: log to console
  console.log('Contract submitted:', {
    name, email, year, wish,
    mystery: mystery.value,
    interests: Array.from(interests).map(i => i.value)
  });
}

// ---- Toast Utility ----
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toast-msg');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.style.borderColor = isError ? 'var(--sky)' : 'var(--gold)';
  toast.style.color        = isError ? 'var(--sky)' : 'var(--gold)';

  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ---- Scroll-based navbar shrink ----
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.style.padding = '10px 40px';
  } else {
    navbar.style.padding = '14px 40px';
  }
});