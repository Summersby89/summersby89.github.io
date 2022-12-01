"use strict";

var burger = document.querySelector('.header__burger');
var burgerMenu = document.querySelector('.header__menu');
var menuLink = document.querySelectorAll('.header__bottom-nav-list-link');
var body = document.body;
burger.addEventListener('click', function () {
  burger.classList.toggle('burger-active');
  burgerMenu.classList.toggle('menu-active');
  body.classList.toggle('lock');
});
menuLink.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove('burger-active');
    burgerMenu.classList.remove('menu-active');
    body.classList.remove('lock');
  });
});
"use strict";

if (document.querySelector('.catalog')) {
  var catalogFilterCaption = document.querySelectorAll('.catalog__values-subheading');
  var catalogFilterItem = document.querySelectorAll('.catalog__filters-item');
  var catalogChoice = document.querySelector('.catalog__choice-list');
  var filtersSubtitle = document.querySelector('.catalog__filters-subheading');
  var filterBtnMore = document.querySelectorAll('.catalog__filters-btn');
  var quantity = 9;
  filterBtnMore.forEach(function (el) {
    var bntParent = el.closest('.catalog__values');
    var siblingsItem = bntParent.querySelectorAll('.catalog__filters-item');
    var hiddenItemsCount = parseInt(siblingsItem.length - quantity);
    el.textContent = "";
    el.textContent = "+ ещё " + hiddenItemsCount;
    el.addEventListener('click', function (e) {
      el.classList.toggle('catalog__filters-btn--open');

      if (el.classList.contains('catalog__filters-btn--open')) {
        el.textContent = "";
        el.textContent = "Скрыть";
        siblingsItem.forEach(function (el) {
          el.style.display = 'block';
        });
      } else {
        el.textContent = "";
        el.textContent = "+ ещё " + hiddenItemsCount;
        document.querySelectorAll(".catalog__filters-item:nth-child(n+".concat(quantity + 1, ")")).forEach(function (el) {
          el.style.display = 'none';
        });
      }
    });
  });

  if (document.documentElement.clientWidth < 1025) {
    filtersSubtitle.textContent = "";
    filtersSubtitle.textContent = "Фильтры";
    catalogFilterCaption.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.currentTarget.classList.toggle('catalog__values-subheading--open');
        e.currentTarget.closest('.catalog__values').classList.toggle('catalog__values--open');
      });
    });
  }

  var createChoiceItem = function createChoiceItem(text, dataColor) {
    return "\n      <button style=\"background: ".concat(dataColor, "\" class=\"btn-reset catalog__choice-item\" data-choice-text=\"").concat(text, "\">").concat(text, "<svg aria-hidden=\"true\">\n          <use xlink:href=\"img/sprite.svg#svg--close-choice\"></use>\n        </svg>\n      </button>\n    ");
  };

  catalogFilterItem.forEach(function (el) {
    el.querySelector('input').addEventListener('change', function () {
      var checked = el.querySelector('input').checked;

      if (checked) {
        el.querySelector('.catalog__filters-label').classList.add('custom-checkbox--active');
        var text = el.querySelector('.catalog__custom-checkbox-content').textContent;
        var dataColor = el.querySelector('.catalog__filters-label').getAttribute('data-color');
        document.querySelector('.catalog__choice-list').insertAdjacentHTML('beforeend', createChoiceItem(text, dataColor));
      } else {
        el.querySelector('.catalog__filters-label').classList.remove('custom-checkbox--active');
        var _text = el.querySelector('.catalog__filters-label').dataset.text;
        document.querySelector("[data-choice-text=\"".concat(_text, "\"]")).remove();
      }
    });
  });
  catalogChoice.addEventListener('click', function (e) {
    if (e.target.classList.contains('catalog__choice-item')) {
      e.target.remove();
      var text = e.target.textContent.trimLeft().trimRight();

      if (document.querySelector("[data-text=\"".concat(text, "\"]"))) {
        document.querySelector("[data-text=\"".concat(text, "\"]")).querySelector('input').checked = false;
        document.querySelector("[data-text=\"".concat(text, "\"]")).classList.remove('custom-checkbox--active');
      }
    }
  });
}
"use strict";

var formCheckLabel = document.querySelector('.form-checkbox');
var formCheckbox = document.querySelector('.form-field');
var formBtnSubmit = document.querySelector('.form-btn');

if (formCheckLabel) {
  formCheckLabel.addEventListener('click', function (e) {
    if (e.target.classList.contains('form-field')) {
      if (formCheckbox.checked) {
        formBtnSubmit.classList.remove('btn-disabled');
      } else {
        formBtnSubmit.classList.add('btn-disabled');
      }
    }
  });
}
"use strict";

var element = document.querySelector('.header__select');
var choices = new Choices(element, {
  searchEnabled: false,
  position: 'bottom',
  itemSelectText: ''
});

