// Funções 

// Função para verificar se um botão da barra de navegação foi selecionado; se estiver selecionado, adiciona um marcador ao botão.

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selecionado = urlParams.get('id');
    if (selecionado) {
        document.getElementById(selecionado).classList.add('selected');
    }

    exibiTexto();
    acionarEventosMouse();  // Chamada de função para acionar todos os elementos que usam ações com mouse
};


// Animação para exibir os elementos da section guiaUso de forma sequencial ao carregar a pagina

function fadeInElementos() {
    const elementos = document.querySelectorAll('.conteudoGuiaUso');

    for (let i = 0; i < elementos.length; i++) {
        setTimeout((index) => {
            elementos[index].style.opacity = '1';
        }, 800 * i, i);
    }
}

// Função para exibir o texto introdutorio da pagina de forma dinamica

function exibiTexto() {

    const texto = document.getElementById('textoIntroducao').textContent.trim();
    document.getElementById('textoIntroducao').textContent = '';

    let index = 0;

    function mostrarLetra() {
        if (index < texto.length) {
            document.getElementById('textoIntroducao').textContent += texto.charAt(index);
            index++;
            setTimeout(mostrarLetra, 35);
        }
    }

    mostrarLetra();
}


// Função para verificar se houve rolagem da página; se houver, fixa a barra de navegação no topo da tela usando display: fixed.

window.addEventListener('scroll', function () {
    const barraNavegacao = document.querySelector('.barraNavegacao');
    if (window.scrollY > 0) {
        barraNavegacao.classList.add('scroll');
    } else {
        barraNavegacao.classList.remove('scroll');
    }
});


// Função para verificar rolagem do scroll e aplicar efeito de rotação ao exibir o elemento especificado na tela

window.addEventListener('scroll', function () {

    function sectionVisivel(section) {
        const rect = section.getBoundingClientRect();
        return (
            rect.top >= 0 && rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Adiciona a animação de rotação, caso a section esteja sendo exibido na tela do usuario

    const section = document.querySelector('.registro');
    if (sectionVisivel(section)) {
        document.querySelector(".registro").style.animation = "voltaTela 1s ease-in-out";
    }
});

// Função para direcionar o usuário para uma determinada tela ao clicar em algum botão do site.

function acessarPagina(id) {
    if (id == 'drivers' || id == 'passengers' || id == 'about' || id == 'contact' || id == 'sobre') {
        window.location.href = "./sobre.html?id=" + id;

    } else {
        window.location.href = "./" + id + ".html"
    }
}

// Função para aplicar e remover o efeito Fade do botão responsável por levar o usuário de volta ao topo da página após a rolagem do scroll.

(function () {

    let primeiroCarregamento = true;

    window.onscroll = function () { scrollFunction() };
    function scrollFunction() {

        const botaoTopo = document.getElementById("botaoTopo");

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            botaoTopo.style.display = "block";
            botaoTopo.style.animation = "efeitoFade 0.5s forwards";
        } else {
            botaoTopo.style.animation = "efeitoFadeReverse 0.5s forwards";
            setTimeout(function () {
                botaoTopo.style.display = "none";
            }, 400);
        }

        if (primeiroCarregamento) {    // Roda a função fadeInElementos somente na primeira vez que o scroll é acionado
            fadeInElementos();
            primeiroCarregamento = false;
        }

    }

})();


// Função para rolar para o topo da página ao clicar no botão correspondente.

function voltarTopo() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


// Verifica o clique para abrir e exibir itens do menu de hambúrguer quando estiver em uma tela menor que 600px.

function abrirMenuHamburguer() {
    document.querySelectorAll('.menu-item').forEach(function (item) {
        item.classList.toggle('show');
    });
}

document.querySelector('.menu-Hamburguer').addEventListener('click', abrirMenuHamburguer);

// Função para exibir uma mensagem ao usuário após realizar um novo cadastro ou login.

function validar(value) {
    window.alert(value + " realizado!");
    setTimeout(function () {
        window.location.href = "./index.html";
    }, 100);
    return false;
}

// Função para verificar o idioma atual do site e exibir a outra possibilidade de idioma.

function verificaIdioma(textoBotao) {
    if (textoBotao.textContent == 'English') {
        textoBotao.textContent = 'Português';
    } else if (textoBotao.textContent == 'Português') {
        textoBotao.textContent = 'English';
    }
}

// Função para alterar o idioma do site.

function mudarIdioma(idioma) {
    if (idioma === 'pt') {
        window.location.href = "./index_pt.html";
    } else {
        window.location.href = "./index.html";
    }
}

function acionarEventosMouse() {

    // Função para verificar o idioma atual do site e exibir a outra possibilidade de idioma.

    const idiomaBotao = document.getElementById('idiomaBotao');
    idiomaBotao.addEventListener('mouseover', function () {
        const textoBotao = document.getElementById('textoBotao');
        verificaIdioma(textoBotao);
    });

    idiomaBotao.addEventListener('mouseout', function () {
        const textoBotao = document.getElementById('textoBotao');
        verificaIdioma(textoBotao);
    });


    // Aplicação de animação de pendulo no botão para retornar ao topo da pagina (hover)

    const botaoTopo = document.getElementById('botaoTopo');

    botaoTopo.addEventListener("mouseenter", function () {
        botaoTopo.style.animation = "penduloBotaoVoltar 0.5s linear infinite";
    });

    botaoTopo.addEventListener("mouseleave", function () {
        botaoTopo.style.animation = "efeitoFade 0s forwards";
    });

    // Aplicação de animação para girar a imagem debaixo do link "Here" 

    const sublinhado = document.querySelector('.sublinhado');

    sublinhado.addEventListener("mouseenter", function () {
        document.querySelector(".sublinhado img").style.animation = "rotacaoImgHere 1s linear infinite";
    });

    sublinhado.addEventListener("mouseleave", function () {
        document.querySelector(".sublinhado img").style.animation = "none";
    });

    // Aplicação de animação para criar efeito de pendulo em botões com links 

    const botoes = document.querySelectorAll('.corpoMissaoApp button, .corpoVantagensApp button');

    botoes.forEach(botao => {
        botao.addEventListener("mouseenter", function () {
            botao.style.animation = "penduloLinks 1s ease-in-out";
        });

        botao.addEventListener("mouseleave", function () {
            setTimeout(function () {
                botao.style.animation = "none";
            }, 500);
        });
    });

}