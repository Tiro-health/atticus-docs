# Atticus Docs

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Update the docs

All docs are written in MDX which is a combination of Markdown and JSX. You can find the individual pages in the [src/app](src/app) directory.

### Navigation

The navigation structure is defined as a Javascript array called `navigation` in the [src/components/Navigation.tsx](src/components/Navigations/tsx) file.
Make sure the `href` matches a folder in the [src/app](src/app) directory.

### Documentation pages

All documentation pages are written in MDX and can be found in the [src/app](src/app) directory. Each page should have a `metadata` object at the top of the file that defines the title and description of the page. The `sections` array should list all the sections on the page.
The directory where the page is located is used as the URL path. For example, a page in [src/Patient](src/Patient) will be available at `/Patient`.

## Customizing

Customization of the design and functionality is possible by modifying the React components in the [src/components](src/components) directory.

## Global search

This template includes a global search that's powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It's available by clicking the search input or by using the `⌘K` shortcut.

This feature requires no configuration, and works out of the box by automatically scanning your documentation pages to build its index. You can adjust the search parameters by editing the `/src/mdx/search.mjs` file.

## Deployments

The site is hosted twice while we move off GitHub Pages.

[docs.tiro.health](https://docs.tiro.health) is still served by GitHub Pages, rebuilt from `main` by [.github/workflows/nextjs.yml](.github/workflows/nextjs.yml). Nothing about that has changed yet.

Vercel hosts the same site in the Tiro-health team as the [atticus-docs](https://vercel.com/tirohealth/atticus-docs) project, and production there is release-driven rather than branch-driven:

- Pushing a `v*` tag runs [.github/workflows/vercel-production.yml](.github/workflows/vercel-production.yml), which deploys that exact commit to production at [atticus-docs-tirohealth.vercel.app](https://atticus-docs-tirohealth.vercel.app). The same workflow can be run manually from the Actions tab.
- Pushes to `main` are explicitly _not_ deployed to production. That is switched off in [vercel.json](vercel.json) via `git.deploymentEnabled`, so merging a PR never changes what is live.
- Every other branch and pull request still gets a Vercel preview deployment through the GitHub integration.

Cutting a release therefore looks like:

```bash
git tag v2026.09.18
git push origin v2026.09.18
```

The workflow needs a `VERCEL_TOKEN` repository secret: a Vercel access token scoped to the Tiro-health team. The org and project IDs are in the workflow itself — they identify the project, they don't grant access to it.

Build-time configuration (currently the PostHog key and host) lives in the Vercel project's environment variables, not in the workflow.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation
- [Algolia Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/) - the official Algolia Autocomplete documentation
- [FlexSearch](https://github.com/nextapps-de/flexsearch) - the official FlexSearch documentation
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) - the official Zustand documentation
