import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="Shortcut Icon" href="logo.PNG" />
      </Head>
      <body className="bg-[#EEE] dark:bg-dm-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
