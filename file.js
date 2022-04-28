/* SLIDE IN EFFECT*/
const scrollElements = document.querySelectorAll(".js-scroll");
const throttleCount = document.getElementById('throttle-count');

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

window.addEventListener('scroll', () => {
  throttle(handleScrollAnimation, 250);
})


/* ESTO ES PARA MEDIA QUERY DE MOVIMIENTO REDUCIDO */
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
  if (mediaQuery && !mediaQuery.matches) {
    handleScrollAnimation()
  }
});


/* PARA EL EFECTO DE CONTADOR */
addEventListener("DOMContentLoaded", () => {
    const contadores = document.querySelectorAll(".contador_cantidad");
    const velocidad = 1000;
  
    const animarContadores = () => {
      for (const contador of contadores) {
        const actualizar_contador = () => {
          let cantidad_maxima = +contador.dataset.cantidadTotal;
          let valor_actual = +contador.innerText;
          let incremento = cantidad_maxima / velocidad;
  
          if (valor_actual < cantidad_maxima) {
            contador.innerText = Math.ceil(valor_actual + incremento);
            setTimeout(actualizar_contador, 5);
          } else {
            contador.innerText = cantidad_maxima;
          }
        }
        actualizar_contador();
      }
    }
  
    const mostrarContadores = elementos => {
      elementos.forEach(elemento => {
        if (elemento.isIntersecting) {
          elemento.target.classList.add("animar");
          elemento.target.classList.remove("ocultar");
          setTimeout(animarContadores, 300);
        }
      });
    }
  
    const observer = new IntersectionObserver(mostrarContadores, {
      threshold: 0.75 //el valor va de 0 a 1 
    })
  
    const elementosHTML = document.querySelectorAll(".contador");
    elementosHTML.forEach(elementoHTML => {
      observer.observe(elementoHTML)
    })
  });

  