var categorySelect = function categorySelect() {
  var formElement = document.querySelector('.header__form-select');
  var formChoices = new Choices(formElement, {
    searchEnabled: false,
    // placeholder: true,
    itemSelectText: ''
  });
  var ariaLabel = element.getAttribute('aria-label');
  element.closest('.choices').setAttribute('aria-label', ariaLabel);
};

categorySelect();
"use strict";

var dropdownBtn = document.querySelectorAll('.catalog__mobile-filters-btn');
dropdownBtn.forEach(function (el, i) {
  el.addEventListener("click", function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    fnCloseAllDropdown(ev.target.nextElementSibling);
    ev.target.nextElementSibling.classList.toggle("catalog__dropdown-list-visible");
    dropdownBtn[i].classList.toggle("catalog__mobile-filters-btn-active");
  });
});
document.addEventListener("click", function (ev) {
  if (ev.target.closest(".catalog__dropdown-list-visible")) return;
  ev.stopPropagation();
  fnCloseAllDropdown();
});

function fnCloseAllDropdown(obj) {
  document.querySelectorAll(".catalog__mobile-dropdown-list").forEach(function (el, i) {
    if (el != obj) {
      el.classList.remove("catalog__dropdown-list-visible");
      dropdownBtn[i].classList.remove("catalog__mobile-filters-btn-active");
    }
  });
}
"use strict";

var formCheckLabel = document.querySelector(".form-field");
var formCheckbox = document.querySelector(".form-field");
var formBtnSubmit = document.querySelector(".form-btn");
var modalFormValidate = document.querySelector(".modal-form__form");
var mainFormValidate = document.querySelector(".main-form");

if (formCheckbox) {
  formBtnSubmit.classList.add("btn-disabled");
  formCheckLabel.addEventListener("click", function (e) {
    if (e.target.classList.contains("form-field")) {
      if (formCheckbox.checked) {
        formBtnSubmit.classList.remove("btn-disabled");
      } else {
        formBtnSubmit.classList.add("btn-disabled");
      }
    }
  });
}

