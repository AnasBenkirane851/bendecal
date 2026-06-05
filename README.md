# Bendecal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

```bash
npm run build:prod
```

Les artefacts sont générés dans `dist/bendecal/browser/`.

## Déploiement Cloudflare Pages

### Prérequis

- Repo GitHub connecté à Cloudflare Pages
- API prod : `https://api.bendecal.com/api/v1`
- CDN images : `https://cdn.bendecal.com`
- Domaine cible : `https://bendecal.com`

### Paramètres du projet Cloudflare Pages

| Paramètre | Valeur |
|-----------|--------|
| Framework preset | None (ou Angular) |
| Root directory | *(vide — racine du repo)* |
| Build command | `npm ci && npm run build:prod` |
| Build output directory | `dist/bendecal/browser` |
| Node.js version | 20 (recommandé) |

### Connecter le repo GitHub

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Sélectionner le repo `bendecal` (ou le monorepo contenant ce dossier)
3. Si le shop est dans un sous-dossier du monorepo, renseigner **Root directory** : `bendecal`
4. Renseigner les paramètres du tableau ci-dessus
5. **Environment variables** : aucune variable requise (URLs prod dans `src/environments/environment.prod.ts`)
6. **Save and Deploy**

### Domaine custom

1. Projet Pages → **Custom domains** → **Set up a custom domain**
2. Ajouter `bendecal.com` et `www.bendecal.com`
3. Cloudflare configure les enregistrements DNS si le domaine est déjà sur le même compte
4. Activer **Always Use HTTPS** et la redirection `www` → apex (ou l’inverse selon votre préférence)

### Routing SPA

Le fichier `public/_redirects` est copié dans le build et redirige toutes les routes vers `index.html` (statut 200), requis pour le routing Angular côté client.

### Vérification locale

```bash
npm ci
npm run build:prod
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
