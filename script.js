// Sticky header shrink
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });
}

// Desktop dropdown keyboard/touch toggle (click-to-open, in addition to hover)
document.querySelectorAll('.nav-links > li').forEach((li) => {
  const btn = li.querySelector('button');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = li.classList.contains('open');
    document.querySelectorAll('.nav-links > li.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) li.classList.add('open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-links > li.open').forEach(o => o.classList.remove('open'));
});

// Mobile nav open/close
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuClose = document.getElementById('menu-close');
function openMobileNav(){
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav(){
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}
if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
if (menuClose) menuClose.addEventListener('click', closeMobileNav);
if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
}

// Quote form -> mailto forwarding (no backend yet, opens the visitor's email client
// pre-addressed and pre-filled to acxelturton@gmail.com; they just hit send)
document.querySelectorAll('.quote-form form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => { const el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };
    const name = val('qname');
    const phone = val('qphone');
    const email = val('qemail');
    const service = val('qservice');
    const city = val('qcity');
    const details = val('qdetails');

    const subject = `Quote Request: ${service || 'General Inquiry'} - ${city || 'York Region'}`;
    const bodyLines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Service needed: ${service}`,
      `City / area: ${city}`,
      `Details: ${details}`,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:acxelturton@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});

// Mobile accordion sections (Services / Locations)
document.querySelectorAll('.acc-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.getAttribute('data-target'));
    if (!panel) return;
    panel.classList.toggle('open');
    const icon = btn.querySelector('svg');
    if (icon) icon.style.transform = panel.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
  });
});
