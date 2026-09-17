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

## Access gate

The docs are no longer public. Every page sits behind a shared password that is
checked in the browser (`src/components/AccessGate.tsx`), and the site ships a
`robots.txt` plus `noindex` metadata so search engines drop it.

Rotate the password with:

```bash
node scripts/docs-password.mjs '<new password>'
```

Copy the printed line into `NEXT_PUBLIC_DOCS_ACCESS_VERIFIER` in `.env` and
deploy. Changing the verifier signs everyone out; sessions also expire after 30
days.

Keep in mind what this does and does not do. Because the site is a static
export on GitHub Pages, there is no server to check anything, so the gate stops
search engines and casual readers but not someone who reads the page source or
the repository. Treat these pages as "not for the open web", never as a place
for secrets.

## Customizing

Customization of the design and functionality is possible by modifying the React components in the [src/components](src/components) directory.

## Global search

This template includes a global search that's powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It's available by clicking the search input or by using the `⌘K` shortcut.

This feature requires no configuration, and works out of the box by automatically scanning your documentation pages to build its index. You can adjust the search parameters by editing the `/src/mdx/search.mjs` file.

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
