# Folha de estilo padrão para projetos web - Unimed

Essa folha de estilos tem como objetivo unificar o CSS de todos os projetos web da Unimed.  

## Preprocessador: Sass
O CSS desse projeto foi criado utilizando o pré-processador Sass.  
O primeiro passo é checar se o Sass está instalado na sua máquina com o comando `_sass --version_`  
Estando instalado seguir para o próximo passo. Não instalado [visitar essa pagina](https://sass-lang.com/install) e instalar ele.  

### Comando para deixar o Sass atualizar o style.css automaticamente
No terminal, chegue até o diretório css e use o seguinte comando:  
~~~
sass --watch main.scss:style.css --style compressed
~~~

## Convenção de nomenclatura de classes: BEM
A sigla BEM vem do inglês *Block, Element, Modifier*, ou seja Bloco, Elemento e Modificador.  
Um exemplo de aplicação:
~~~
/* Block component */
.btn {}

/* Element that depends upon the block */ 
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {} 
.btn--big {}
~~~
Nessa convenção um bloco é uma abstração de alto nível de um componente, por exemplo um botão vira `.btn`. Esse bloco/abstração é um elemento pai.  
Os filhos, ou elementos, devem estar dentro de um bloco, e são diferenciados por dois underlines entre o nome do bloco e o nome do elemento, por exemplo `.btn__price`.  
Por fim, modificadores podem manipular/modificar o bloco, sendo assim podemos dar um estilo particular para um bloco sem ter que criar todo um novo componente. Para criar modificadores utilizamos dois hífens entre os nomes, por exemplo `.btn--orange`.  
Seguindo essas regras poderiamos criar um HTML como o seguinte:
~~~
<a class="btn btn--big btn--orange" href="http://css-tricks.com">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
~~~
A principal vantagem do BEM é conseguir entender o que está acontecendo no código apenas lendo o nome das classes, e não passar pelo inferno de modificar uma classe no CSS sem ter certeza de todos os elementos/partes de uma aplicação que serão modificadas.
### Sass e BEM
Para utilizar a ideia de nesting do Sass mas mesmo assim manter o código separado no resultado final você pode utilizar `@at-root`.  
Exemplo de um SCSS nessa forma:  
~~~
.block {
  @at-root #{&}__element {
  }
  @at-root #{&}--modifier {
  }
}
~~~
Que apresentaria o seguinte código CSS de resultado:
~~~
.block {
}
.block__element {
}
.block--modifier {
}
~~~
### Bibliografia BEM
 - [BEM 101](https://css-tricks.com/bem-101/)
 - [BEM: A New Front-End Methodology](https://www.smashingmagazine.com/2012/04/a-new-front-end-methodology-bem/)
 - [BEM For Beginners: Why You Need BEM](https://www.smashingmagazine.com/2018/06/bem-for-beginners/)