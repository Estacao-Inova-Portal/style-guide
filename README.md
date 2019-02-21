# Folha de estilo padrão para projetos web - Unimed

Essa folha de estilos tem como objetivo unificar o CSS de todos os projetos web da Unimed.  

## Preprocessador: Sass
O CSS desse projeto foi criado utilizando o pré-processador Sass.  
O primeiro passo é checar se o Sass está instalado na sua máquina com o comando `_sass --version_`  
Estando instalado seguir para o próximo passo. Não instalado [visitar essa pagina](https://sass-lang.com/install) e instalar ele.  

### Comando para deixar o Sass atualizar o style.css automaticamente
No terminal, chegue até o diretório css e use o seguinte comando:  
~~~
_sass --watch _main.scss:style.css --style compressed_
~~~