if (document.body.contains(document.querySelector('input[type="tel"]'))) {
  var styles = getComputedStyle(document.documentElement);
  var selector = document.querySelector('input[type="tel"]');
  var im = new Inputmask("+7 (999) 999-9999");
  im.mask(selector);

  var validateForms = function validateForms(selector, rules, messages, successModal) {
    new window.JustValidate(selector, {
      rules: rules,
      messages: messages,
      colorWrong: "#ff6972",
      submitHandler: function submitHandler(form, values, ajax) {
        var formData = new FormData(form);
        fetch("mail.php", {
          method: "POST",
          body: formData
        }).then(function (data) {
          thanksPopup();
          form.reset();
        });
      }
    });
  };

  if (modalFormValidate) {
    validateForms(".modal-form__form", {
      name: {
        required: true,
        minLenght: 2
      },
      phone: {
        required: true,
        "function": function _function(name, value) {
          var phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      },
      email: {
        required: true,
        email: true
      }
    }, {
      name: {
        required: "Вы должны ввести имя",
        minLenght: "Ваше имя должно содержать больше 2 символов"
      },
      phone: {
        required: "Вы должны ввести телефон",
        "function": "Вы ввели не весь номер телефона"
      },
      email: {
        required: "Вы должны ввести email",
        email: "Вы должны ввести корректный email"
      }
    }, ".thanks-popup");
  }

  if (mainFormValidate) {
    validateForms(".main-form", {
      name: {
        required: true,
        minLenght: 2
      },
      phone: {
        required: true,
        "function": function _function(name, value) {
          var phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        }
      },
      email: {
        required: true,
        email: true
      }
    }, {
      name: {
        required: "Вы должны ввести имя",
        minLenght: "Ваше имя должно содержать больше 2 символов"
      },
      phone: {
        required: "Вы должны ввести телефон",
        "function": "Вы ввели не весь номер телефона"
      },
      email: {
        required: "Вы должны ввести email",
        email: "Вы должны ввести корректный email"
      }
    }, ".main-popup");
  }
}

var flag = false;

var fadeIn = function fadeIn(el, timeout, display) {
  el.style.opacity = 0;
  el.style.display = display || 'block';
  el.style.transition = "opacity ".concat(timeout, "ms");
  setTimeout(function () {
    el.style.opacity = 1;
  }, 10);
};

var fadeOut = function fadeOut(el, timeout) {
  el.style.opacity = 1;
  el.style.transition = "opacity ".concat(timeout, "ms");
  el.style.opacity = 0;
  setTimeout(function () {
    el.style.display = 'none';
  }, timeout);
};

function thanksPopup() {
  if (modalFormValidate) {
    var popup = document.querySelector('.thanks-popup');
    var modalContent = document.querySelector('.modal-form__form');
    fadeIn(popup, 2000, 'flex');
    modalContent.style.display = 'none';
  }

  if (mainFormValidate) {
    var _popup = document.querySelector('.main-popup');

    fadeIn(_popup, 2000, 'flex');
    setTimeout(function () {
      fadeOut(_popup, 2000);
    }, 2000);
  }
}
"use strict";

var modal = new Modal({
  isOpen: function isOpen(modal) {
    if (modal.modalContainer.classList.contains('modal-form')) {
      var popup = document.querySelector('.thanks-popup');
      var modalContent = document.querySelector('.modal-form__form');
      modalContent.style.display = 'block';
      popup.style.display = 'none';
    }

    if (modal.modalContainer.classList.contains('modal-gallery')) {
      var sliderThumbs = new Swiper('.modal__thumbs-slider', {
        slideClass: 'modal__thumbs-slide',
        spaceBetween: 10,
        direction: 'horizontal',
        navigation: {
          nextEl: '.modal__thumbs-btn-next',
          prevEl: '.modal__thumbs-btn-prev'
        },
        freeMode: true,
        breakpoints: {
          1440: {
            slidesPerView: 4
          },
          1320: {
            slidesPerView: 4,
            spaceBetween: 78
          },
          595: {
            slidesPerView: 2,
            spaceBetween: 78
          },
          320: {
            slidesPerView: 1
          }
        }
      });
      var sliderImages = new Swiper('.modal__slider', {
        slideClass: 'modal__slider-item',
        slidesPerView: 1,
        initialSlide: 4,
        spaceBetween: 10,
        mousewheel: true,
        navigation: {
          nextEl: '.modal__thumbs-btn-next',
          prevEl: '.modal__thumbs-btn-prev'
        },
        grabCursor: true,
        thumbs: {
          swiper: sliderThumbs
        }
      });
    }
  },
  isClose: function isClose() {}
});
"use strict";

if (document.querySelector('.catalog')) {
  createPagination();
}

function createPagination() {
  var paginationCount = 18;
  var quantityPag = "";

  if (document.documentElement.clientWidth < 1024) {
    quantityPag = 6;
  } else {
    quantityPag = 9;
  }

  var calcPage = Math.ceil(paginationCount / quantityPag);
  var pagination = document.querySelector(".pagination");
  var pageItem = "";

  for (var i = 0; i < calcPage; i++) {
    pageItem += "\n      <li class=\"pagination__item\">\n        <a data-page=\"".concat(i * quantityPag, "\"  id=\"page").concat(i + 1, "\" href=\"#\" class=\"pagination__link pagination__link\">").concat(i + 1, "</a>\n      </li>\n    ");
  }

  pagination.innerHTML = pageItem;
  var catalogCard = document.querySelectorAll(".catalog__content-list-item");

  for (var _i = 0; _i < catalogCard.length; _i++) {
    if (_i < quantityPag) {
      catalogCard[_i].style.display = "block";
    }
  }

  var currentPage = document.getElementById("page1");
  currentPage.classList.add("pagination__link--current");
  pagination.addEventListener('click', function (event) {
    event.preventDefault();
    var e = event || window.event;
    var target = e.target;
    var targetId = target.id;
    var dataPage = +target.dataset.page;
    currentPage.classList.remove("pagination__link--current");
    currentPage = document.getElementById(targetId);
    currentPage.classList.add("pagination__link--current");
    var cardToShow = 0;

    for (var _i2 = 0; _i2 < catalogCard.length; _i2++) {
      var dataCard = catalogCard[_i2].dataset.num;
      if (dataCard <= dataPage || dataCard >= dataPage) catalogCard[_i2].style.display = "none";
    }

    for (var _i3 = dataPage; _i3 < catalogCard.length; _i3++) {
      if (cardToShow >= quantityPag) break;
      catalogCard[_i3].style.display = "block";
      cardToShow++;
    }
  });
}
"use strict";

var rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  var createRangeChoiceItem = function createRangeChoiceItem(item) {
    var text = "До " + item.value;
    var dataColor = item.getAttribute('data-color');
    document.querySelector('.catalog-choice__list').insertAdjacentHTML('beforeend', createChoiceItem(text, dataColor));
  };

  noUiSlider.create(rangeSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    range: {
      'min': [0],
      'max': [225000]
    }
  });
  var input0 = document.getElementById('input-0');
  var input1 = document.getElementById('input-1');
  var inputs = [input0, input1];
  var connect = document.querySelector('.noUi-connect');
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });
  rangeSlider.noUiSlider.on('slide', function () {
    connect.style.background = '#7033ac';
  });
  rangeSlider.noUiSlider.on('end', function () {
    connect.style.background = '#a65cf0';
  });

  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
  rangeSlider.noUiSlider.on('change', function () {
    createRangeChoiceItem(input1);
  });
  input1.addEventListener('change', function (el) {
    createRangeChoiceItem(input1);
  });
}
"use strict";

