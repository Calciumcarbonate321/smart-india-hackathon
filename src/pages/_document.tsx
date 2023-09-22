import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const pageTitle = "Case Flow Management";
  const pageDescription = "Optimize your court's efficiency with our Case Flow Management (DCM) app. Prioritize cases based on complexity and streamline judicial processes for timely and fair adjudication. Discover how our DCM technology can transform your legal workflow today.";
  const canonicalUrl = "https://caseflowpro.abhijithganesh.com/";
  const ogImageUrl = ""
  return (
    <Html lang="en" suppressHydrationWarning >
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
