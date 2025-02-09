/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  /*
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  


  /**
   * Hide mobile nav on same-page/hash links
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');
 
  if (headerToggleBtn && header) {
    function headerToggle() {
      header.classList.toggle('header-show');
      headerToggleBtn.classList.toggle('bi-list');
      headerToggleBtn.classList.toggle('bi-x');
    }
    headerToggleBtn.addEventListener('click', headerToggle);
  
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.header-show')) {
          headerToggle();
        }
      });
    });
  }











/*   الكود الجديد*/

  document.querySelectorAll('.details-link').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // يمنع الانتقال الفوري للصفحة
        const projectId = this.getAttribute('data-id'); // استخراج المعرف الفريد للمشروع
        localStorage.setItem('selectedProject', projectId); // تخزين المعرف في التخزين المحلي
        window.location.href = this.href; // الانتقال إلى صفحة التفاصيل
    });
});






















  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

window.onload = function() {
  function startShake() {
    const contactLink = document.querySelector('a[href="#contact"]');
    
    // إعادة تعيين الأنيميشن بتحديثه
    contactLink.style.animation = 'none'; 
    contactLink.offsetHeight; // هذا السطر يجعل المتصفح يعيد تحميل الأنيميشن
    contactLink.style.animation = 'shake 0.5s ease 0s 1, returnToPlace 0.5s ease 0.5s forwards'; // تطبيق الأنيميشن من جديد

    // إيقاف الأنيميشن بعد 1 ثانية (تتوافق مع مدة الاهتزاز + العودة)
    setTimeout(() => {
      contactLink.style.animation = 'none'; // إيقاف الأنيميشن بعد التوقف
    }, 1000); // 0.5 ثانية اهتزاز + 0.5 ثانية عودة للمكان
  }

  // بدء الاهتزاز بعد 3 ثوانٍ
  setTimeout(startShake, 3000); // يبدأ بعد 3 ثوانٍ من تحميل الصفحة

  // تكرار الاهتزاز بعد فترة قصيرة (2 ثانية)
  setInterval(function() {
    startShake(); // يبدأ الاهتزاز مرة أخرى
  }, 9000); // يبدأ الاهتزاز كل 2 ثوانٍ
};




/*submit-----------------*/
// الحصول على النموذج وأجزاءه
const form = document.querySelector('.php-email-form');
const submitButton = form.querySelector('button[type="submit"]');
const loadingMessage = form.querySelector('.loading');
const errorMessage = form.querySelector('.error-message');
const successMessage = form.querySelector('.sent-message');

// التعامل مع إرسال النموذج
form.addEventListener('submit', function(event) {
  event.preventDefault(); // منع إرسال النموذج بشكل تقليدي

  // إخفاء الرسائل السابقة
  loadingMessage.style.display = 'block';
  errorMessage.style.display = 'none';
  successMessage.style.display = 'none';

  // استخدام fetch لإرسال البيانات إلى Formspree
  fetch(form.action, {
    method: form.method,
    body: new FormData(form)
  })
  .then(response => {
    if (response.ok) {
      successMessage.style.display = 'block'; // عرض رسالة النجاح
      form.reset(); // إعادة تعيين النموذج
    } else {
      errorMessage.style.display = 'block'; // عرض رسالة الخطأ
    }
  })
  .catch(() => {
    errorMessage.style.display = 'block'; // عرض رسالة الخطأ عند فشل الاتصال
  })
  .finally(() => {
    loadingMessage.style.display = 'none'; // إخفاء رسالة التحميل
  });
});




document.addEventListener("DOMContentLoaded", function() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const value = bar.getAttribute('aria-valuenow');
    bar.style.width = `${value}%`;
  });
});







/*---------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", function () {
      var targetId = this.getAttribute("data-target");
      var targetElement = document.getElementById(targetId);

      console.log("Button clicked, target ID:", targetId); // Debugging line

      if (targetElement) {
        if (targetElement.style.display === "none" || targetElement.style.display === "") {
          targetElement.style.display = "block";
        } else {
          targetElement.style.display = "none";
        }
      } else {
        console.log("Error: Target element not found.");
      }
    });
  });
});
