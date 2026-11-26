# Portfólio de Yasmin Beviláqua

Site pessoal de Yasmin Beviláqua, desenvolvedora Front-End. O portfólio reúne apresentação, tecnologias, experiência, projetos e formas de contato.

## Tecnologias

- React e Vite
- Three.js com React Three Fiber e Drei
- Lucide React

## Executar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

## Publicar no GitHub Pages

1. Envie as alterações para a branch padrão do repositório.
2. No GitHub, abra **Settings → Pages** e selecione **GitHub Actions** em **Build and deployment → Source**.
3. Acompanhe a execução de **Deploy portfolio to GitHub Pages** na aba **Actions**. Quando terminar, o link do site aparecerá no ambiente `github-pages` da execução.

O workflow gera o build do Vite e publica o conteúdo de `dist`. A configuração ajusta automaticamente os caminhos para o nome do repositório, evitando que os arquivos da página retornem 404 no GitHub Pages.