var sectionPopular = document.querySelector('.popular');

if (sectionPopular) {
  var popularList = document.querySelector('.popular__list');
  var popularBtnMore = document.querySelector('.popular__more-btn');
  var maxItems;

  if (window.innerWidth > 1025) {
    maxItems = 8;
  } else {
    maxItems = 6;
  }

  var showMorePopular = function showMorePopular() {
    var popularItemsLenght = popularList.children.length;

    if (popularItemsLenght > maxItems) {
      document.querySelectorAll(".popular__list-item:nth-child(n+".concat(maxItems + 1, ")")).forEach(function (el) {
        el.style.display = 'none';
      });
    }

    popularBtnMore.addEventListener('click', function () {
      document.querySelectorAll('.popular__list-item').forEach(function (el) {
        el.style.display = 'block';
      });
      popularBtnMore.style.display = 'none';
    });
  };

  showMorePopular();
}

;
"use strict";

// slider hero
var heroSlider = new Swiper('.hero__slider', {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function renderBullet() {
      return "\n      <span class=\"swiper-pagination-bullet\" aria-label=\"\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0441\u043B\u0430\u0439\u0434\">\n        <svg class=\"pagination-progress\" viewbox=\"-2 -2 20 20\">\n          <circle class=\"pagination-progress__background\" r=\"7\" cx=\"7\" cy=\"7\" fill=\"none\" />\n          <circle class=\"pagination-progress__circle\" r=\"7\" cx=\"7\" cy=\"7\" fill=\"none\"/>\n         </svg>\n      </span>\n\t\t";
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false
  },
  autoplay: {
    delay: 3200,
    disableOnInteraction: false
  },
  a11y: {
    enabled: true,
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  }
}); // slider specials

var specialsSlider = new Swiper('.specials__slider', {
  spaceBetween: 32,
  navigation: {
    nextEl: '.specials__slider-btn-next',
    prevEl: '.specials__slider-btn-prev'
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
  breakpoints: {
    1320: {
      slidesPerView: 'auto',
      freeMode: false,
      slidesPerGroup: 3
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3
    },
    714: {
      slidesPerView: 2,
      slidesPerGroup: 2
    },
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  }
}); // slider useful

var usefulSlider = new Swiper('.useful__slider', {
  slidesPerView: 2,
  spaceBetween: 32,
  navigation: {
    nextEl: '.useful__btn-next',
    prevEl: '.useful__btn-prev'
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
  breakpoints: {
    1025: {
      slidesPerView: 2
    },
    880: {
      slidesPerView: 3
    },
    576: {
      slidesPerView: 2
    },
    320: {
      slidesPerView: 1
    }
  }
}); // slider similar products

var similarSlider = new Swiper('.similar-products__slider', {
  slidesPerView: 2,
  spaceBetween: 32,
  navigation: {
    nextEl: '.similar-products__btn-next',
    prevEl: '.similar-products__btn-prev'
  },
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
  breakpoints: {
    1025: {
      slidesPerView: 4
    },
    769: {
      slidesPerView: 3
    },
    520: {
      spaceBetween: 26,
      slidesPerView: 2
    },
    320: {
      spaceBetween: 21,
      slidesPerView: 2
    }
  }
}); // slider card-main

var cardSliderNav = new Swiper('.card-page__slider-nav', {
  freeMode: true,
  a11y: {
    prevSlideMessage: 'Предыдущий слайд',
    nextSlideMessage: 'Следующий слайд',
    firstSlideMessage: 'Это первый слайд',
    lastSlideMessage: 'Это последний слайд',
    paginationBulletMessage: 'Перейти к слайду {{index}}'
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    890: {
      spaceBetween: 20,
      slidesPerView: 'auto'
    },
    695: {
      slidesPerView: 'auto',
      direction: 'vertical',
      spaceBetween: 20
    },
    320: {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 5
    }
  }
});
var cardSliderMain = new Swiper('.card-page__slider-main', {
  slidesPerView: 1,
  initialSlide: 4,
  spaceBetween: 10,
  mousewheel: true,
  grabCursor: true,
  thumbs: {
    swiper: cardSliderNav
  }
});
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

if (document.querySelector('.we-glad')) {
  var _tippy;

  var tooltip = tippy('[data-tippy-content]', (_tippy = {
    animation: 'scale',
    trigger: 'click'
  }, _defineProperty(_tippy, "trigger", 'focusin'), _defineProperty(_tippy, "theme", 'sitdownpls'), _defineProperty(_tippy, "maxWidth", 250), _tippy));
}
"use strict";