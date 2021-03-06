# Guia de estilos para projetos web - Unimed

Esse Guia de estilos tem como objetivo unificar o CSS de todos os projetos web da Unimed.  

## Índice
 - [Site estático: Hexo](#site-estatico-hexo)
 - [Preprocessador: Sass](#preprocessador-sass)
 - [Árvore de arquivos](#Árvore-de-arquivos)
 - [Convenção de nomenclatura de classes: BEM](#convenção-de-nomenclatura-de-classes-bem)
 - [Tipografia](#tipografia)
 - [Cores](#cores)

## Site estático: Hexo
O site do guia de estilos foi criado com [Hexo](https://hexo.io/).  
O primeiro passo é instalar o Hexo, para isso entre no diretorio `style-guide` e utilize o comando `npm run install:hexo`.

Depois disso para iniciar os projetos, é necessario abrir o terminal dentro da pasta `/style-guide`, utilize o comando `npm run start` para rodar o Hexo, ele irá executar os comandos `hexo clean` e `hexo serve` automaticamente.

## Preprocessador: Sass
O CSS desse projeto foi criado utilizando o pré-processador Sass.  

O primeiro passo é checar se o Sass está instalado na sua máquina com o comando `_sass --version_`, estando instalado seguir para o próximo passo. Não instalado [visitar essa pagina](https://sass-lang.com/install) e instalar ele ou utilizar o comando `npm run install:sass` dentro do diretorio `style-guide`.  

### Comando para deixar o Sass atualizar o style.css automaticamente
No terminal, chegue até o diretório raiz do repositório e use o seguinte comando:  
~~~
sass --watch style-guide/source/css/main.scss:style-guide/source/css/style.css --style compressed
~~~
Ou utilize o comando `npm run sass`

## Árvore de arquivos
Os arquivos CSS estão divididos da seguinte forma:  


CSS  
 |  
 |-- base  
 |-- components  
 |-- layout  
 |-- typography  
 |  
 | main.scss  
 | style.css  

### Main e Style
O arquivo main.scss importa todos os outros arquivos do estilo. Já o style.css é o arquivo final gerado para ser aplicado nos sites.

### Base
Ficam aqui os arquivos básicos estruturais. São eles:  
 - As famílias de fonte;
 - O normalize (reset) de CSS para deixar todos os navegadores com o mesmo estilo;
 - Os estilos universais, aplicados diretamente no html e no body;
 - As utilities, ou seja classes de ajuda com usos simples, como `display: none` por exemplo;
 - As variáveis globais, utilizadas por todas as outras folhas de estilo;
 - As constantes de cor da Unimed.
  
### Components
Aqui ficam os componentes (como botões por exemplo), tanto de classes como também semanticos de HTML (form/input...).
  
### Layout
A base do layout do Framework. Ficam aqui os arquivos que montam a tipografia e o sistema de grid/apresentação.

### Typography
Aqui ficam os arquivos de web fonts das fontes Unimed usadas na folha de estilo.

## Convenção de nomenclatura de classes: BEM
A sigla BEM vem do inglês **Block, Element, Modifier**, ou seja Bloco, Elemento e Modificador.  

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

## Tipografia
A fonte base do framework é a Unimed Sans no **tamanho base de 18px**. O tamanho de 18px pode ser dividido por 4 e chegar no resultado de **4,5px - a unidade mínima do projeto**, que pode ser acessada pela variável `$unit`.  

São levadas em conta no layout as larguras mínimas / ideais / máximas de coluna de texto apresentadas por James Craig em seu livro [Designing with Type](https://www.amazon.com/Designing-Type-5th-Essential-Typography/dp/0823014134).  
 - Largura mínima: **45 caracteres**;
 - Largura ideal: **65 caracteres**;
 - Largura máxima: **75 caracteres**.  

O cálculo para chegar na coluna ideal  é a largura do alfabeto completo *2,5. Ou seja, se escreve o alfabeto por extenso na fonte e no tamanho desejado para o texto final, se mede em Pixels a largura e multiplica por 2,5.  

Para encontrar a largura mínima tire 30% do resultado da largura ideal; para a máxima, acrescente 15%.  

### Largura das colunas de texto
 - Largura do alfabeto na Unimed Sans 18px: **303,5px**
 - Largura ideal da coluna de texto: **758.75px** ou seja, 168.61 unidades básicas de layout, arredondado para **170 unidades básicas**. Para acessar essa largura no projeto utiliza a variável `$ideal-text-column`.
 - Largura mínima da coluna de texto: **531.125px** ou seja, 118.027 unidades básicas de layout, arredondado para **120 unidades básicas**. Para acessar essa largura no projeto utiliza a variável `$min-text-column`.
 - Largura máxima da coluna de texto: **872.5625px** ou seja, 193.90 unidades báscias de layout, arredondado para **195 unidades básicas**. Para acessar essa largura no projeto utiliza a variável `$max-text-column`.

## Cores
As únicas cores aceitas no projeto são as presentes na [Central da Marca da Unimed](http://www.centraldamarca.unimed.coop.br/group/central-da-marca/paleta-cores). Dentro do repositório elas se encontram em *base/variables--unimed-colors.scss*.  

### Tipos de cores
Dentro do arquivo `variables--unimed-colors` estão os:
 - Tons de cinza (Preto até branco);
 - Cor Primária (Verde Unimed);
 - Cores Secundárias.

As cores primárias e secundárias se encontram em sua versão principal, assim como também a gradação de 75% 50% 25% de saturação da cor.

#### Exemplo
~~~
$secondary-magenta: rgb(237,22,81);
$secondary-magenta-75: rgb(240,102,111);
$secondary-magenta-50: rgb(245,150,149);
$secondary-magenta-25: rgb(250,200,195);
~~~

### Contraste
Todo elemento deve seguir as [regras de contraste](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html) apresentadas pela W3C. Ou seja, devem ter um contraste mínimo de 4.5:1 para garantir acessibilidade.  

Em caso de dúvidas sobre contraste a ferramenta [Colorable](https://colorable.jxnblk.com/) é gratuíta e entrega resultados na hora avisando se passou (AA) no critério mínimo de contraste ou não.