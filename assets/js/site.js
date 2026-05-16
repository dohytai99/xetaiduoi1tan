(function () {
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");
  if (!toggle || !panel) return;

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!panel.classList.contains("is-open"));
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", function (e) {
    if (e.matches) setOpen(false);
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  // Animations on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('fade-in')) {
          entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        }
        if (entry.target.classList.contains('slide-up')) {
          entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    el.style.opacity = '0'; // Initial state before animation
    el.style.animation = 'none'; // Prevent playing immediately
    observer.observe(el);
  });

  // Check form logic

  const form = document.getElementById('check-form');
  const resultBox = document.getElementById('result-box');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');

  if (form && resultBox && resultTitle && resultMessage) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const type = document.getElementById('vehicle-type').value;
      const weight = parseInt(document.getElementById('vehicle-weight').value, 10);
      
      if (isNaN(weight) || weight <= 0) {
        alert('Vui lòng nhập khối lượng hợp lệ.');
        return;
      }

      resultBox.style.display = 'block';
      resultBox.style.opacity = '0';
      setTimeout(() => resultBox.style.opacity = '1', 10);
      resultBox.style.transition = 'opacity 0.3s ease';

      let isBanned = false;
      let msg = '';

      if (type === 'truck') {
        if (weight >= 1000) {
          isBanned = true;
          msg = `Xe tải thùng có khối lượng chuyên chở <strong>${weight}kg</strong> (≥ 1000kg) sẽ <strong>bị cấm</strong> vào nội đô TP.HCM từ 6h-22h theo dự thảo mới.`;
          resultBox.className = 'result-premium banned';
          resultTitle.className = 'result-title banned';
        } else {
          msg = `Xe tải thùng có khối lượng chuyên chở <strong>${weight}kg</strong> (< 1000kg) <strong>được phép</strong> lưu thông vào nội đô bình thường. Tuy nhiên cần chú ý các biển báo cấm tải trên từng tuyến đường cụ thể.`;
          resultBox.className = 'result-premium allowed';
          resultTitle.className = 'result-title allowed';
        }
      } else if (type === 'van' || type === 'pickup') {
        if (weight >= 950) {
          isBanned = true;
          msg = `Xe Van/Bán tải có khối lượng chuyên chở <strong>${weight}kg</strong> (≥ 950kg) được xem như xe tải và sẽ <strong>bị cấm</strong> vào nội đô từ 6h-22h.`;
          resultBox.className = 'result-premium banned';
          resultTitle.className = 'result-title banned';
        } else {
          msg = `Xe Van/Bán tải có khối lượng chuyên chở <strong>${weight}kg</strong> (< 950kg) được xem như xe con, <strong>được phép</strong> vào phố 24/24h.`;
          resultBox.className = 'result-premium allowed';
          resultTitle.className = 'result-title allowed';
        }
      }

      resultMessage.innerHTML = msg;
      resultTitle.innerHTML = isBanned 
        ? '<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Hạn chế lưu thông' 
        : '<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Được phép lưu thông';
    });
  }
});
