(function() {
    // Link de pagamento padrão (altere aqui)
    const linkPagamento = 'https://pay.kirvano.com/569c78c9-3f36-43d8-b0f4-75a8276827a4'; 

    function setButtonLink(btnId) {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.href = btn.getAttribute('data-payment-link') || linkPagamento;
      }
    }

    setButtonLink('buyHero');
    setButtonLink('buyBenefits');
    setButtonLink('buyFinal');
  })();

  